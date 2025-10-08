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
    const { children, description, title, type = "user" } = props;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const pathname = usePathname();

    return (
        <>
            <PageHead title={title} />
            <div>
                <div className="w-full bg-primary p-5 flex items-center gap-10">
                    <Button isIconOnly onPress={onOpen} className="bg-transparent">
                        <FiMenu size={30} />
                    </Button>
                    <Drawer placement="left" isOpen={isOpen} onOpenChange={onOpenChange}>
                        <DrawerContent className="flex flex-col justify-between">
                            {/* <div className="w-full mt-2">
                                <div className="flex p-5 items-center gap-5">
                                    <LuRefreshCcw size={30} className="text-success" />
                                    <div className="flex justify-between w-full items-center">
                                        <span className="">
                                            <h3 className="text-success">Sinkronisasi Terakhir</h3>
                                            <p className="text-sm text-secondary/80">Senin, 06 Okt 2025 12:34</p>
                                        </span>
                                        <span className="h-3 w-3 bg-success rounded-full"></span>
                                    </div>
                                </div>
                                <div className="flex px-5 items-center gap-5">
                                    <LuRefreshCcw size={30} className="text-danger"/>
                                    <div className="flex justify-between w-full items-center">
                                        <span className="">
                                            <h3 className="text-danger">Sinkronisasi Terakhir</h3>
                                            <p className="text-sm text-secondary/80">Sabtu, 04 Okt 2025 12:34</p>
                                        </span>
                                        <span className="h-3 w-3 bg-danger rounded-full"></span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="p-5 flex items-center gap-5">
                                <Image src="/images/general/logo.png" alt="logo" width={100} height={100} className="rounded"/>
                                <span>
                                    <h1 className="text-lg font-semibold">POS PANGLIMA</h1>
                                    <p>V.1.0.0</p>
                                </span>
                            </div>
                            <div className="w-full border-secondary/40">
                                {CONTANTS.map((item) => (
                                    <Link key={item.title} href={item.href} className={cn("px-5 py-6 flex gap-5 items-center", pathname === item.href ? "bg-primary/30" : "")}>
                                        {item.icon}
                                        <p className="text-lg font-medium">
                                            {item.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            <div className="px-5 w-full pb-10">
                                <Button className="bg-primary w-full py-7 text-xl">
                                    Selesai Shift
                                </Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <h1 className="text-2xl font-semibold">{title}</h1>
                </div>
                {children}
            </div>
        </>
    );
};

export default DashboardLayout;