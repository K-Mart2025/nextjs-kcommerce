"use client"

import { ReactNode, useMemo, useState } from "react";
import FilteredProducts from "../../app/views/FilteredProducts";
import Footer from "./Footer";
import Header from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
    const [form, setForm] = useState("");
    const filter = useMemo(() => ({ name: form }), [form]);

    return <div className="bg-blue-50 flex flex-col min-h-screen">
        <Header searchValue={form} onSearchChange={setForm} />
        <main className="flex flex-col items-center bg-gray-50 grow">
            {form ? (
                <FilteredProducts filters={filter} />
            ) : (children)}
        </main>
        <Footer />
    </div>
}