import { MapPin, Star } from 'lucide-react';
import { ActivityProps } from './ActivityCard';

interface ActivityGridProps {
    activities: ActivityProps[];
    onActivityClick?: (activity: ActivityProps) => void;
}

export default function ActivityGrid({
    activities,
    onActivityClick
}: ActivityGridProps) {
    return (
        <div className="mb-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {activities.map(activity => <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer" onClick={() => onActivityClick && onActivityClick(activity)}>
                        <div className="relative">
                            <img src={activity.imageUrl} alt={activity.title} className="w-full h-48 object-cover" />
                            {/* Sponsor Logo Ribbon - Now Bigger */}
                            {activity.sponsorLogo && <div className="absolute top-0 right-0">
                                <div className="bg-white py-2 px-4 shadow-md rounded-bl-lg">
                                    <div className="flex items-center">
                                        <span className="text-sm font-medium text-gray-600 mr-2">
                                            Sponsored by
                                        </span>
                                        <img src={activity.sponsorLogo} alt="Sponsor" className="h-6" />
                                    </div>
                                </div>
                            </div>}
                            <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
                                {activity.duration} 시간
                            </div>
                            {activity.date && <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {activity.date}
                            </div>}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-base mb-2 line-clamp-2">
                                {activity.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2 text-sm">
                                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                                <span className="truncate">{activity.location}</span>
                            </div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-3">
                                {activity.ageRange && <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                    Ages {activity.ageRange}
                                </span>}
                                {activity.category && <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    {activity.category}
                                </span>}
                                {activity.isFree ? <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    Free
                                </span> : <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                                    ${activity.price}
                                </span>}
                            </div>
                            <div className="flex justify-between items-center">
                                {activity.time && <span className="text-gray-600 text-xs">
                                    {activity.time}
                                </span>}
                                <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                                    <span className="text-sm">
                                        {activity.rating} ({activity.reviewCount})
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}