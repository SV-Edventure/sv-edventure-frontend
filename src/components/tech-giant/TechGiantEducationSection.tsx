"use client";

import { useRouter } from "next/navigation";
import { Program } from "@/models/program";

type RawImage =
  | string
  | { id?: string | null }
  | { image?: string | { id?: string | null } | null }
  | { fileId?: string | null }
  | null
  | undefined;

const DIRECTUS_BASE =
  (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? "http://localhost:8055").replace(/\/+$/, "");

const extractFileId = (raw: RawImage): string | null => {
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if ("fileId" in raw && raw.fileId) return raw.fileId!;
  if ("id" in raw && raw.id) return raw.id!;
  if ("image" in raw && raw.image) {
    const img = raw.image as unknown;
    if (typeof img === "string") return img;
    if (typeof img === "object" && img && "id" in img) {
      const id = (img as { id?: string | null }).id;
      return id ?? null;
    }
  }
  return null;
};

const toImageUrl = (raw: RawImage): string | null => {
  if (!raw) return null;
  if (typeof raw === "string") {
    if (/^https?:\/\//i.test(raw)) return raw;
    return `${DIRECTUS_BASE}/assets/${raw}`;
  }
  const id = extractFileId(raw);
  return id ? `${DIRECTUS_BASE}/assets/${id}` : null;
};
// -----------------------------------------------------

interface TechGiantEducationSectionProps {
  educationPrograms: Program[];
}

export default function TechGiantEducationSection({
  educationPrograms,
}: TechGiantEducationSectionProps) {
  const router = useRouter();

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-8 py-8 bg-white rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold text-blue-700">
            Tech Giants&apos; Educational Programs
          </h2>
          <button
            onClick={() => router.push(`/main/tech-giant`)}
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
          >
            View all programs
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {educationPrograms.map((program) => {
            const logoSrc = toImageUrl(program.image as unknown as RawImage);

            return (
              <div key={program.id} className="flex flex-col items-center text-center">
                <div className="h-16 w-full flex items-center justify-center mb-4">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${program.title} logo`}
                      className="h-full max-h-16 object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full text-gray-400 text-sm flex items-center justify-center bg-gray-50 rounded">
                      No image
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg text-blue-700 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {program.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => router.push(`/main/tech-giant`)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-6 rounded-full transition-colors"
          >
            Find Tech Education Programs Near You
          </button>
        </div>
      </div>
    </section>
  );
}