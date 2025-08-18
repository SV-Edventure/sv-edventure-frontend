"use client";

import { useState } from 'react';
import Header from "@/components/main/MainHeader";
import Footer from "@/components/main/MainFooter";
import HeroSection from "@/components/main/HeroSection";
import CategoryTabs from '@/components/main/CategoryTabs';
import FilterPanel from '@/components/main/ActivityFilterPanel';
import ActivityTypeFilter from '@/components/main/ActivityTypeFilter';
import TechGiantEducationSection from "@/components/main/TechGiantEducationSection";
import VolunteerProgramSection from "@/components/main/VolunteerProgramSection";
import ActivityGrid from "@/components/main/ActivityGrid";
import ActivityDetailPage from './[ActivityId]/page';
import { MapView } from '@/components/main/MapView';
import { ActivityProps } from '@/components/main/ActivityCard';
import { Map, Globe } from 'lucide-react';

export default function Main() {

  const [showDetailPage, setShowDetailPage] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityProps | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeCategory, setActiveCategory] = useState<string>('any');


  const skyActivities: ActivityProps[] = [{
    id: 'sky-1',
    title: 'Guided tour of NASA Ames Research Center with a mini talk from a scientist',
    location: 'Mountain View, CA',
    price: 25,
    rating: 5.0,
    reviewCount: 32,
    imageUrl: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 10,
    date: 'TUE, AUG 6',
    time: '10:00 AM',
    ageRange: '8-12',
    category: 'Space',
    coordinates: [37.41, -122.0648],
    sponsorLogo: "/pasted-image.png"
  }, {
    id: 'sky-2',
    title: 'Air Show experiences at Moffett Field and Salinas Air Show',
    location: 'Moffett Field, CA',
    price: 29,
    rating: 5.0,
    reviewCount: 24,
    imageUrl: 'https://images.unsplash.com/photo-1533486509112-9ddd21d4a392?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 10,
    date: 'WED, AUG 7',
    time: '9:00 AM',
    ageRange: '6-14',
    category: 'Aviation',
    coordinates: [37.416, -122.049],
    isFree: true
  }, {
    id: 'sky-3',
    title: 'Drone coding and flight workshops, including FPV drone racing',
    location: 'San Jose, CA',
    price: 28,
    rating: 4.9,
    reviewCount: 18,
    imageUrl: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 7,
    date: 'THU, AUG 8',
    time: '1:00 PM',
    ageRange: '10-14',
    category: 'Coding',
    coordinates: [37.3382, -121.8863] // San Jose coordinates
  }, {
    id: 'sky-4',
    title: 'Stargazing programs at Lick Observatory and Foothill College',
    location: 'San Jose, CA',
    price: 29,
    rating: 5.0,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 6,
    date: 'FRI, AUG 9',
    time: '8:00 PM',
    ageRange: '8-14',
    category: 'Astronomy',
    coordinates: [37.3412, -121.6429],
    isFree: true,
    sponsorLogo: "/image.png"
  }, {
    id: 'sky-5',
    title: 'Model rocket building and launch STEM camp',
    location: 'Sunnyvale, CA',
    price: 24,
    rating: 4.98,
    reviewCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1518124880310-14f4ed096a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 12,
    date: 'SAT, AUG 10',
    time: '10:00 AM',
    ageRange: '9-12',
    category: 'STEM',
    coordinates: [37.3688, -122.0363] // Sunnyvale coordinates
  }, {
    id: 'sky-6',
    title: 'Glider or light aircraft flight experience',
    location: 'Palo Alto, CA',
    price: 29,
    rating: 4.95,
    reviewCount: 23,
    imageUrl: 'https://images.unsplash.com/photo-1464755590399-9a10aaad26e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 9,
    date: 'SUN, AUG 11',
    time: '11:00 AM',
    ageRange: '12-14',
    category: 'Aviation',
    coordinates: [37.4419, -122.143],
    sponsorLogo: "/image.png"
  }, {
    id: 'sky-7',
    title: 'Weather balloon launch and tracking adventure',
    location: 'Los Altos, CA',
    price: 27,
    rating: 4.93,
    reviewCount: 15,
    imageUrl: 'https://images.unsplash.com/photo-1534481016308-0fca71578ae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 1,
    date: 'MON, AUG 12',
    time: '9:00 AM',
    ageRange: '10-14',
    category: 'Science',
    coordinates: [37.3852, -122.1141],
    isFree: true
  }];
  const seaActivities: ActivityProps[] = [{
    id: 'sea-1',
    title: 'Special educational programs at the Monterey Bay Aquarium',
    location: 'Monterey, CA',
    price: 26,
    rating: 4.97,
    reviewCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 8,
    date: 'TUE, AUG 6',
    time: '9:30 AM',
    ageRange: '6-12',
    category: 'Marine',
    coordinates: [36.6182, -121.9019] // Monterey Bay Aquarium coordinates
  }, {
    id: 'sea-2',
    title: 'Tide pool exploration at Half Moon Bay and Fitzgerald Marine Reserve',
    location: 'Half Moon Bay, CA',
    price: 22,
    rating: 4.9,
    reviewCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 5,
    date: 'WED, AUG 7',
    time: '10:00 AM',
    ageRange: '6-10',
    category: 'Ecology',
    coordinates: [37.4636, -122.4286],
    isFree: true
  }, {
    id: 'sea-3',
    title: 'Marine drone (ROV) building workshops',
    location: 'Santa Cruz, CA',
    price: 28,
    rating: 4.95,
    reviewCount: 28,
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 10,
    date: 'THU, AUG 8',
    time: '1:00 PM',
    ageRange: '10-14',
    category: 'Engineering',
    coordinates: [36.9741, -122.0308] // Santa Cruz coordinates
  }, {
    id: 'sea-4',
    title: 'Introductory sailing classes (Junior Sailing Camp)',
    location: 'Redwood City, CA',
    price: 29,
    rating: 4.93,
    reviewCount: 35,
    imageUrl: 'https://images.unsplash.com/photo-1534294228306-bd54eb9a7ba8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 3,
    date: 'FRI, AUG 9',
    time: '9:00 AM',
    ageRange: '8-14',
    category: 'Sailing',
    coordinates: [37.507, -122.211] // Redwood City coordinates
  }, {
    id: 'sea-5',
    title: 'Beach cleanup volunteer work combined with ocean conservation education',
    location: 'Santa Cruz, CA',
    price: 15,
    rating: 4.98,
    reviewCount: 89,
    imageUrl: 'https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 4,
    date: 'SAT, AUG 10',
    time: '8:00 AM',
    ageRange: '6-14',
    category: 'Conservation',
    isFree: true,
    coordinates: [36.9628, -122.0194] // Santa Cruz Beach coordinates
  }, {
    id: 'sea-6',
    title: 'Surfing or snorkeling basics in a wave pool',
    location: 'Santa Clara, CA',
    price: 27,
    rating: 4.9,
    reviewCount: 52,
    imageUrl: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 6,
    date: 'SUN, AUG 11',
    time: '11:00 AM',
    ageRange: '8-12',
    category: 'Water Sports',
    coordinates: [37.3541, -121.9552],
    isFree: true
  }];
  const groundActivities: ActivityProps[] = [{
    id: 'ground-1',
    title: 'U-pick farm experiences for cherries, strawberries, and apples',
    location: 'Brentwood, CA',
    price: 19,
    rating: 4.9,
    reviewCount: 74,
    imageUrl: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 4,
    date: 'TUE, AUG 6',
    time: '9:00 AM',
    ageRange: '6-12',
    category: 'Agriculture',
    coordinates: [37.9319, -121.6957],
    isFree: true
  }, {
    id: 'ground-2',
    title: 'Hidden Villa educational farm: animal care and vegetable gardening',
    location: 'Los Altos Hills, CA',
    price: 24,
    rating: 4.95,
    reviewCount: 68,
    imageUrl: 'https://images.unsplash.com/photo-1559060567-7d88c29f1e83?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 6,
    date: 'WED, AUG 7',
    time: '10:00 AM',
    ageRange: '6-10',
    category: 'Farming',
    coordinates: [37.3796, -122.1375] // Los Altos Hills coordinates
  }, {
    id: 'ground-3',
    title: 'Hiking & nature exploration at Rancho San Antonio and Almaden Quicksilver',
    location: 'Los Altos, CA',
    price: 18,
    rating: 4.98,
    reviewCount: 92,
    imageUrl: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 12,
    date: 'THU, AUG 8',
    time: '8:00 AM',
    ageRange: '8-14',
    category: 'Hiking',
    coordinates: [37.3323, -122.0872],
    isFree: true
  }, {
    id: 'ground-4',
    title: 'Rock climbing experiences (indoor & outdoor)',
    location: 'Sunnyvale, CA',
    price: 25,
    rating: 4.9,
    reviewCount: 45,
    imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 8,
    date: 'FRI, AUG 9',
    time: '1:00 PM',
    ageRange: '10-14',
    category: 'Climbing',
    coordinates: [37.3688, -122.0363] // Sunnyvale coordinates
  }, {
    id: 'ground-5',
    title: 'Urban gardening & smart farm education',
    location: 'San Jose, CA',
    price: 22,
    rating: 4.85,
    reviewCount: 38,
    imageUrl: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 5,
    date: 'SAT, AUG 10',
    time: '10:00 AM',
    ageRange: '6-12',
    category: 'Gardening',
    coordinates: [37.3382, -121.8863],
    isFree: true
  }, {
    id: 'ground-6',
    title: 'Volcano and geology exploration workshops',
    location: 'Mountain View, CA',
    price: 24,
    rating: 4.92,
    reviewCount: 26,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    duration: 7,
    date: 'SUN, AUG 11',
    time: '1:00 PM',
    ageRange: '8-12',
    category: 'Geology',
    coordinates: [37.3861, -122.0839],
    isFree: true
  }];


  const allActivities = [...skyActivities, ...seaActivities, ...groundActivities];
  const handleActivityClick = (activity: ActivityProps) => {
    setSelectedActivity(activity);
    setShowDetailPage(true);
  };
  type Filters = {
    date?: string;
    age?: string;
  };
  const handleFilter = (filters: Filters) => {
    console.log('Filters applied:', filters);
  };
  const toggleViewMode = (mode: 'list' | 'map') => {
    setViewMode(mode);
  };
  const handleCloseDetailPage = () => {
    setShowDetailPage(false);
    setSelectedActivity(undefined);
  };
  const handleCategoryFilterChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {showDetailPage ? <ActivityDetailPage activity={selectedActivity} onClose={handleCloseDetailPage} /> : <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <div className="container mx-auto px-2 py-6">
          <CategoryTabs />
          <ActivityTypeFilter onFilterChange={handleCategoryFilterChange} />
          <FilterPanel onFilter={handleFilter} />

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
            {/* Unified Grid View of Activities */}
            <ActivityGrid activities={allActivities} onActivityClick={handleActivityClick} />
            <TechGiantEducationSection />
            <VolunteerProgramSection />
          </> : <div className="mb-16">

            {/* 지도 라이브러리 버전 이슈 <MapView activities={allActivities} onActivityClick={handleActivityClick} /> */}
          </div>}

        </div>
      </main>
      <Footer />
      </>}
    </div>
  );
}