import { NextResponse } from "next/server";
import { aiModels, geneLabels, geneKeys } from "@/data/ai-models";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const modelId = searchParams.get("model");

  if (modelId) {
    const model = aiModels.find((m) => m.id === modelId);
    if (!model) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 });
    }
    return NextResponse.json({ model, geneLabels, geneKeys });
  }

  return NextResponse.json({ models: aiModels, geneLabels, geneKeys });
}
