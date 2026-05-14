const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
    <div className="bg-dark-card border border-dark-border p-6 w-full max-w-sm">
      <p className="text-sm text-gray-300 mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel} className="btn-ghost">Cancel</button>
        <button onClick={onConfirm} className="bg-red-700 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
