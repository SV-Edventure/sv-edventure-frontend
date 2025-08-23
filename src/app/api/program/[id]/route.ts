import { NextResponse } from "next/server";
import { dGet } from "@/server/directus";
import { ProgramFields } from "@/models/program";

export const revalidate = 0;

interface ProgramImage {
  id: string;
  image: string;
}

type DirectusProgram = Record<(typeof ProgramFields)[number], unknown>;

function hasData<T>(v: { data: T } | T): v is { data: T } {
  return typeof v === "object" && v !== null && "data" in v;
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
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
    const progRes = await dGet<{ data: DirectusProgram } | DirectusProgram>(`/items/program/${id}`, {
      fields: ProgramFields,
    });
    const program = hasData(progRes) ? progRes.data : progRes;
    if (!program) {
      return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
    }

    const imgRes = await dGet<{ data: ProgramImage[] } | ProgramImage[]>(
      "/items/program_images",
      {
        filter: { program: { _eq: id } },
        fields: ["id", "image"],
      }
    );
    const raw = hasData(imgRes) ? imgRes.data : imgRes;
    const rawImages: ProgramImage[] = Array.isArray(raw) ? raw : [];

    return NextResponse.json({ data: { ...program, rawImages } }, { status: 200 });
  } catch (e: unknown) {
    const { status, error } = parseError(e);
    return NextResponse.json({ error }, { status });
  }
}