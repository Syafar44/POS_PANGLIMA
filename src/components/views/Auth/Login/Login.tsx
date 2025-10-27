import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Controller } from "react-hook-form"

const Login = () => {
    const router = useRouter()
    return (
        <section className="flex justify-center items-center h-screen bg-[url(https://res.cloudinary.com/doyafjjum/image/upload/v1761547652/background_qp7chj.jpg)] bg-cover">
            <Card className="w-[350px] shadow-2xl">
                <CardHeader className="flex flex-col items-center gap-5">
                    <div className="bg-primary w-full flex justify-center rounded-xl">
                        <Image src="/images/general/logo.png" className="w-[250px] rounded-xl" width={1000} height={1000} alt="logo panglima" />
                    </div>
                </CardHeader>
                <CardBody>
                    <form 
                        onSubmit={() => {}}
                        className="grid gap-5"
                    >
                        <Input 
                            label="Email"
                            type="email"
                            labelPlacement="outside"
                            placeholder="example@panglima.id"
                        />
                        <Input 
                            label="Password"
                            type="password"
                            labelPlacement="outside"
                            placeholder="rahasia..."
                        />

                        <Button 
                            className="bg-primary font-bold"
                            onPress={() => router.push("/pesanan-baru")}
                        >
                            Masuk
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </section>
    )
}

export default Login