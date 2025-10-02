import Navbar from "@/components/Navbar/Navbar";
import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import Transactions from "@/components/Transactions";
import ClientWrapper from "./ClientWrapper";

export default function Page() {
  return (
    <div className='flex h-screen bg-beige-100'>
      <Navbar />
      <ClientWrapper>
        <Overview />
        <Pots />
        <Transactions />
      </ClientWrapper>
    </div>
  );
}
