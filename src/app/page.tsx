//@ts-noCheck
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { InstagramEmbed } from "react-social-media-embed";
import BubbleCursor from "./components/MouseParticlesClient";

import { getEvents } from "./lib/firestore";

import EventCard from "./components/EventCard";

function getFirstTwoSentences(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences) return text;
  return sentences.slice(0, 1).join(" ");
}

export default function HomePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
      setFilteredEvents(data);
    });
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    setFilteredEvents(
      events.filter(
        (event) =>
          event.title.toLowerCase().includes(term) ||
          event.description.toLowerCase().includes(term)
      )
    );
  }, [searchTerm, events]);

  return (
    <main className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-2">
          Mládež PSK
        </h1>
        <p className="text-lg text-purple-700 dark:text-gray-300 ">
          objav udalosť v tvojom okolí...
        </p>
      </motion.div>

      {/* Search and Filter */}
      <section className="mb-10 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="vyhľadaj podujatie..."
          className="border border-purple-300 rounded p-3 w-full shadow-sm "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {/* Events List */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredEvents.length ? (
          filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <EventCard
                id={event.id}
                title={event.title}
                date={event.date?.toDate?.() || event.date}
                description={getFirstTwoSentences(event.description)}
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            žiadne udalosti nájdené.
          </p>
        )}
      </section>

      {/* Facebook Feed */}
      {/* Facebook Feeds */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-10 text-purple-900">
          📢 Sociálne siete
        </h2>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <InstagramEmbed
            url="https://www.instagram.com/dofesk/"
            width={340}
            height={500}
          />

          <InstagramEmbed
            url="https://www.instagram.com/domka.sk/"
            width={340}
            height={500}
          />

          <InstagramEmbed
            url="https://www.instagram.com/rmpk__/"
            width={340}
            height={500}
          />
        </div>
      </section>
    </main>
  );
}
