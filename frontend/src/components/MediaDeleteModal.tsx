type MediaDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedType: 'Movies' | 'TvShows';
};

export function MediaDeleteModal({
  isOpen,
  onClose,
  onDelete,
  selectedType
}: MediaDeleteModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen items-center justify-center bg-black/50"
    >
      <div className="w-96 rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Confirmar exclusão
        </h2>

        {selectedType === 'Movies' ? (
          <p className="text-gray-600">
            Você tem certeza que deseja excluir este filme?
          </p>
        ) : (
          <p className="text-gray-600">
            Você tem certeza que deseja excluir esta série?
          </p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>
    </dialog>
  );
}