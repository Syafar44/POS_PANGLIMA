interface SerialPort {
    open(options: SerialOptions): Promise<void>;
    close(): Promise<void>;
    writable: WritableStream<Uint8Array> | null;
    readable: ReadableStream<Uint8Array> | null;
}

interface SerialOptions {
    baudRate: number;
    dataBits?: number;
    stopBits?: number;
    parity?: string;
    bufferSize?: number;
    flowControl?: string;
}

interface Navigator {
    serial: {
        requestPort(options?: SerialPortRequestOptions): Promise<SerialPort>;
        getPorts(): Promise<SerialPort[]>;
    };
}

interface SerialPortRequestOptions {
    filters?: SerialPortFilter[];
}

interface SerialPortFilter {
    usbVendorId?: number;
    usbProductId?: number;
}