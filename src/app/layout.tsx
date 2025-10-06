import Navbar from "@/components/Navbar/Navbar";
import Providers from "./providers";
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
        <main className='flex-1 overflow-y-auto'>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
