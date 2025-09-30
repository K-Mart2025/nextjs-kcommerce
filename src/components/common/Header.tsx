import { fetchConfig } from "@/services/config";
import HeaderClientComponent from "./HeaderClient";

export default async function Header(
    { onSearchChange,
        searchValue }: {
            onSearchChange: (value: string) => void;
            searchValue: string;
        }) {
    const config = await fetchConfig();

    return <HeaderClientComponent config={config} onSearchChange={onSearchChange} searchValue={searchValue} />;
}
