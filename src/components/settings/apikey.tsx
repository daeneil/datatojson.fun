"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

const apiKeySchema = z.object({
  apiKey: z.string().min(1, { message: "API Key is required" }),
});

type ApiKeyFormValues = z.infer<typeof apiKeySchema>;

export function ApiKeyForm() {
  const form = useForm<ApiKeyFormValues>({
    resolver: zodResolver(apiKeySchema),
    mode: "onChange",
  });

  const { toast } = useToast();

  function onSubmit(data: ApiKeyFormValues) {
    toast({
      title: "API Key Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    // Make sure to handle the API key appropriately on form submission
    // Example API call using the submitted API key
    fetch("/api/apikey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful response
        } else {
          toast({
            title: "Error",
            description: "Failed to submit API key. Please try again later.",
          });
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error submitting API key:", error);
        toast({
          title: "Error",
          description:
            "Failed to submit API key due to a network error. Please try again later.",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API KEY</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your API key here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Take note: your API Key is not stored in the database make sure to paste it everytime you refresh the page.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            });
          }}
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
