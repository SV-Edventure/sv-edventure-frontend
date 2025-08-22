import { NextResponse } from "next/server";
import { dGet } from "@/server/directus";
import { ProgramFields } from "@/models/program";

export const revalidate = 0;

interface ProgramImage {
  id: string;
  image: string;
}

function parseError(e: unknown): { status: number; error: unknown } {
  if (typeof e === "object" && e !== null) {
    const errObj = e as { response?: { data?: unknown; status?: number }; message?: string };
    if (errObj.response) {
      return {
        status: errObj.response.status ?? 500,
        error: errObj.response.data ?? { message: errObj.message ?? "unknown error" },
      };
    }
    if ("message" in errObj && typeof errObj.message === "string") {
      return { status: 500, error: { message: errObj.message } };
    }
  }
  return { status: 500, error: { message: "unknown error" } };
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const BASE = (process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || "").replace(/\/+$/, "");

    const progRes = await dGet(`/items/volunteer/${params.id}`, {
      fields: ProgramFields,
    });
    const program = progRes?.data ?? progRes;
    if (!program) {
      return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
    }

    const imgRes = await dGet("/items/program_images", {
      filter: { program: { _eq: params.id } },
      fields: [
        "id",
        "image"
      ],
    });

    const rawImages: ProgramImage[] = Array.isArray(imgRes?.data) ? imgRes.data : [];

    return NextResponse.json({ data: { ...program, rawImages } }, { status: 200 });
  } catch (e: unknown) {
    const { status, error } = parseError(e);
    return NextResponse.json({ error }, { status });
  }
}