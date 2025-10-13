"use client";
import Pot from "./Pot";
import PotActionModal from "./PotActionModal";
import { usePots } from "@/hooks/usePots";
import { usePotModal } from "@/hooks/usePotModal";
import { useModalStore } from "@/store/modalStore";

export default function PotsList() {
  const { pots, isLoading, error } = usePots();
  const { type, selectedPotId, mutation, close } = usePotModal();
  const { open } = useModalStore();

  const selectedPot = pots.find((p) => p.id === selectedPotId);

  if (error) return <h2>{error.message}</h2>;
  if (isLoading) return <h2>Fetching data...</h2>;

  return (
    <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
      {pots.map((pot) => (
        <Pot
          key={pot.id}
          {...pot}
          onAddMoney={() => open("add", pot.id)}
          onWithdraw={() => open("withdraw", pot.id)}
        />
      ))}

      {selectedPot && type && (
        <PotActionModal
          pot={selectedPot}
          type={type}
          mutation={mutation}
          onClose={close}
          availableBalance={4835}
        />
      )}
    </div>
  );
}
