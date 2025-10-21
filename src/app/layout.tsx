import Navbar from "@/components/Navbar/Navbar";
import Providers from "../util/providers";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen'>
        <Navbar />
        <main className='flex-1 overflow-y-auto transition-all duration-300'>
          <div className='w-full' style={{ containerType: "inline-size" }}>
            <Providers>{children}</Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
