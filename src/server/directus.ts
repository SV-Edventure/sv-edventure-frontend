// src/server/directus.ts
import axios from "axios";

const BASE = process.env.DIRECTUS_URL ?? process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "";
if (!BASE) throw new Error("DIRECTUS_URL is not set");

const client = axios.create({
  baseURL: BASE.replace(/\/+$/, ""),
  maxBodyLength: Infinity,
});

// GET만 있으면 충분
export async function dGet<T>(
  path: string,
  params?: Record<string, unknown>
): Promise<T> {
  const res = await client.get<T>(path, { params });
  return res.data;
}