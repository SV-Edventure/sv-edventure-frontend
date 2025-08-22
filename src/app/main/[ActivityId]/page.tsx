"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from "next/navigation";
import {
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  DollarSign,
  Globe,
  Share2,
} from 'lucide-react'
import parse from "html-react-parser";
import { Program } from '@/models/program';

const DIRECTUS_BASE = (process.env.NEXT_PUBLIC_DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/+$/, '');
const assetUrl = (id?: string | null) => (id ? `${DIRECTUS_BASE}/assets/${id}` : '');

type RawImage =
  | string
  | { image?: string | { id?: string | null } | null }
  | { fileId?: string | null }
  | null
  | undefined;

function extractFileId(raw: RawImage): string | null {
  if (!raw) return null;
  if (typeof raw === 'string') return raw;
  if ('fileId' in raw && raw.fileId) return raw.fileId;
  if ('image' in raw && raw.image) {
    const img = raw.image as unknown;
    if (typeof img === 'string') return img;
    if (typeof img === 'object' && img && 'id' in img) {
      const id = (img as { id?: string | null }).id;
      return id ?? null;
    }
  }
  return null;
}

export default function ActivityDetailPage({ params }: { params: Promise<{ ActivityId: string }> }) {

  const { ActivityId } = React.use(params);

  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/program/${ActivityId}`, { cache: "no-store" });
        const json = await res.json();
        const p = json?.data;
        if (!p) return setProgram(null);
        const mapped: Program = {
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
          adultPrice: Number(p.adult_price),
          image: p.image,
          duration: Number(p.duration),
          startAt: p.start_at,
          ageMin: p.age_min,
          ageMax: p.age_max,
          longitude: String(p.longitude),
          latitude: String(p.latitude),
          sponsorImage: p.sponsor_image,
          isFree: Boolean(p.is_free),
          websiteUrl: p.website_url,
          bannerImageUrls: p.rawImages,
        };
        setProgram(mapped);
      } catch (e) {
        console.error(e);
        setProgram(null);
      }
    })();
  }, [ActivityId]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter();

  const images: string[] = useMemo(() => {
    // Support optional bannerImageUrls array or single fallback image id
    type WithBanners = { bannerImageUrls?: unknown[] };
    const list = program && Array.isArray((program as WithBanners).bannerImageUrls)
      ? ((program as WithBanners).bannerImageUrls as unknown[])
      : [];

    const urlsFromBanners = list
      .map((it) => extractFileId(it as RawImage))
      .filter((id): id is string => Boolean(id))
      .map((id) => assetUrl(id));

    if (urlsFromBanners.length > 0) return urlsFromBanners;
    if (program?.image) return [assetUrl(program.image)];
    return [];
  }, [program]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (images.length === 0 ? 0 : prev === images.length - 1 ? 0 : prev + 1));
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (images.length === 0 ? 0 : prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleGoToWebsite = () => {
    if (program?.websiteUrl) {
      window.open(program.websiteUrl, "_blank");
    } else {
      alert("There are no registered website links.");
    }
  };
  const handleShare = () => {
    console.log('Share activity:', program?.title)
    alert('Sharing ' + program?.title)
  }

  // Pretty label for "Recommended Age"
  const ageLabel = useMemo(() => {
    const min = program?.ageMin ?? null;
    const max = program?.ageMax ?? null;
    const isNum = (v: unknown): v is number => typeof v === 'number' && !Number.isNaN(v);

    if (isNum(min) && isNum(max)) return `Recommended Age: ${min} - ${max}`;
    if (isNum(min) && !isNum(max)) return `Recommended Age: ${min}+`;
    if (!isNum(min) && isNum(max)) return `Up to ${max}`;
    return null; // nothing to show
  }, [program?.ageMin, program?.ageMax]);

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Activities
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative h-96">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={program?.title ?? 'Program image'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                No Image
              </div>
            )}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.length > 0 && images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                />
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div className="mb-6 md:mb-0">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full mb-3">
                  {program?.feature}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {program?.title}
                </h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{program?.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                  {ageLabel ? (
                    <span>{ageLabel}</span>
                  ) : null}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mx-4">
                <div className="flex items-center mb-1">
                  <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="text-2xl font-bold mb-1">
                  ${program?.price}{' '}
                  <span className="text-gray-500 text-base font-normal">
                    per child
                  </span>
                </div>
                <div className="text-2xl font-bold mb-3">
                  ${program?.adultPrice ?? 0}{' '}
                  <span className="text-gray-500 text-base font-normal">
                    per adult
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {/* School group rates available */}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleGoToWebsite}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Globe className="h-5 w-5 mr-2" />
                Go to Register Link
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </button>
            </div>
            <div className="prose max-w-none">
              {program?.description ? parse(program.description) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
