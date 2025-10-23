import { useSerial } from '@/context/SerialContext';
import { Button } from '@heroui/react';
import { Br, Cut, Line, Printer, Row, render, Text } from 'react-thermal-printer';

const Profile = () => {
    const { isConnected, connect, disconnect, write } = useSerial();

    const receipt = (
        <Printer type="epson" width={31} debug={true}>
            {/* <Image
                align="center"
                src="./images/general/logojajan7.jpg"
            /> */}
            <Text align="center" bold={true}>Roti Gembung Panglima</Text>
            <Text align="center" bold={true}>Gerai Panglima</Text>
            <Br />
            <Text align="center">Testing</Text>
            <Line />
            <Text align="center" bold={true}>Success</Text>
            <Line />
            <Text align='center'>Connected</Text>
            <Br />
            <Cut lineFeeds={-6}/>
        </Printer>
    );

    const handleConnect = async () => {
        try {
        await connect();
        console.log("Connected from Profile");
        } catch (err) {
        console.error("Connect failed in UI", err);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnect();
            console.log("Disconnected from Profile");
        } catch (err) {
            console.error("Disconnect failed in UI", err);
        }
    };

    const handlePrint = async () => {
        try {
            const data = await render(receipt); // returns Uint8Array
            await write(data);
            console.log("Printed");
        } catch (err) {
            console.error("Print failed", err);
        }
    };

    return (
        <section className="p-5 flex flex-col gap-5 h-[calc(100vh-188px)] overflow-y-scroll">
            <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold">Pengaturan Printer</h2>

                <div className="flex items-center gap-2">
                <span
                    className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                ></span>
                <span>{isConnected ? "Terhubung" : "Tidak Terhubung"}</span>
                </div>

                {!isConnected ? (
                <button
                    onClick={handleConnect}
                    className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Hubungkan Printer
                </button>
                ) : (
                <button
                    onClick={handleDisconnect}
                    className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Putuskan Koneksi
                </button>
                )}
            </div>

            {/* <div>
                {receipt}
            </div> */}
            <div className='mt-5'>
                <Button className='bg-primary w-full h-' onPress={handlePrint}>
                    Print Test
                </Button>
            </div>
        </section>
    )
}

export default Profile