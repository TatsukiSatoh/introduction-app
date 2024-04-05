"use client";
import { useState } from "react";
import IntroductionForm, { Entry } from "./components/form";

export default function Home() {
  const [pairs, setPairs] = useState<Entry[]>([]);

  const generatePairs = (entries: Entry[]) => {
    let shuffledThemes = entries.map((entry) => entry.theme);
    shuffledThemes.sort(() => 0.5 - Math.random());

    const newPairs = entries.map((entry, index) => ({
      name: entry.name,
      theme: shuffledThemes[index],
    }));

    setPairs(newPairs);
  };

  return (
    <div className="p-8">
      <IntroductionForm onGenerate={generatePairs} />
      <div className="mt-8">
        {pairs.map((pair, index) => (
          <div key={index} className="mb-4">
            <p className="text-lg font-bold">{pair.name}</p>
            <p>{pair.theme}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
