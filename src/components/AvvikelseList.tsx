import AvvikelseCard from "./AvvikelseCard";
import Spinner from "./Spinner";
import type { Avvikelse } from "../types/Avvikelse";

type Props = {
  avvikelser: Avvikelse[] | undefined;
  isLoading: boolean;
  showResolved: boolean;
  onResolve?: (id: number) => void;
};

const AvvikelseList = ({
  avvikelser,
  isLoading,
  showResolved,
  onResolve,
}: Props) => {
  const handleResolve = (id: number) => {
    if (typeof onResolve === "function") onResolve(id);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!avvikelser || avvikelser.length === 0) {
    return <p className="text-center">Inga avvikelser hittades</p>;
  }

  const filteredAvvikelser = avvikelser.filter((avvikelse) =>
    showResolved
      ? avvikelse.status !== "rejected"
      : avvikelse.status === "rejected"
  );

  // Enklare att läsa på större skärmar när innehållet är centrerat, därav max-w-40%
  return (
    <div className="pb-15">
      <div className="max-w-[95%] mx-auto xl:max-w-[40%] space-y-5">
        {filteredAvvikelser.map((avvikelse) => (
          <AvvikelseCard
            key={avvikelse.id}
            avvikelse={avvikelse}
            onResolve={handleResolve}
          />
        ))}
      </div>
    </div>
  );
};

export default AvvikelseList;
