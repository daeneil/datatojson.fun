import { Separator } from "../ui/separator";
import { ApiKeyForm } from "./apikey";

export default function Settings () {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">API KEY</h3>
                <p className="text-sm text-muted-foreground">
                    We only accept OpenAI API Key.
                </p>
            </div>
            <Separator />
            <ApiKeyForm />
        </div>
    )
}