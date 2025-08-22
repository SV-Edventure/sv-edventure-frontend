"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/main/MainHeader";
import Footer from "@/components/main/MainFooter";
import HeroSection from "@/components/main/HeroSection";
import { ActivityFilterPanel, PanelFilters } from "@/components/main/ActivityFilterPanel";
import ActivityTypeFilter from '@/components/main/ActivityTypeFilter';
import TechGiantEducationSection from "@/components/tech-giant/TechGiantEducationSection";
import VolunteerProgramSection from "@/components/volunteer/VolunteerProgramSection";
import ActivityGrid from "@/components/main/ActivityGrid";
import { Map, Globe } from 'lucide-react';
import { Program } from "@/models/program"
import dynamic from "next/dynamic";
export default function Main() {

  const MapView = dynamic(
    () => import("@/components/main/MapView").then((m) => m.MapView),
    { ssr: false }
  );

  const [programs, setPrograms] = useState<Program[]>([]);
  const [volunteerPrograms, setVolunteerPrograms] = useState<Program[]>([]);
  const [bigPrograms, setBigPrograms] = useState<Program[]>([]);

  type DirectusListResponse<T> = { data: T[] };
  type DirectusProgram = {
    id: number | string;
    tag?: string | null;
    title?: string | null;
    subtitle?: string | null;
    description?: string | null;
    feature?: string | null;
    type?: string | null;
    category?: string | null;
    location?: string | null;
    price?: number | string | null;
    adult_price?: number | string | null;
    image?: string | null;
    duration?: number | string | null;
    start_at?: string | null;
    age_min?: number | string | null;
    age_max?: number | string | null;
    latitude?: string | null;
    longitude?: string | null;
    sponsor_image?: string | null;
    is_free?: boolean | null;
    website_url?: string | null;
  };

  useEffect(() => {
    fetch("/api/program", { cache: "no-store" })
      .then((res) => res.json() as Promise<DirectusListResponse<DirectusProgram>>)
      .then((json) => {
        const mapped: Program[] = (json?.data ?? []).map((p: DirectusProgram) => ({
          id: Number(p.id),
          title: p.title ?? "",
          subtitle: p.subtitle ?? undefined,
          tag: p.tag ?? "",
          description: p.description ?? "",
          feature: p.feature ?? "",
          type: p.type ?? "",
          category: p.category ?? "",
          location: p.location ?? "",
          price: p.price != null ? Number(p.price) : 0,
          adultPrice: p.adult_price != null ? Number(p.adult_price) : 0,
          image: p.image ?? "",
          duration: p.duration != null ? Number(p.duration) : 0,
          startAt: p.start_at ?? "",
          ageMin: p.age_min != null ? Number(p.age_min) : undefined,
          ageMax: p.age_max != null ? Number(p.age_max) : undefined,
          longitude: p.longitude ?? "",
          latitude: p.latitude ?? "",
          sponsorImage: p.sponsor_image ?? "",
          isFree: Boolean(p.is_free ?? false),
          websiteUrl: p.website_url ?? "",
        }));

        const activity = mapped.filter((p) => !p.tag || p.tag === "activity");
        const volunteers = mapped.filter((p) => p.tag === "volunteer");
        const bigs = mapped.filter((p) => p.tag === "big");

        setPrograms(activity);
        setVolunteerPrograms(volunteers);
        setBigPrograms(bigs);
      })
      .catch(console.error);
  }, []);

  const containerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return;
    if (!containerRef.current) return;
    if (programs.length === 0) return;

    let teardown: (() => void) | undefined;

    return () => { teardown?.(); };
  }, [programs.length]);

  const [filters, setFilters] = useState<PanelFilters>({ age: null });

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeCategory, setActiveCategory] = useState<string>('any');

  const startOfLocalDay = (d: Date) => {
    const nd = new Date(d);
    nd.setHours(0, 0, 0, 0);
    return nd;
  };
  const endOfLocalDay = (d: Date) => {
    const nd = new Date(d);
    nd.setHours(23, 59, 59, 999);
    return nd;
  };

  const resolveDateRange = (date?: string): { from: Date; to: Date } | null => {
    if (!date) return null;
    if (date === 'all') return null;

    const now = new Date();
    if (date === 'today') {
      const from = startOfLocalDay(now);
      const to = endOfLocalDay(now);
      return { from, to };
    }
    if (date === 'tomorrow') {
      const t = new Date(now);
      t.setDate(t.getDate() + 1);
      return { from: startOfLocalDay(t), to: endOfLocalDay(t) };
    }
    if (date === 'weekend') {

      const dow = now.getDay();
      const daysUntilFri = dow <= 5 ? 5 - dow : 12 - dow;
      const fri = new Date(now);
      fri.setDate(now.getDate() + daysUntilFri);
      const sun = new Date(fri);
      sun.setDate(fri.getDate() + 2);
      return { from: startOfLocalDay(fri), to: endOfLocalDay(sun) };
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      const d = new Date(date + 'T00:00:00');
      return { from: startOfLocalDay(d), to: endOfLocalDay(d) };
    }
    return null;
  };

  const parseTimeFilter = (label?: string): number | null => {
    if (!label) return null;
    const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!m) return null;
    let hour = parseInt(m[1], 10);
    const minute = parseInt(m[2], 10);
    const ap = m[3].toUpperCase();
    if (ap === 'PM' && hour !== 12) hour += 12;
    if (ap === 'AM' && hour === 12) hour = 0;
    return hour * 60 + minute;
  };

  const minutesOfDay = (d: Date): number => d.getHours() * 60 + d.getMinutes();

  const filteredPrograms = useMemo(() => {
    if (!programs || programs.length === 0) return [] as Program[];

    const dateRange = resolveDateRange(filters.date);
    const timeTarget = parseTimeFilter(filters.time);
    const isAllDate = !filters.date || filters.date === 'all';

    let list: Program[] = programs;

    if (activeCategory && activeCategory !== 'any') {
      const key = String(activeCategory).trim().toLowerCase();
      list = list.filter((p) => String(p.category || '').trim().toLowerCase() === key);
    }

    if (filters.age) {
      const selMin = filters.age.min;
      const selMax = filters.age.max;
      list = list.filter((p) => {
        const pMin = p.ageMin;
        const pMax = p.ageMax;

        if (pMin == null && pMax == null) return false;
        const minOk = pMax == null || selMin <= pMax;
        const maxOk = selMax == null || (pMin == null ? true : pMin <= selMax);
        return minOk && maxOk;
      });
    }

    if (dateRange) {
      list = list.filter((p) => {
        if (!p.startAt) return false;
        const dt = new Date(p.startAt);
        if (Number.isNaN(dt.getTime())) return false;
        return dt >= dateRange.from && dt <= dateRange.to;
      });
    }

    if (timeTarget != null) {
      const keepNullWhenAll = isAllDate;
      list = list.filter((p) => {
        if (!p.startAt) return keepNullWhenAll;
        const dt = new Date(p.startAt);
        if (Number.isNaN(dt.getTime())) return keepNullWhenAll;
        const mins = minutesOfDay(dt);
        return mins >= timeTarget;
      });
    }

    return list;
  }, [programs, activeCategory, filters, resolveDateRange]);

  const router = useRouter();
  const handleActivityClick = (activityId: number) => {
    router.push(`/main/${activityId}`);
  }
  const handleFilter = (f: PanelFilters) => {
    setFilters(f);
    console.log('Filters applied:', f);
  };
  const toggleViewMode = (mode: 'list' | 'map') => {
    setViewMode(mode);
  };
  const handleCategoryFilterChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-2 py-6">
          <ActivityTypeFilter onFilterChange={handleCategoryFilterChange} />
          <ActivityFilterPanel onFilter={handleFilter} />

          <div className="flex justify-end mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" onClick={() => toggleViewMode('list')} className={`p-2 text-sm font-medium rounded-l-lg flex items-center ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`} aria-label="List View">
                <Globe className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => toggleViewMode('map')} className={`p-2 text-sm font-medium rounded-r-lg flex items-center ${viewMode === 'map' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`} aria-label="Map View">
                <Map className="h-5 w-5" />
              </button>
            </div>
          </div>

          {viewMode === 'list' ? <>
            <ActivityGrid activities={filteredPrograms} onActivityClick={handleActivityClick} />
            <TechGiantEducationSection educationPrograms={bigPrograms} />
            <VolunteerProgramSection volunteerPrograms={volunteerPrograms} />
          </> : <div className="mb-16">
            <MapView programs={programs} onActivityClick={handleActivityClick} />
          </div>}

        </div>
      </main>
      <Footer />
    </div>
  );
}