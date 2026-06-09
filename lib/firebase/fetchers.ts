import { unstable_cache } from "next/cache";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const getCachedHomepageData = unstable_cache(
  async () => {
    const productsRef = collection(db, "products");

    // 1. DEFINE RETAINED QUERIES
    const basePoolQ = query(productsRef, orderBy("views", "desc"), limit(50));
    const officialQ = query(productsRef, where("isOfficialStore", "==", true), limit(12));
    const heroQ = query(productsRef, where("isHero", "==", true), limit(5));
    // Brought back recently added
    const latestQ = query(productsRef, orderBy("createdAt", "desc"), limit(12));

    // 2. PARALLEL FETCHING
    const [
      basePoolSnap, 
      officialSnap, 
      heroSnap,
      latestSnap
    ] = await Promise.all([
      getDocs(basePoolQ), 
      getDocs(officialQ), 
      getDocs(heroQ),
      getDocs(latestQ)
    ]);

    // 3. MAP DATA TO ARRAYS
    return {
      basePool: basePoolSnap.docs.map(d => ({ id: d.id, ...d.data() } as any)),
      officialProducts: officialSnap.docs.map(d => ({ id: d.id, ...d.data() } as any)),
      heroProducts: heroSnap.docs.map(d => ({ id: d.id, ...d.data() } as any)), 
      latestProducts: latestSnap.docs.map(d => ({ id: d.id, ...d.data() } as any)),
    };
  },
  ['kabale-homepage-data'], 
  {
    revalidate: 86400, 
    tags: ['products'] 
  }
);
