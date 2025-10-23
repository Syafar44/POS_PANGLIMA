import { Button } from "@heroui/react"
import { useRouter } from "next/router"

const HomePage = () => {
    const router = useRouter()
    return (
        <div className="flex justify-center items-center h-screen">
            <Button onPress={() => router.push("/pesanan-baru")}> 
                ke Halaman Utama
            </Button>
        </div>
    )
}

export default HomePage