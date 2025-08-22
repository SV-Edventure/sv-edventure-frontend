import { NextResponse } from "next/server";
import { dGet } from "@/server/directus";
import { ProgramFields } from "@/models/program";

export const revalidate = 0;

type HttpErrorLike = {
  response?: {
    data?: unknown;
    status?: number;
    message?: string;
  };
  message?: string;
};

function parseError(e: unknown): { status: number; error: unknown } {
  let status = 500;
  let error: unknown = { message: "unknown error" };

  if (typeof e === "object" && e !== null) {
    const err = e as HttpErrorLike;

    if (err.response) {
      status = typeof err.response.status === "number" ? err.response.status : 500;
      // Prefer data if present; fall back to nested message or top-level message
      error =
        err.response.data ??
        (typeof err.response.message === "string" ? { message: err.response.message } : undefined) ??
        (typeof err.message === "string" ? { message: err.message } : { message: "unknown error" });
    } else if (typeof err.message === "string") {
      error = { message: err.message };
    }
  } else if (e instanceof Error && e.message) {
    error = { message: e.message };
  }

  return { status, error };
}

export async function GET() {
    try {
        const data = await dGet("/items/program", {
            fields: ProgramFields,
        });
        return NextResponse.json(data, { status: 200 });
    } catch (e: unknown) {
        const { status, error } = parseError(e);
        return NextResponse.json({ error }, { status });
    }
}