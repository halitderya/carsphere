import React from "react";
import { Providers } from "./provider";
import "../scss/main.scss";
import Header from "@/components/layout/header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
