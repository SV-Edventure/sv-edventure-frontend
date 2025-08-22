"use client"

import { MapPin } from 'lucide-react';
import { Program } from '@/models/program';

// Accept various shapes (string id/url, {id}, {image:{id}}, {fileId})
type RawImage =
  | string
  | { id?: string | null }
  | { image?: string | { id?: string | null } | null }
  | { fileId?: string | null }
  | null
  | undefined;

const DIRECTUS_BASE =
  (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/+$/, '');

const extractFileId = (raw: RawImage): string | null => {
  if (!raw) return null;
  if (typeof raw === 'string') return raw;
  if ('fileId' in raw && raw.fileId) return raw.fileId;
  if ('id' in raw && raw.id) return raw.id;
  if ('image' in raw && raw.image) {
    const img = raw.image as unknown;
    if (typeof img === 'string') return img;
    if (typeof img === 'object' && img && 'id' in img) {
      const id = (img as { id?: string | null }).id;
      return id ?? null;
    }
  }
  return null;
};

const toImageUrl = (raw: RawImage): string | null => {
  if (!raw) return null;
  if (typeof raw === 'string') {
    if (/^https?:\/\//i.test(raw)) return raw;
    return `${DIRECTUS_BASE}/assets/${raw}`;
  }
  const id = extractFileId(raw);
  return id ? `${DIRECTUS_BASE}/assets/${id}` : null;
};

const fmtDate = (iso?: string | null, locale = 'en-US', timeZone?: string) =>
  iso ? new Intl.DateTimeFormat(locale, { weekday: 'short', month: 'short', day: 'numeric', timeZone }).format(new Date(iso)) : '';

const fmtTime = (iso?: string | null, locale = 'en-US', timeZone?: string) =>
  iso ? new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone }).format(new Date(iso)) : '';

interface ActivityGridProps {
  activities: Program[];
  onActivityClick?: (activityId: number) => void;
}


export default function ActivityGrid({
  activities,
  onActivityClick,
}: ActivityGridProps) {
  return (
    <div className="mb-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activities.map((activity) => {
            const coverSrc = toImageUrl(activity.image as unknown as RawImage);
            const sponsorSrc = toImageUrl(activity.sponsorImage as unknown as RawImage);

            return (
              <div
                key={activity.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() => onActivityClick && onActivityClick(activity.id)}
              >
                <div className="relative">
                  {coverSrc ? (
                    <img
                      src={coverSrc}
                      alt={activity.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No image
                    </div>
                  )}

                  {/* Sponsor Logo Ribbon */}
                  {sponsorSrc && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-white py-2 px-4 shadow-md rounded-bl-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-600 mr-2">
                            Sponsored by
                          </span>
                          <img src={sponsorSrc} alt="Sponsor" className="h-6" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
                    {activity.duration} 시간
                  </div>

                  {activity.startAt && (
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {fmtDate(activity.startAt)}
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 line-clamp-2">
                    {activity.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-2 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{activity.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {activity.ageMin && activity.ageMax ? (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Ages {activity.ageMin}-{activity.ageMax}
                      </span>
                    ) : activity.ageMin ? (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Ages {activity.ageMin}+
                      </span>
                    ) : activity.ageMax ? (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        Up to {activity.ageMax}
                      </span>
                    ) : null}
                    {activity.feature && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {activity.feature}
                      </span>
                    )}
                    {activity.isFree ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Free
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                        ${activity.price}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {activity.startAt && (
                      <span className="text-gray-600 text-xs">{fmtTime(activity.startAt)}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}