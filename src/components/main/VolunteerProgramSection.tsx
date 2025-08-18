"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import React from "react";

type VolunteerProgram = {
  id: string;
  title: string;
  imageUrl: string;
  duration?: string;
  price?: number;
  rating?: number;
};

export default function VolunteerProgramSection() {
  const router = useRouter();

  const volunteerPrograms: VolunteerProgram[] = [
    {
      id: "vol-1",
      title: "Beach Cleanup & Marine Education Day",
      imageUrl:
        "https://images.unsplash.com/photo-1595792600754-634c1b207e43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      duration: "10 시간",
      price: 29,
      rating: 5.0,
    },
    {
      id: "vol-2",
      title: "Tide Pool Monitoring Program",
      imageUrl:
        "https://images.unsplash.com/photo-1565729245410-346756e659e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      duration: "7 시간",
      price: 27,
      rating: 4.9,
    },
    {
      id: "vol-3",
      title: "Junior Marine Stewards Program",
      imageUrl:
        "https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      duration: "6 시간",
      price: 28,
      rating: 5.0,
    },
  ];

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Global Volunteer Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Make a difference in developing countries through these
            family-friendly volunteer opportunities. Create lasting memories
            while helping communities thrive.
          </p>
        </div>

        {/* 가로 스크롤 레일 */}
        <div className="flex overflow-x-auto pb-6 gap-4 hide-scrollbar snap-x snap-mandatory">
          {volunteerPrograms.map((program) => (
            <div
              key={program.id}
              role="button"
              tabIndex={0}
              className="flex-shrink-0 w-80 rounded-xl overflow-hidden relative cursor-pointer snap-start outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() => router.push(`/volunteer/${program.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/volunteer/${program.id}`);
                }
              }}
            >
              <div className="relative h-96">
                <img
                  src={program.imageUrl}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />

                {/* Duration 배지 (예시 포맷: 금 + ‘10’ + 오전) */}
                <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 text-sm font-medium flex items-center shadow">
                  <span className="mr-1">금</span>
                  <span>
                    {(program.duration ?? "").split(" ")[0]} 오전
                  </span>
                </div>

                {/* 좋아요 버튼(카드 라우팅 방지) */}
                <button
                  type="button"
                  className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: like 토글 로직
                  }}
                  aria-label="Like"
                >
                  <Heart className="h-5 w-5 text-gray-400" />
                </button>

                {/* 하단 오버레이 콘텐츠 */}
                <div className="absolute bottom-0 left-0 right-0 bg-white p-4">
                  <h3 className="font-medium text-lg mb-2 line-clamp-2">
                    {program.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <span>
                      1인당 ${program.price ?? 0}
                      부터
                    </span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center">
                      ★ {(program.rating ?? 0).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
            View All Global Volunteer Programs
          </button>
        </div>
      </div>
    </section>
  );
}