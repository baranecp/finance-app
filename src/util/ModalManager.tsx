"use client";

import { useModalStore } from "@/store/modalStore";
import PotActionModal from "@/app/pots/PotActionModal";
import PotForm from "@/app/pots/PotForm";
import DeletePotModal from "@/app/pots/DeletePotModal";

export default function ModalManager() {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "edit":
    case "create":
      return <PotForm />;
    case "add":
    case "withdraw":
      return <PotActionModal />;
    case "delete":
      return <DeletePotModal />;
    default:
      return null;
  }
}
