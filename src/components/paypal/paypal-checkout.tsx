"use client";
import { useState } from "react";

import { useSession, signIn } from "next-auth/react";
import PaypalButton from "./paypalbutton";
import { useRouter } from "next/navigation";

const Checkout: React.FC = () => {
  const [amount, setAmount] = useState<string>("10.00");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSuccess = async (details: any) => {
    console.log("Transaction completed by " + details.payer.name.given_name);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: details.payer.email_address }),
    });

    if (response.ok) {
      const result = await response.json();
      // Redirect to the dashboard
      router.push("/dashboard");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      {!session ? (
        <div>
          <p>You are not logged in.</p>        </div>
      ) : (
        <p>You are already logged in.</p>
      )}
    </div>
  );
};

export default Checkout;
