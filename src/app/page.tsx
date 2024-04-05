"use client";
import { useState } from "react";
import IntroductionForm, { Entry } from "./components/form";

export default function Home() {
  const [pairs, setPairs] = useState<Entry[]>([]);

  const generatePairs = (entries: Entry[]) => {
    let themes = entries.map(entry => entry.theme).sort(() => Math.random() - 0.5);
    const usedThemes = new Set<string>(); // 使用済みテーマを追跡
    const newPairs: Entry[] = entries.map(entry => {
      let theme: string | undefined;
      // まだ使用されていないテーマを探す
      for (const t of themes) {
        if (!usedThemes.has(t)) {
          theme = t;
          usedThemes.add(t); // テーマを使用済みとしてマーク
          break;
        }
      }
      if (theme === undefined) {
        // すべてのテーマが使用されてしまった場合のエラーハンドリング
        throw new Error("不足しているテーマがあります");
      }
      return { name: entry.name, theme: theme };
    });

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
