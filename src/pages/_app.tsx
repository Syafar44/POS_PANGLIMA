import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="dark:bg-primary-black">
          <Component {...pageProps} />
        </main>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
