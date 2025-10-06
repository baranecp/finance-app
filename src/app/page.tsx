import Overview from "@/components/Overview";
import Pots from "@/components/Pots";
import TransactionsOverview from "@/components/TransactionsOverview";
import ClientWrapper from "./ClientWrapper";

export default function Page() {
  return (
    <div className='flex h-screen bg-beige-100'>
      <ClientWrapper>
        <Overview />
        <Pots />
        <TransactionsOverview />
      </ClientWrapper>
    </div>
  );
}
