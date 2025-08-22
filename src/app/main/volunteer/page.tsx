"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import type { Program } from "@/models/program";

type ProgramWithAge = Program & { ageMin?: number; ageMax?: number | null };

const DIRECTUS_BASE =
  (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055").replace(/\/+$/, "");

const toAssetUrl = (val?: string | null) => {
  if (!val) return null;
  if (/^https?:\/\//i.test(val)) return val;
  return `${DIRECTUS_BASE}/assets/${val}`;
};

const fmtDate = (iso?: string | null, locale = "en-US") =>
  iso
    ? new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(new Date(iso))
    : "";

const fmtTime = (iso?: string | null, locale = "en-US") =>
  iso
    ? new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(iso))
    : "";

export default function VolunteerProgramsPage() {
  const router = useRouter();
  const [volunteerPrograms, setVolunteerPrograms] = useState<ProgramWithAge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    type DirectusListResponse<T> = { data: T[] };

    fetch("/api/program", { cache: "no-store" })
      .then((res) => res.json() as Promise<DirectusListResponse<Program>>)
      .then((json) => {
        // Program을 그대로 맵핑하면서 volunteer 태그만 필터
        const mapped: ProgramWithAge[] = (json?.data ?? []).map((p: Program) => ({
          id: Number(p.id),
          title: p.title,
          subtitle: p.subtitle,
          tag: p.tag,
          description: p.description,
          feature: p.feature,
          type: p.type,
          category: p.category,
          location: p.location,
          price: Number(p.price),
          adultPrice: Number(p.adultPrice),
          image: p.image,
          duration: Number(p.duration),
          startAt: p.startAt,               // ISO datetime (nullable 가능)
          ageMin: p.ageMin,
          ageMax: p.ageMax,
          longitude: String(p.longitude),
          latitude: String(p.latitude),
          sponsorImage: p.sponsorImage,
          isFree: Boolean(p.isFree),
          websiteUrl: p.websiteUrl,
        }));

        const volunteers = mapped.filter((p) => p.tag === "volunteer");
        setVolunteerPrograms(volunteers);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF8E9]">
      {/* 상단 헤더 영역 */}
      <div className="bg-[#FEF8E9] border-b border-amber-100">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
        </div>

        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Global Volunteer Programs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find family-friendly volunteer opportunities around the world.
            Make a difference while creating lasting memories.
          </p>
        </div>
      </div>

      {/* 목록 영역 */}
      <div className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-white rounded-xl shadow animate-pulse" />
            ))}
          </div>
        ) : volunteerPrograms.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            There are no volunteer programs yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {volunteerPrograms.map((p) => {
              const cover = toAssetUrl(p.image);
              return (
                <div
                  key={p.id}
                  onClick={() => router.push(`/main/${p.id}`)}
                  className="group bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden cursor-pointer"
                >
                  <div className="relative h-48">
                    {cover ? (
                      <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    {p.startAt && (
                      <div className="absolute top-2 left-2 bg-white/90 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {fmtDate(p.startAt)}
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-base mb-2 line-clamp-2">{p.title}</h3>

                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate">{p.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {p.startAt && (
                        <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {fmtTime(p.startAt)}
                        </span>
                      )}
                      {p.isFree ? (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Free
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                          ${p.price}
                        </span>
                      )}
                    </div>

                    {(p.ageMin !== undefined || p.ageMax !== undefined) && (
                      <div className="text-xs text-gray-500">
                        {p.ageMin !== undefined && p.ageMax !== undefined
                          ? `Ages ${p.ageMin}-${p.ageMax}`
                          : p.ageMin !== undefined
                          ? `Ages ${p.ageMin}+`
                          : `Up to ${p.ageMax}`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}