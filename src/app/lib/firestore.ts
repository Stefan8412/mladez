import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: any; // could refine to Firestore Timestamp if needed
};

export async function addEvent(event: {
  title: string;
  date: string;
  description: string;
}) {
  const docRef = await addDoc(collection(db, "events"), {
    ...event,
    date: Timestamp.fromDate(new Date(event.date)),
  });
  return docRef.id;
}

export async function getEvents() {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // this spreads all fields like title, description, date, etc.
  }));
}

export async function addOrganization(org: {
  name: string;
  description: string;
  website: string;
}) {
  const docRef = await addDoc(collection(db, "organizations"), org);
  return docRef.id;
}

export async function getOrganizations() {
  const snapshot = await getDocs(collection(db, "organizations"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getOrganizationById(id: string) {
  const docRef = doc(db, "organizations", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      name: data.name,
      description: data.description,
      website: data.website,
    };
  } else {
    return null;
  }
}
