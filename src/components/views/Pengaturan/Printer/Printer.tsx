import { useSerial } from '@/context/SerialContext';
import { Button } from '@heroui/react';
import { Br, Cut, Line, Printer, render, Text } from 'react-thermal-printer';

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
        } catch (err) {
            console.error("Print failed", err);
        }
    };

    return (
        <section className="p-5 flex flex-col gap-5 h-[calc(100vh-188px)] overflow-y-scroll">
            <div className='bg-white rounded-2xl p-5 flex flex-col gap-5'>
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
                    <div className='w-full flex gap-10'>
                        {/* <Button className='bg-green-600 text-white w-full text-2xl rounded-2xl h-20'
                            onPress={handleScanBluetooth}
                        >
                            Scan
                        </Button> */}
                        {!isConnected ? (
                            <Button
                                onPress={handleConnect}
                                className="bg-blue-500 text-white py-2 text-2xl rounded-2xl h-20 hover:bg-blue-600 w-full"
                            >
                                Hubungkan Printer
                            </Button>
                            ) : (
                            <Button
                                onPress={handleDisconnect}
                                className="bg-red-500 text-white py-2 text-2xl rounded-2xl h-20 hover:bg-red-600 w-full"
                            >
                                Putuskan Koneksi
                            </Button>
                        )}
                    </div>
                </div>

                {/* <div>
                    {receipt}
                </div> */}
                <div className='mt-5'>
                    <Button className='bg-primary w-full h-' onPress={handlePrint}>
                        Print Test
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default Profile