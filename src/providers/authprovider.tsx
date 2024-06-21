"use client";
// providers.tsx or authProvider.tsx
import { SessionProvider } from "next-auth/react";

type Props = { children?: React.ReactNode };

export const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
