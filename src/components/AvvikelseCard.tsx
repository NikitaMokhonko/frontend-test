// delade upp listan i Card och List för bättre kodstruktur och återanvändbarhet

import { useState } from "react";
import type { Avvikelse } from "../types/Avvikelse";
import arrowdownblack from "../assets/arrowdownblack.svg";
import arrowupblack from "../assets/arrowupblack.svg";
import arrowdownblue from "../assets/arrowdownblue.svg";
import arrowupblue from "../assets/arrowupblue.svg";

type Props = {
  avvikelse: Avvikelse;
  onResolve: (id: number) => void;
};

const AvvikelseCard = ({ avvikelse, onResolve }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const prioritet =
    avvikelse.priority === "high"
      ? "Hög"
      : avvikelse.priority === "medium"
      ? "Mellan"
      : avvikelse.priority === "low"
      ? "Låg"
      : "Okänd";

  const skapadAv =
    avvikelse.responsibleUser === null ? "Okänd" : avvikelse.responsibleUser;

  const typ =
    avvikelse.objectType === "equipment"
      ? "Utrustning"
      : avvikelse.objectType === "annotation"
      ? "Annotering"
      : "Övrigt";

  return (
    // Info centrerad på mobil och surfplatta, vänsterställd på större skärmar för bättre läsbarhet
    <div className="rounded shadow-sm p-5 bg-white border border-transparent hover:border-black/15">
      <div onClick={() => setExpanded((prev) => !prev)}>
        <div className="">
          <h3 className="font-semibold text-lg text-center xl:text-start">
            {avvikelse.name}
          </h3>
        </div>
        <h1 className="text-sm text-gray-600 mt-2 text-center xl:text-start">
          {avvikelse.propertyName} - {avvikelse.buildingName}
          <p className="mt-1">
            {avvikelse.levelName} - {avvikelse.roomName}
          </p>
        </h1>
        {avvikelse.objectIcon && (
          <img
            src={avvikelse.objectIcon.url}
            alt={avvikelse.objectIcon.name}
            className="h-14 w-14 mt-3 justify-center mx-auto xl:mx-0 border-2 rounded-xl object-contain p-1"
          />
        )}

        {expanded && (
          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p>
              <strong>Prioritet:</strong> {prioritet}
            </p>
            <p>
              <strong>Typ:</strong> {typ}
            </p>
            <p>
              <strong>Inspektion:</strong>{" "}
              {avvikelse.inspectionType.toUpperCase()}
            </p>
            <p>
              <strong>Skapad:</strong> {avvikelse.createdAtUtc.split("T")[0]}
            </p>
            <p>
              <strong>Skapad av:</strong> {skapadAv}
            </p>
            <p>
              <strong>Uppdaterad:</strong>{" "}
              {avvikelse.updatedAtUtc.split("T")[0]}
            </p>
            <p>
              <strong>Uppdaterad av:</strong> {avvikelse.updatedByUser}
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-5 justify-center xl:justify-start">
        {/* Fixar så att knappen blir blå när man hoverar över den, likt det tema ni har på er hemsida */}
        <button
          className="text-black rounded-sm cursor-pointer w-35 h-8 px-2 py-1 text-sm border border-black/30 hover:border-[#4DB4E3] hover:text-[#4DB4E3]"
          onClick={() => setExpanded((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex-row flex justify-center items-center">
            <img
              src={
                !expanded
                  ? isHovered
                    ? arrowdownblue
                    : arrowdownblack
                  : isHovered
                  ? arrowupblue
                  : arrowupblack
              }
              alt={!expanded ? "Visa mer" : "Visa mindre"}
              className="w-4 h-4"
            />
            <p className="px-2">{!expanded ? "Visa mer" : "Visa mindre"}</p>
          </div>
        </button>

        {avvikelse.status !== "resolved" && (
          <button
            className="text-white bg-[#4DB4E3] hover:bg-[#4DB4E3]/70 border rounded-sm cursor-pointer w-35 h-8 px-2 py-1 text-sm"
            onClick={() => setShowModal(true)}
          >
            Åtgärdad
          </button>
        )}
      </div>
      {/* Fixade även en modal för att bekräfta att avvikelsen ska markeras som åtgärdad, bra för misclicks */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <div
            className="bg-white rounded-xl p-7 max-w-sm shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl text-center font-semibold mb-4">
              Markera som åtgärdad?
            </h4>

            <p className="text-sm text-center mb-8">
              Är du säker på att du vill markera denna avvikelse som åtgärdad?
            </p>

            <div className="flex justify-center gap-3">
              <button
                className="px-4 cursor-pointer py-2 text-sm hover:text-black/70"
                onClick={() => setShowModal(false)}
              >
                Avbryt
              </button>

              <button
                className="px-4 py-2 text-sm cursor-pointer text-white bg-[#4DB4E3] hover:bg-[#4DB4E3]/70 rounded"
                onClick={() => {
                  onResolve(avvikelse.id);
                  setShowModal(false);
                }}
              >
                Bekräfta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvvikelseCard;
