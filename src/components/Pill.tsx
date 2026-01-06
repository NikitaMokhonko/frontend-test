// Fixade ett modernt och stilrent piller för att växla mellan aktiva och åtgärdade avvikelser

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const Pill = ({ value, onChange }: Props) => {
  return (
    <div className="relative mx-auto mb-8 w-60 h-10 rounded-4xl bg-[#4DB4E3] p-1">
      <div
        className={`absolute h-8 w-1/2 rounded-full bg-white shadow transition-transform duration-500
          ${value ? "translate-x-28" : "translate-x-0"}`}
      />
      <div className="relative z-10 flex h-full">
        <button
          className={`w-1/2 text-sm font-semibold transition-colors
            ${!value ? "text-[#4DB4E3]" : "text-white"}`}
          onClick={() => onChange(false)}
        >
          Aktiva
        </button>

        <button
          className={`w-1/2 text-sm font-semibold transition-colors
            ${value ? "text-[#4DB4E3]" : "text-white"}`}
          onClick={() => onChange(true)}
        >
          Åtgärdade
        </button>
      </div>
    </div>
  );
};

export default Pill;
