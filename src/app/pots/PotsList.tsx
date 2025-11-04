"use client";
import ModalManager from "@/util/ModalManager";
import Pot from "./Pot";
import { usePots } from "@/hooks/usePots";
import { useModalStore } from "@/store/modalStore";

export default function PotsList() {
  const { pots, error } = usePots();
  const { open } = useModalStore();

  if (error) return <h2>{error.message}</h2>;

  return (
    <>
      <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
        {pots.map((pot) => (
          <Pot
            key={pot.id}
            pot={pot}
            onAddMoney={() => open("add", pot)}
            onWithdraw={() => open("withdraw", pot)}
          />
        ))}
      </div>

      <ModalManager />
    </>
  );
}
