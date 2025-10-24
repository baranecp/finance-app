"use client";

import { useModalStore } from "@/store/modalStore";
import PotActionModal from "@/app/pots/PotActionModal";
import PotForm from "@/app/pots/PotForm";
import DeletePotModal from "@/app/pots/DeletePotModal";
import BudgetForm from "@/app/budgets/BudgetForm";

export default function ModalManager() {
  const { isOpen, type } = useModalStore();

  if (!isOpen) return null;

  switch (type) {
    case "editPot":
    case "create":
      return <PotForm />;
    case "createBudget":
      return <BudgetForm />;
    case "add":
    case "withdraw":
      return <PotActionModal />;
    case "deletePot":
      return <DeletePotModal />;
    default:
      return null;
  }
}
