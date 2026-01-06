// Hook som fetchar avvikelser från data.json, gör appen mer clean och läsbar

import { useEffect, useState } from "react";
import type { Avvikelse } from "../types/Avvikelse";
import { toast } from 'react-toastify';

export function useAvvikelse() {
  const [data, setData] = useState<Avvikelse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json: Avvikelse[]) => {
        setData(json);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Skapar en ny array med avvikelser där den med angivet id blir "resolved"
  const markResolved = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "resolved" } : item
      )
    );
    toast.info("Avvikelsen har markerats som åtgärdad");
  };

  return { data, isLoading, markResolved };
}
