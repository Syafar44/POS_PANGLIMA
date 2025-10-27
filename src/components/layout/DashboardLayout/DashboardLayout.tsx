import PageHead from "@/components/common/PageHead";
import { Badge, Button, Drawer, DrawerContent, useDisclosure } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import CONTANTS from "./DashboardLayout.constants";
import { FiMenu } from "react-icons/fi";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface PropTypes {
    children: ReactNode;
    description?: string;
    title?: string;
    type?: string;
}

const DashboardLayout = (props: PropTypes) => {
    const { children, title, type = "user" } = props;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const pathname = usePathname();

    return (
        <>
            <PageHead title={title} />
            <div>
                <div className="w-full p-5 flex items-center gap-10 bg-[url(https://res.cloudinary.com/doyafjjum/image/upload/v1761547652/background_qp7chj.jpg)] bg-cover">
                    <Button isIconOnly onPress={onOpen} className="bg-transparent text-white">
                        <FiMenu size={30} />
                    </Button>
                    <Drawer placement="left" isOpen={isOpen} onOpenChange={onOpenChange} className="bg-[url(https://res.cloudinary.com/doyafjjum/image/upload/v1761547652/background_qp7chj.jpg)] bg-cover bg-center">
                        <DrawerContent className="flex flex-col justify-between p-5 gap-3">
                            <div className="p-5 flex items-center gap-5 bg-white rounded-xl">
                                <Image src="/images/general/logo.png" alt="logo" width={100} height={100} className="rounded"/>
                                <span>
                                    <h1 className="text-lg font-semibold">POS PANGLIMA</h1>
                                    <p>V.1.0.0</p>
                                </span>
                            </div>
                            <div className="w-full border-secondary/40 bg-white rounded-xl">
                                {CONTANTS.map((item) => (
                                    <Link key={item.title} href={item.href} className={cn("px-5 py-6 flex gap-5 items-center", pathname === item.href ? "bg-primary/30" : "")}>
                                        {item.icon}
                                        <p className="text-lg font-medium">
                                            {item.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            <div className="px-5 w-full py-5 bg-white rounded-xl">
                                <Button className="bg-primary w-full py-7 text-xl">
                                    Selesai Shift
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <h1 className="text-2xl font-semibold text-white">{title}</h1>
                </div>
                {children}
            </div>
        </>
    );
};

export default DashboardLayout;