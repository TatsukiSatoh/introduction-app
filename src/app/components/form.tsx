import { ChangeEvent, FormEvent, useState } from "react";

export interface Entry {
  name: string;
  theme: string;
}

interface Props {
  onGenerate: (entries: Entry[]) => void;
}

export default function IntroductionForm({ onGenerate }: Props) {
  const [entries, setEntries] = useState<Entry[]>([{ name: "", theme: "" }]);

  const handleAddEntry = () => {
    setEntries([...entries, { name: "", theme: "" }]);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "name" | "theme",
  ) => {
    const updatedEntries = entries.map((entry, i) => {
      if (i === index) {
        return { ...entry, [type]: event.target.value };
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onGenerate(entries);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {entries.map((entry, index) => (
        <div key={index} className="flex space-x-4 items-end">
          <div className="flex-1">
            {!index && (
              <label
                htmlFor={`name-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                名前
              </label>
            )}
            <input
              type="text"
              id={`name-${index}`}
              value={entry.name}
              onChange={(e) => handleInputChange(e, index, "name")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div className="flex-1">
            {!index && (
              <label
                htmlFor={`theme-${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                テーマ
              </label>
            )}
            <input
              type="text"
              id={`theme-${index}`}
              value={entry.theme}
              onChange={(e) => handleInputChange(e, index, "theme")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          {/* {index === entries.length - 1 && (
            
          )} */}
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddEntry}
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg"
        >
          追加
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg"
        >
          組み合わせを生成
        </button>
      </div>
    </form>
  );
}
