const InputField = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="form-group my-[16px] w-full font-inter">
      <label className="mb-2 block text-[16px] font-normal" 
      htmlFor={name}>
        {label}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-[4px] border border-gray-300 pl-3 font-inter shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        style={{
          height: "48px",
          fontSize: "16px",
          fontWeight: 400,
          borderRadius: "4px",
          borderWidth: "1px",
        }}
      />
    </div>
  );
};

export default InputField;
