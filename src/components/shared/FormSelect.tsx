type FormSelectProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    name: string;
    value: string;
  }[];
  placeholder?: string;
  type?: "text" | "number";
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "",
  type = "text",
}) => {
  return (
    <div>
      <label className="label">
        <span className="label-text text-white">{label}</span>
      </label>
      <select
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="styled-input"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
