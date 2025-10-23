// // /context/SerialContext.tsx
// import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

// /**
//  * NOTE: Pastikan definisi SerialPort/SerialOptions ada di global type,
//  * atau tambahkan interface yang sesuai di projectmu.
//  */

// // module-level WeakMap untuk melacak open() yang sedang berjalan
// const openingPorts = new WeakMap<SerialPort, Promise<void>>();

// async function sleep(ms: number) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// function safeOpenPort(port: SerialPort, options: SerialOptions = { baudRate: 9600 }) {
//   if (openingPorts.has(port)) {
//     return openingPorts.get(port)!;
//   }

//   const p = (async () => {
//     try {
//       // jika port tampak sudah terbuka, skip
//       if (port.readable || port.writable) {
//         return;
//       }
//       await port.open(options);
//     } finally {
//       openingPorts.delete(port);
//     }
//   })();

//   openingPorts.set(port, p);
//   return p;
// }

// async function safeOpenWithRetry(port: SerialPort, options: SerialOptions = { baudRate: 9600 }, maxAttempts = 5) {
//   let attempt = 0;
//   while (attempt < maxAttempts) {
//     attempt++;
//     try {
//       await safeOpenPort(port, options);
//       return;
//     } catch (err: unknown) {
//       const msg = err instanceof Error ? err.message : String(err);
//       // jika error karena open() in progress, backoff dan retry
//       if (msg.includes("open() is already in progress") || msg.includes("InvalidStateError")) {
//         await sleep(100 * attempt);
//         continue;
//       }
//       throw err;
//     }
//   }
//   throw new Error("Failed to open port after retries");
// }

// type SerialContextValue = {
//   port: SerialPort | null;
//   isConnected: boolean;
//   isOpening: boolean;
//   connect: () => Promise<void>; // minta permission user dan connect
//   disconnect: () => Promise<void>;
//   write: (data: Uint8Array | ArrayBuffer) => Promise<void>;
// };

// const SerialCtx = createContext<SerialContextValue | undefined>(undefined);

// export const useSerial = () => {
//   const ctx = useContext(SerialCtx);
//   if (!ctx) throw new Error("useSerial must be used within SerialProvider");
//   return ctx;
// };

// export const SerialProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
//   const [port, setPort] = useState<SerialPort | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isOpening, setIsOpening] = useState(false);

//   // connect: panggil navigator.serial.requestPort lalu open
//   const connect = useCallback(async () => {
//     if (!("serial" in navigator)) throw new Error("Web Serial API not available");
//     try {
//       const _port = await navigator.serial.requestPort();
//       setIsOpening(true);
//       await safeOpenWithRetry(_port, { baudRate: 9600 }, 5);
//       setPort(_port);
//       setIsConnected(true);
//       localStorage.setItem("printerConnected", "true");
//     } catch (err) {
//       console.error("connect error", err);
//       throw err;
//     } finally {
//       setIsOpening(false);
//     }
//   }, []);

//   const disconnect = useCallback(async () => {
//     if (!port) return;
//     try {
//       // tunggu open jika sedang berjalan
//       if (openingPorts.has(port)) {
//         await openingPorts.get(port);
//       }
//       if (port.close) {
//         await port.close();
//       }
//     } catch (err) {
//       console.warn("disconnect error", err);
//     } finally {
//       openingPorts.delete(port);
//       setPort(null);
//       setIsConnected(false);
//       localStorage.removeItem("printerConnected");
//     }
//   }, [port]);

//   const write = useCallback(async (data: Uint8Array | ArrayBuffer) => {
//     if (!port) throw new Error("No port connected");
//     if (!port.writable) throw new Error("Port not writable");
//     const writer = port.writable.getWriter();
//     try {
//       // ensure data is Uint8Array
//       const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
//       await writer.write(buffer as Uint8Array);
//     } finally {
//       writer.releaseLock();
//     }
//   }, [port]);

//   // Auto-reconnect on mount (global for app)
//   useEffect(() => {
//     let mounted = true;

//     (async () => {
//       if (!("serial" in navigator)) return;
//       // small delay to reduce race (React strict mode double mount)
//       await sleep(50);

//       try {
//         const saved = localStorage.getItem("printerConnected");
//         if (!saved) return;

//         const ports: SerialPort[] = await navigator.serial.getPorts();
//         if (!ports || ports.length === 0) return;

//         const _port = ports[0];
//         // jika sudah open, set state
//         if (_port.readable || _port.writable) {
//           if (mounted) {
//             setPort(_port);
//             setIsConnected(true);
//           }
//           return;
//         }

//         setIsOpening(true);
//         try {
//           await safeOpenWithRetry(_port, { baudRate: 9600 }, 5);
//           if (mounted) {
//             setPort(_port);
//             setIsConnected(true);
//             console.log("SerialProvider: auto reconnected");
//           }
//         } finally {
//           setIsOpening(false);
//         }
//       } catch (err) {
//         console.error("SerialProvider auto reconnect failed", err);
//         setIsOpening(false);
//       }
//     })();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const value: SerialContextValue = {
//     port,
//     isConnected,
//     isOpening,
//     connect,
//     disconnect,
//     write,
//   };

//   return <SerialCtx.Provider value={value}>{children}</SerialCtx.Provider>;
// };


// /context/SerialContext.tsx
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
      console.log("✅ Bluetooth printer connected");
    } catch (err) {
      console.error("Bluetooth connect failed:", err);
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
            console.log("Serial auto reconnected");
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
