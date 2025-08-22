import axios, { AxiosInstance } from "axios";

const BASE = process.env.DIRECTUS_URL!;
if (!BASE) throw new Error("DIRECTUS_URL is not set");

let accessToken: string | null = null;
let refreshToken: string | null = null;
let client: AxiosInstance = axios.create({ baseURL: BASE });

async function loginServiceAccount() {
  const res = await axios.post(`${BASE}/auth/login`, {
    email: process.env.DIRECTUS_SERVICE_EMAIL,
    password: process.env.DIRECTUS_SERVICE_PASSWORD,
  });
  accessToken = res.data?.data?.access_token;
  refreshToken = res.data?.data?.refresh_token;
  client = axios.create({
    baseURL: BASE,
    headers: { Authorization: `Bearer ${accessToken}` },
    maxBodyLength: Infinity,
  });
}

async function withRefresh<T>(fn: () => Promise<T>): Promise<T> {
  try {
    if (!accessToken) await loginServiceAccount();
    return await fn();
  } catch (e: any) {
    if (e?.response?.status === 401 && refreshToken) {
      const r = await axios.post(`${BASE}/auth/refresh`, {
        refresh_token: refreshToken,
      });
      accessToken = r.data?.data?.access_token;
      refreshToken = r.data?.data?.refresh_token;
      client = axios.create({
        baseURL: BASE,
        headers: { Authorization: `Bearer ${accessToken}` },
        maxBodyLength: Infinity,
      });
      return await fn();
    }
    throw e;
  }
}

export function dGet<T = any>(path: string, params?: any) {
  return withRefresh(async () => (await client.get(path, { params })).data as T);
}
export function dPost<T = any>(path: string, body?: any) {
  return withRefresh(async () => (await client.post(path, body)).data as T);
}
export function dPatch<T = any>(path: string, body?: any) {
  return withRefresh(async () => (await client.patch(path, body)).data as T);
}
export function dDelete<T = any>(path: string) {
  return withRefresh(async () => (await client.delete(path)).data as T);
}