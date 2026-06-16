import { NextResponse } from "next/server";
import { algoliaIndex } from "@/lib/algolia";

export async function POST(req: Request) {
  try {
    const product = await req.json();

    if (!product || !product.id) {
      return NextResponse.json({ error: "Product data with an ID is required" }, { status: 400 });
    }

    // Algolia strictly requires a unique 'objectID' field for every record.
    // We map your Firestore document ID to Algolia's objectID.
    const algoliaRecord = {
      ...product,
      objectID: product.id 
    };

    // Save or update the record in Algolia
    await algoliaIndex.saveObject(algoliaRecord);

    return NextResponse.json({ success: true, message: "Synced to Algolia" });

  } catch (error) {
    console.error("Algolia sync error:", error);
    return NextResponse.json({ error: "Failed to sync to Algolia" }, { status: 500 });
  }
}
