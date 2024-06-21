import { ReportAnIssue } from "@/components/dashboard/components/report";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Report an issue",
} 
const ReportPage = () => {
    return (
        <ReportAnIssue />
    )
}

export default ReportPage;