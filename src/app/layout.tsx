import Navbar from "@/components/Navbar/Navbar";
import Providers from "../util/providers";
import "../styles/globals.css";

import { Public_Sans } from "next/font/google";
import ClientWrapper from "./ClientWrapper";
const PublicSans = Public_Sans({
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`flex min-h-screen ${PublicSans.className}`}>
        <ClientWrapper>
          <Navbar />
          <main className='flex-1 overflow-y-auto transition-all duration-300'>
            <div className='w-full' style={{ containerType: "inline-size" }}>
              <Providers>{children}</Providers>
            </div>
          </main>
        </ClientWrapper>
      </body>
    </html>
  );
}
