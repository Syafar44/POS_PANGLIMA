import { SerialProvider } from "@/context/SerialContext";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <HeroUIProvider>
        <SerialProvider>
          <main className="dark:bg-primary-black">
            <Component {...pageProps} />
          </main>
        </SerialProvider>
    </HeroUIProvider>
  );
}
