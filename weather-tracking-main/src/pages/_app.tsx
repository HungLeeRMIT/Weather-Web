import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import "@/styles/chart.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MainNav } from "@/components/MainNav";
import { Separator } from "@/components/ui/separator";


const queryClient = new QueryClient();




export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div className="container max-w-screen-2xl items-center">
          <MainNav />
          <Separator className="my-2" />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

