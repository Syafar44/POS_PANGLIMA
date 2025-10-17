import { cn } from "@/utils/cn"
import { Button } from "@heroui/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { FiMoon, FiSun } from "react-icons/fi"

const Profile = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <section className="p-5 flex flex-col gap-5 h-[calc(100vh-188px)] overflow-y-scroll">
            <div className="flex items-center gap-5 border-b border-secondary/20 p-5">
                <div className="bg-linear-to-br from-primary/20 to-primary h-32 w-32 flex justify-center items-center font-bold text-6xl rounded-xl">
                    W
                </div>
                <span>
                    <p className="text-xl text-gray-500">E.00023</p>
                    <h1 className="text-4xl font-semibold">Wildan</h1>
                    <p className="text-xl text-gray-500">Leader</p>
                </span>
            </div>
            <div className="flex justify-between items-center border-b border-secondary/20 pb-5 px-5">
                <span>
                    <p className="text-xl text-gray-500">Tema</p>
                </span>
                <Button isIconOnly size="lg" className={cn('text-white', theme === 'light' ? 'text-white bg-primary-black' : 'text-black bg-white')} onPress={() => theme === 'light' ? setTheme('dark') : setTheme('light')}>
                    {theme === 'light' ? <FiMoon size={30} /> : <FiSun size={30}/>}
                </Button>
            </div>
        </section>
    )
}

export default Profile