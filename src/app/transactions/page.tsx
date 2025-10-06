import ClientWrapper from "../ClientWrapper";

export default function Page() {
  return (
    <div className='flex h-screen bg-beige-100'>
      <ClientWrapper>
        <h1 className='heading-l mb-6'>All Transactions</h1>
      </ClientWrapper>
    </div>
  );
}
