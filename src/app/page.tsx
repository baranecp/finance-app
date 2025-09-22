// import TransactionList from "@/components/TransactionList";
import Navbar from "@/components/Navbar";
import '../styles/globals.css';
import {Public_Sans} from "next/font/google"

const PublicSans= Public_Sans({
  weight: ['400', '700'],
})

export default function Home() {
  return (
    <main className={PublicSans.className}>
      <Navbar />
      {/* <TransactionList /> */}
    </main>
  );
}
