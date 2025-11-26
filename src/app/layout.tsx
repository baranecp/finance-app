import Navbar from "@/components/Navbar/Navbar";
import Providers from "../util/providers";
import "../styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Public_Sans } from "next/font/google";
import ClientWrapper from "./ClientWrapper";
import PageTransition from "@/components/ui/PageTransition";

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
      <body className={`min-h-screen  ${PublicSans.className}`}>
        <NextTopLoader
          color='linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))'
          showSpinner={false}
          crawlSpeed={300}
          height={5}
        />
        <div className='flex min-h-screen relative'>
          <ClientWrapper>
            <PageTransition>
              <Navbar />
              <main className='flex-1 overflow-y-auto transition-all duration-300'>
                <div
                  className='w-full'
                  style={{ containerType: "inline-size" }}>
                  <Providers>{children}</Providers>
                </div>
              </main>
            </PageTransition>
          </ClientWrapper>
        </div>
      </body>
    </html>
  );
}
