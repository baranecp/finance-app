import AddPotButton from "../pots/AddPotButton";
import PotsList from "./PotsList";
import PotForm from "./PotForm";

export default function Page() {
  return (
    <div className='flex h-screen bg-beige-100'>
      <main className='md:px-10 md:pt-10 pt-6 px-4 pb-14 flex-1 overflow-y-auto'>
        <div className='flex justify-between mb-8'>
          <h1 className='heading-xl'>Pots</h1>
          <AddPotButton />
        </div>
        <PotForm />
        <PotsList />
      </main>
    </div>
  );
}
