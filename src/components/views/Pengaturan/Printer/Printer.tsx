import { useSerial } from '@/context/SerialContext';
import { Br, Cut, Line, Printer, Row, render, Text } from 'react-thermal-printer';

const Profile = () => {
    const { isConnected, connect, disconnect, write } = useSerial();

    const receipt = (
        <Printer type="epson" width={31} debug={true}>
            {/* <Image
                align="center"
                src="./images/general/logojajan7.jpg"
            /> */}
            <Text align="center" bold={true} size={{ width: 1, height: 1 }}>Roti Gembung Panglima - Juanda 2</Text>
            <Text align="center">RGP-J2.25.10.14.01107</Text>
            <Br />
            <Line />
            <Row left="Pelanggan  : -" right="" />
            <Row left="Transaksi  : 14 Okt 2025, 12:35" right="" />
            <Row left="Karyawan   : Kasir" right="" />

            <Line />
            <Text align='center'>Takeaway</Text>
            <Line />

            <Text bold={true}>Donat Tiramisu Almond</Text>
            <Row left=" 2 x Rp6.000" right="Rp12.000" />
            <Text bold={true}>Donat Oreo</Text>
            <Row left=" 1 x Rp6.000" right="Rp6.000" />
            <Text bold={true}>Donat Cappucino Chocochip </Text>
            <Row left=" 1 x Rp6.000" right="Rp6.000" />
            <Text bold={true}>Donat Meses Coklat</Text>
            <Row left=" 1 x Rp6.000" right="Rp6.000" />
            <Text bold={true}>Donat Coklat Kacang</Text>
            <Row left=" 1 x Rp6.000" right="Rp6.000" />
            <Text bold={true}>Kotak Donat</Text>
            <Row left=" 1 Lembar x Rp0" right="Rp0" />
            <Text bold={true}>Kotak Gembung Isi 1</Text>
            <Row left=" 1 Lembar x Rp0" right="Rp0" />

            <Line />
            <Row left="Jumlah Item      :" right="8" />
            <Line />

            <Row left="Subtotal         :" right="Rp48.000" />
            <Row left="Diskon Transaksi :" right="-Rp6.000" />

            <Line />
            <Row left="" right={<Text size={{ width: 1, height: 1 }} bold={true}>Total : Rp42.000</Text>} />
            <Line />

            <Row left="Tunai   :" right="Rp50.000" />
            <Row left="Kembali :" right="Rp8.000" />

            <Line />
            <Text align="center">Terima Kasih Telah Berbelanja di</Text>
            <Text align="center">Outlet kami ya Kak :)</Text>
            <Line />

            <Text>Whatsapp  : 082220002237</Text>
            <Text>Instagram : @Jajanpanglima</Text>
            <Text>Facebook  : @Jajan Panglima</Text>
            <Text>Website   : www.rotigembungpanglima.com</Text>
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
                <button className='bg-primary w-full h-20' onClick={handlePrint}>
                    Print
                </button>
            </div>
        </section>
    )
}

export default Profile