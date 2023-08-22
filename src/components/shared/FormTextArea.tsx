type FormTextAreaProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
};

const FormTextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 3,
}: FormTextAreaProps) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="styled-input"
      />
    </div>
  );
};

export default FormTextArea;
