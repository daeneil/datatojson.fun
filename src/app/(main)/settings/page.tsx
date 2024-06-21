import Settings from "@/components/settings";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings",
} 

const SettingsPage = () => {
    return (
        <Settings />
    )

}
export default SettingsPage;