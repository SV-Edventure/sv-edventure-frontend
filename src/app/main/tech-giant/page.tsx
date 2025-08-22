'use client';

import { useEffect, useState } from "react";
import Link from 'next/link';
import { Program } from '@/models/program';

const DIRECTUS_BASE = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/+$/, '');

// Accepts a Directus file id, object with id, or full URL
const toImageUrl = (raw: unknown): string | null => {
  if (!raw) return null;
  if (typeof raw === 'string') {
    if (/^https?:\/\//i.test(raw)) return raw;
    return `${DIRECTUS_BASE}/assets/${raw}`;
  }
  if (typeof raw === 'object') {
    const obj = raw as { id?: string | null } | { image?: string | { id?: string | null } | null } | { fileId?: string | null };
    if ('fileId' in obj && obj.fileId) return `${DIRECTUS_BASE}/assets/${obj.fileId}`;
    if ('id' in obj && obj.id) return `${DIRECTUS_BASE}/assets/${obj.id}`;
    if ('image' in obj && obj.image) {
      const img = obj.image as string | { id?: string | null } | null;
      if (typeof img === 'string') return /^https?:\/\//i.test(img) ? img : `${DIRECTUS_BASE}/assets/${img}`;
      if (img && typeof img === 'object' && 'id' in img && img.id) return `${DIRECTUS_BASE}/assets/${img.id}`;
    }
  }
  return null;
};

export default function TechGiantEducationPage() {
  const [bigPrograms, setBigPrograms] = useState<Program[]>([]);

  useEffect(() => {
    type DirectusListResponse<T> = { data: T[] };

    const numOrUndef = (v: unknown): number | undefined =>
      v === null || v === undefined || (typeof v === "string" && v.trim() === "")
        ? undefined
        : Number(v);

    const strOrEmpty = (v: unknown): string =>
      v === null || v === undefined ? "" : String(v);

    fetch("/api/program", { cache: "no-store" })
      .then((res) => res.json() as Promise<DirectusListResponse<Program>>)
      .then((json) => {
        const mapped: Program[] = (json?.data ?? []).map((p: any) => {
          const priceNum = numOrUndef(p.price);
          const adultPriceNum = numOrUndef(p.adultPrice);
          const durationNum = numOrUndef(p.duration);
          const ageMinNorm = numOrUndef(p.age_min);
          const ageMaxNorm = numOrUndef(p.age_max);

          return {
            id: Number(p.id),
            title: strOrEmpty(p.title),
            subtitle: p.subtitle,
            tag: p.tag ?? null,
            description: p.description ?? null,
            feature: p.feature ?? "",
            type: p.type ?? "",
            category: p.category ?? "",
            location: strOrEmpty(p.location),
            price: priceNum ?? 0,
            adultPrice: adultPriceNum ?? 0,
            image: p.image ?? null,
            duration: durationNum ?? 0,
            startAt: (p.startAt ?? null) as string | null,
            ageMin: ageMinNorm,
            ageMax: ageMaxNorm ?? null,
            longitude: strOrEmpty(p.longitude),
            latitude: strOrEmpty(p.latitude),
            sponsorImage: p.sponsorImage ?? null,
            isFree: Boolean(p.isFree),
            websiteUrl: p.websiteUrl ?? null,
            bannerImageUrls: p.bannerImageUrls ?? [],
          } as Program;
        });

        const bigs = mapped.filter((p) => p.tag === "big");
        setBigPrograms(bigs);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1751FF]">
              Tech Giants&apos; Educational Programs
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Explore hands‑on workshops, camps, and learning tracks created by the world’s leading tech companies.
            </p>
          </div>
          <Link
            href="/main"
            className="hidden sm:inline-flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bigPrograms.map((g) => (
            <Link
              key={g.id}
              href={`/main/${g.id}`}
              className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                  {(() => {
                    const src = toImageUrl(g.image);
                    return src ? (
                      <img
                        src={src}
                        alt={`${g.title} logo`}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No image</span>
                    );
                  })()}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#1751FF] transition-colors">
                  {g.title}
                </h3>
                <p className="mt-2 text-gray-600 text-sm max-w-xs">{g.subtitle}</p>
                {/* <span className="mt-4 inline-flex items-center text-[#1751FF] text-sm font-medium">
                  Learn more
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L14.586 9H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span> */}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/main"
            className="inline-flex items-center rounded-full bg-[#E9F0FF] px-6 py-4 text-[#1751FF] font-semibold hover:bg-[#dfe8ff] transition-colors"
          >
            Find Tech Education Programs Near You
          </Link>
        </div>
      </div>
    </div>
  );
}