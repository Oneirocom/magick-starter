const InteractionMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-4">
      <button>Talk</button>
      <button>Battle</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default InteractionMenu;
