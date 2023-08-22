type FormInputProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "text" | "number";
  step?: number;
};

const FormInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  step = 0.1,
}: FormInputProps) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="styled-input"
        step={type === "number" ? step : undefined}
      />
    </div>
  );
};

export default FormInput;
