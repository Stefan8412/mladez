"use client";

import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface PollProps {
  pollId: string;
}

export default function Poll({ pollId }: PollProps) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<{ [key: string]: number }>({});
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = localStorage.getItem(`poll-${pollId}-voted`);
    if (voted) setHasVoted(true);
  }, [pollId]);

  useEffect(() => {
    const pollRef = doc(db, "polls", pollId);
    const unsub = onSnapshot(pollRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setQuestion(data.question);
        setOptions(data.options || {});
      }
    });
    return unsub;
  }, [pollId]);

  const vote = async (option: string) => {
    if (hasVoted) return;
    const pollRef = doc(db, "polls", pollId);
    await setDoc(pollRef, {}, { merge: true });
    await updateDoc(pollRef, {
      [`options.${option}`]: increment(1),
    });
    localStorage.setItem(`poll-${pollId}-voted`, option);
    setHasVoted(true);
  };

  const chartData = Object.entries(options).map(([key, value]) => ({
    name: key,
    votes: value,
  }));

  const COLORS = ["#a78bfa", "#8b5cf6", "#7c3aed", "#6d28d9"];

  return (
    <div className="p-6 border rounded max-w-2xl mx-auto shadow-md ">
      <h2 className="text-xl font-bold text-purple-900 ">{question}</h2>

      <div className="space-y-3 mb-8">
        {Object.entries(options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => vote(key)}
            disabled={hasVoted}
            className={`w-full text-left px-4 py-2 rounded transition ${
              hasVoted
                ? "bg-purple-300  cursor-not-allowed"
                : "bg-purple-300  hover:bg-purple-200"
            }`}
          >
            {key} ({value} hlasov)
          </button>
        ))}
      </div>

      <h3 className="text-md font-semibold text-purple-800 dark:text-purple-300 mb-2">
        Výsledky hlasovania:
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votes">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {hasVoted && (
        <p className="mt-4 text-sm text-green-600 dark:text-green-300">
          Ďakujeme za tvoj hlas!
        </p>
      )}
    </div>
  );
}
