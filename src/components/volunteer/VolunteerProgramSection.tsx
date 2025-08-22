"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import React from "react";
import { Program } from "@/models/program";

const DIRECTUS_BASE = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055").replace(/\/+$/, "");
const toAssetUrl = (id?: string | null) => id ? (/^https?:\/\//i.test(id) ? id : `${DIRECTUS_BASE}/assets/${id}`) : null;

interface VolunteerProgramSectionProps {
  volunteerPrograms: Program[];
}

export default function VolunteerProgramSection({
  volunteerPrograms
}: VolunteerProgramSectionProps) {
  const router = useRouter();

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Global Volunteer Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make a difference in developing countries through these
            family-friendly volunteer opportunities. Create lasting memories
            while helping communities thrive.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-6 gap-4 hide-scrollbar snap-x snap-mandatory">
          {volunteerPrograms.map((program) => (
            <div
              key={program.id}
              role="button"
              tabIndex={0}
              className="flex-shrink-0 w-80 rounded-xl overflow-hidden relative cursor-pointer snap-start outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() => router.push(`/main/${program.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/volunteer/${program.id}`);
                }
              }}
            >
              <div className="relative h-96">
                {toAssetUrl(program.image) ? (
                  <img
                    src={toAssetUrl(program.image) as string}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-lg">
                    No image
                  </div>
                )}

                {/* Duration 배지 (예시 포맷: 금 + ‘10’ + 오전) */}
                <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-medium flex items-center shadow">
                  <span className="mr-1">금</span>
                  <span>
                    {program.duration} 시간
                  </span>
                </div>

                {/* <button
                  type="button"
                  className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  aria-label="Like"
                >
                  <Heart className="h-5 w-5 text-gray-400" />
                </button> */}

                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                  <h3 className="font-medium text-lg mb-2 line-clamp-2">
                    {program.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>
                      1인당 ${program.price ?? 0}
                      부터
                    </span>
                    {/* <span className="mx-2">•</span> */}
                    {/* <span className="inline-flex items-center">
                      ★ {(program.rating ?? 0).toFixed(1)}
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => {
            router.push(`/main/volunteer`)
          }} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
            View All Global Volunteer Programs
          </button>
        </div>
      </div>
    </section>
  );
}