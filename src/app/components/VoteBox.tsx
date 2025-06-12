"use client";

import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path if needed

export default function VoteBox({ itemId }: { itemId: string }) {
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });

  useEffect(() => {
    const ref = doc(db, "votes", itemId);
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        setVotes(docSnap.data() as any);
      }
    });
    return unsub;
  }, [itemId]);

  const handleVote = async (type: "upvotes" | "downvotes") => {
    const ref = doc(db, "votes", itemId);
    await setDoc(ref, { upvotes: 0, downvotes: 0 }, { merge: true }); // ensure doc exists
    await updateDoc(ref, { [type]: increment(1) });
  };

  return (
    <div className="p-4 border rounded shadow-sm text-center">
      <h3 className="font-bold text-lg">Votes</h3>
      <div className="mt-2 space-x-4">
        <button
          onClick={() => handleVote("upvotes")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          👍 {votes.upvotes}
        </button>
        <button
          onClick={() => handleVote("downvotes")}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          👎 {votes.downvotes}
        </button>
      </div>
    </div>
  );
}
