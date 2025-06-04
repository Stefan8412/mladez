"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { getEvents } from "./lib/firestore";
import EventCard from "./components/EventCard";

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
                description={event.description}
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
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-900">
          📢 Novinky z nášho Facebooku
        </h2>
        <div className="flex justify-center">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Frmpk.po&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="500"
            height="600"
            style={{ border: "none", overflow: "hidden" }}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </main>
  );
}
