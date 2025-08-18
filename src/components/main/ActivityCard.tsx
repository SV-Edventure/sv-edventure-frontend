import { MapPin } from 'lucide-react';

export interface ActivityProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  duration: number;
  date?: string;
  time?: string;
  ageRange?: string;
  category?: string;
  isFree?: boolean;
  coordinates?: [number, number]; // [latitude, longitude]
  sponsorLogo?: string; // New prop for sponsor logo
}

export default function ActivityCard({
  id,
  title,
  location,
  price,
  imageUrl,
  date,
  time,
  ageRange,
  category,
  isFree,
  rating,
  reviewCount,
  duration,
  coordinates,
  sponsorLogo,
}: ActivityProps) {
  const activity: ActivityProps = {
    id,
    title,
    location,
    price,
    rating,
    reviewCount,
    imageUrl,
    duration,
    date,
    time,
    ageRange,
    category,
    isFree,
    coordinates,
    sponsorLogo
  };

  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer" onClick={() => { console.log("AcivityCard Button Clicked!") }}>
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        {/* Sponsor Logo Ribbon - Now Bigger */}
        {sponsorLogo && <div className="absolute top-0 right-0">
          <div className="bg-white py-2 px-4 shadow-md rounded-bl-lg">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 mr-2">
                Sponsored by
              </span>
              <img src={sponsorLogo} alt="Sponsor" className="h-6" />
            </div>
          </div>
        </div>}
      </div>
      <div className="p-4">
        {/* Date and Time */}
        {(date || time) && <div className="text-blue-600 font-medium mb-2">
          {date} {time && `• ${time}`}
        </div>}
        {/* Title */}
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
        {/* Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{location}</span>
        </div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {ageRange && <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
            Ages {ageRange}
          </span>}
          {category && <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {category}
          </span>}
          {isFree ? <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
            Free
          </span> : <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
            ${price}
          </span>}
        </div>
      </div>
    </div>
  )
}