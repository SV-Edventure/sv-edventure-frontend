// src/server/directus.ts
import axios, { AxiosInstance, AxiosError, isAxiosError } from "axios";

const BASE = process.env.DIRECTUS_URL ?? "";
if (!BASE) throw new Error("DIRECTUS_URL is not set");

const SERVICE_EMAIL = process.env.DIRECTUS_SERVICE_EMAIL ?? "";
const SERVICE_PASSWORD = process.env.DIRECTUS_SERVICE_PASSWORD ?? "";
if (!SERVICE_EMAIL || !SERVICE_PASSWORD) {
  throw new Error("DIRECTUS_SERVICE_EMAIL / DIRECTUS_SERVICE_PASSWORD are not set");
}

type DirectusAuthData = {
  access_token: string;
  refresh_token: string;
};
type DirectusAuthResponse = { data: DirectusAuthData };

// 공통 제네릭 응답이 필요하면 이렇게도 쓸 수 있어요.
// type DirectusResponse<T> = { data: T };

let accessToken: string | null = null;
let refreshToken: string | null = null;

const createClient = (token?: string): AxiosInstance =>
  axios.create({
    baseURL: BASE,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    maxBodyLength: Infinity,
  });

let client: AxiosInstance = createClient();

async function loginServiceAccount(): Promise<void> {
  const res = await axios.post<DirectusAuthResponse>(`${BASE}/auth/login`, {
    email: SERVICE_EMAIL,
    password: SERVICE_PASSWORD,
  });
  accessToken = res.data?.data?.access_token ?? null;
  refreshToken = res.data?.data?.refresh_token ?? null;
  client = createClient(accessToken ?? undefined);
}

async function refreshTokens(): Promise<void> {
  if (!refreshToken) {
    // refreshToken이 없으면 재로그인
    await loginServiceAccount();
    return;
  }
  const r = await axios.post<DirectusAuthResponse>(`${BASE}/auth/refresh`, {
    refresh_token: refreshToken,
  });
  accessToken = r.data?.data?.access_token ?? null;
  refreshToken = r.data?.data?.refresh_token ?? null;
  client = createClient(accessToken ?? undefined);
}

async function withRefresh<T>(fn: () => Promise<T>): Promise<T> {
  if (!accessToken) await loginServiceAccount();

  try {
    return await fn();
  } catch (e: unknown) {
    const ax = e as AxiosError;
    if (isAxiosError(ax) && ax.response?.status === 401) {
      await refreshTokens();
      return await fn();
    }
    throw e;
  }
}

// ---- Public helpers (타입 안전 버전) ----
export function dGet<T, P extends Record<string, unknown> = Record<string, unknown>>(
  path: string,
  params?: P
): Promise<T> {
  return withRefresh(async () => {
    const res = await client.get<T>(path, { params });
    return res.data;
  });
}

export function dPost<
  T,
  B extends Record<string, unknown> | undefined = Record<string, unknown>
>(path: string, body?: B): Promise<T> {
  return withRefresh(async () => {
    const res = await client.post<T>(path, body);
    return res.data;
  });
}

export function dPatch<
  T,
  B extends Record<string, unknown> | undefined = Record<string, unknown>
>(path: string, body?: B): Promise<T> {
  return withRefresh(async () => {
    const res = await client.patch<T>(path, body);
    return res.data;
  });
}

export function dDelete<T>(path: string): Promise<T> {
  return withRefresh(async () => {
    const res = await client.delete<T>(path);
    return res.data;
  });
}