"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function ReportAnIssue() {
  const [area, setArea] = useState("general");
  const [severity, setSeverity] = useState("3");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const reportData = { area, severity: Number(severity), subject, description };

    const response = await fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    });

    if (response.ok) {
      // Handle success, e.g., show a success message or redirect
      console.log("Report submitted successfully");
    } else {
      // Handle error
      console.error("Error submitting report");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report an issue</CardTitle>
        <CardDescription>
          {" "}
          If you found a bug, please report it here.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">Area</Label>
            <Select defaultValue={area} onValueChange={setArea}>
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="severity-level">Severity Level</Label>
            <Select defaultValue={severity} onValueChange={setSeverity}>
              <SelectTrigger
                id="severity-level"
                className="line-clamp-1 w-[160px] truncate"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Severity 1 (Lowest)</SelectItem>
                <SelectItem value="2">Severity 2</SelectItem>
                <SelectItem value="3">Severity 3</SelectItem>
                <SelectItem value="4">Severity 4</SelectItem>
                <SelectItem value="5">Severity 5 (Highest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="i need help with..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Include all information relevant to your issue" />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button type="button" variant="ghost">Cancel</Button>
        <Button type="submit" className="bg-primary dark:bg-blue-600" onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
