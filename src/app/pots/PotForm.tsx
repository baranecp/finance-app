"use client";
import { usePotsStore } from "@/store/potsStore";
import { usePotModal } from "@/hooks/usePotModal";
import Modal from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";

export default function PotForm() {
  const { formData, setFormData } = usePotsStore();
  const { createMutation } = usePotModal();
  const { isOpen, type, close } = useModalStore();

  if (!isOpen || type !== "create") return null;

  const themes = [
    { name: "Green", value: "#277C78" },
    { name: "Yellow", value: "#F2CDAC" },
    { name: "Cyan", value: "#82C9D7" },
    { name: "Navy", value: "#F626070" },
    { name: "Red", value: "#C94736" },
    { name: "Purple", value: "#826CB0" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <Modal title='Add New Pot' isOpen={isOpen} onClose={close}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Pot name'
          value={formData.name}
          onChange={(e) => setFormData({ name: e.target.value })}
          className='border p-2 rounded'
        />

        <input
          type='number'
          placeholder='Target amount'
          value={formData.target || ""}
          onChange={(e) => setFormData({ target: +e.target.value })}
          className='border p-2 rounded'
        />

        <select
          name='theme'
          value={formData.theme}
          onChange={(e) => setFormData({ theme: e.target.value })}
          className='border p-2 rounded'>
          <option value=''>Select theme</option>
          {themes.map((theme) => (
            <option key={theme.value} value={theme.value}>
              {theme.name}
            </option>
          ))}
        </select>

        <button
          type='submit'
          disabled={createMutation.isPending}
          className='bg-blue-600 text-white p-2 rounded'>
          {createMutation.isPending ? "Creating..." : "Create Pot"}
        </button>
      </form>
    </Modal>
  );
}
