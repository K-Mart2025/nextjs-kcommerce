"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ConfigProvider } from "./ConfigContext";

const queryClient = new QueryClient();

export const Providers = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) { return null }

    return (
        <ThemeProvider attribute="class"
            defaultTheme="light">
            <ConfigProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </ConfigProvider>
        </ThemeProvider >)
}