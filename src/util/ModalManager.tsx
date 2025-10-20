"use client";

import { useModalStore } from "@/store/modalStore";
import PotActionModal from "@/app/pots/PotActionModal";
import PotForm from "@/app/pots/PotForm";

export default function ModalManager() {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "edit":
      return <PotForm />;
    case "add":
    case "withdraw":
      return <PotActionModal />;
    default:
      return null;
  }
}
