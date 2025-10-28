import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const openingPorts = new WeakMap<SerialPort, Promise<void>>();

interface BluetoothRemoteGATTServer {
  getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  connect(): Promise<BluetoothRemoteGATTServer>;
}

interface BluetoothDevice {
  gatt: BluetoothRemoteGATTServer;
}

interface BluetoothRemoteGATTService {
  getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
}

interface BluetoothRemoteGATTCharacteristic {
  writeValue(value: BufferSource): Promise<void>;
}

interface Bluetooth {
  requestDevice(options: {
    acceptAllDevices?: boolean;
    optionalServices?: string[];
  }): Promise<BluetoothDevice>;
}

declare global {
  interface Navigator {
    bluetooth: Bluetooth;
  }
}

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

async function safeOpenPort(port: SerialPort, options: SerialOptions = { baudRate: 9600 }) {
  if (openingPorts.has(port)) return openingPorts.get(port)!;
  const p = (async () => {
    try {
      if (port.readable || port.writable) return;
      await port.open(options);
    } finally {
      openingPorts.delete(port);
    }
  })();
  openingPorts.set(port, p);
  return p;
}

async function safeOpenWithRetry(port: SerialPort, options: SerialOptions = { baudRate: 9600 }, maxAttempts = 5) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt++;
    try {
      await safeOpenPort(port, options);
      return;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("open() is already in progress") || msg.includes("InvalidStateError")) {
        await sleep(100 * attempt);
        continue;
      }
      throw err;
    }
  }
  throw new Error("Failed to open port after retries");
}

type SerialContextValue = {
  port: SerialPort | null;
  isConnected: boolean;
  isOpening: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  write: (data: Uint8Array | ArrayBuffer) => Promise<void>;
};

const SerialCtx = createContext<SerialContextValue | undefined>(undefined);
export const useSerial = () => {
  const ctx = useContext(SerialCtx);
  if (!ctx) throw new Error("useSerial must be used within SerialProvider");
  return ctx;
};

export const SerialProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [port, setPort] = useState<SerialPort | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  type BluetoothRemoteGATTCharacteristic = {
    writeValue(data: BufferSource): Promise<void>;
    service?: {
      device?: {
        gatt?: {
          connected?: boolean;
          disconnect?: () => void;
        };
      };
    };
  };
  
    const [btCharacteristic, setBtCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

  // ====== Hybrid Connect Function ======
  const connect = useCallback(async () => {
    // Prefer Serial if available
    if ("serial" in navigator) {
      try {
        const _port = await navigator.serial.requestPort();
        setIsOpening(true);
        await safeOpenWithRetry(_port, { baudRate: 9600 }, 5);
        setPort(_port);
        setIsConnected(true);
        localStorage.setItem("printerConnected", "serial");
        return;
      } catch (err) {
        console.warn("Web Serial connect failed, fallback to Bluetooth", err);
      } finally {
        setIsOpening(false);
      }
    }

    // Fallback: Web Bluetooth
    if (!("bluetooth" in navigator)) throw new Error("Web Bluetooth not supported on this device/browser");

    try {
      setIsOpening(true);
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["000018f0-0000-1000-8000-00805f9b34fb", "0000ffe0-0000-1000-8000-00805f9b34fb"],
      });
      const server = await device.gatt.connect();

      // beberapa printer pakai service ffe0 / ffe5
      const service =
        (await server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb").catch(() => null)) ||
        (await server.getPrimaryService("0000ffe0-0000-1000-8000-00805f9b34fb").catch(() => null)) ||
        (await server.getPrimaryService("0000ffe5-0000-1000-8000-00805f9b34fb").catch(() => null));

      if (!service) throw new Error("Tidak dapat menemukan service printer");

      const characteristic =
        (await service.getCharacteristic("00002af1-0000-1000-8000-00805f9b34fb").catch(() => null)) ||
        (await service.getCharacteristic("0000ffe1-0000-1000-8000-00805f9b34fb").catch(() => null)) ||
        (await service.getCharacteristic("0000ffe9-0000-1000-8000-00805f9b34fb").catch(() => null));

      if (!characteristic) throw new Error("Tidak dapat menemukan characteristic printer");

      setBtCharacteristic(characteristic);
      setIsConnected(true);
      localStorage.setItem("printerConnected", "bluetooth");
    } catch (err) {
      throw err;
    } finally {
      setIsOpening(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      if (port) {
        if (openingPorts.has(port)) await openingPorts.get(port);
        if (port.close) await port.close();
      }
      if (btCharacteristic?.service?.device?.gatt?.connected && btCharacteristic?.service?.device?.gatt?.disconnect) {
        await btCharacteristic.service.device.gatt.disconnect();
      }
    } catch (err) {
      console.warn("disconnect error", err);
    } finally {
      setPort(null);
      setBtCharacteristic(null);
      setIsConnected(false);
      localStorage.removeItem("printerConnected");
    }
  }, [port, btCharacteristic]);

  const write = useCallback(
    async (data: Uint8Array | ArrayBuffer) => {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      if (port && port.writable) {
        const writer = port.writable.getWriter();
        await writer.write(buffer);
        writer.releaseLock();
      } else {
        throw new Error("No printer connected");
      }
    },
    [port, btCharacteristic]
  );

  useEffect(() => {
    let mounted = true;
    const reconnect = async () => {
      const saved = localStorage.getItem("printerConnected");
      if (!saved || !mounted) return;

      if (saved === "serial" && "serial" in navigator) {
        const ports: SerialPort[] = await navigator.serial.getPorts();
        if (ports.length === 0) return;
        const _port = ports[0];
        setIsOpening(true);
        try {
          await safeOpenWithRetry(_port, { baudRate: 9600 }, 5);
          if (mounted) {
            setPort(_port);
            setIsConnected(true);
          }
        } finally {
          setIsOpening(false);
        }
      }
    };
    reconnect();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SerialCtx.Provider value={{ port, isConnected, isOpening, connect, disconnect, write }}>
      {children}
    </SerialCtx.Provider>
  );
};
