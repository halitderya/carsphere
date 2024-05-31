import React from "react";
import { Providers } from "./provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <h1>Root Layout</h1>
        <h2>Here is the header</h2>
        <Providers>{children}</Providers>
        <h2>Here is the footer</h2>
      </body>
    </html>
  );
}
