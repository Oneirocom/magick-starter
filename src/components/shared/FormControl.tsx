type FormControlProps = {
  children: React.ReactNode;
  onSubmit: () => void;
  isLoading?: boolean;
};

const FormControl = ({ children, onSubmit, isLoading }: FormControlProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="form-control grid w-full grid-cols-1 pb-4"
    >
      {children}
      <button type="submit" disabled={isLoading} className="magick-button">
        {isLoading && <span className="loading loading-spinner text-white" />}
        Generate
      </button>
    </form>
  );
};

export default FormControl;
