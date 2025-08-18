import React, { useState } from 'react';
import { Star, Users, PartyPopper, Palette, Dumbbell, Tent, Briefcase, Cpu, Leaf } from 'lucide-react';
interface ActivityTypeFilterProps {
    onFilterChange: (category: string) => void;
}
export default function ActivityTypeFilter({
    onFilterChange
}: ActivityTypeFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('any');
    const categories = [{
        id: 'any',
        name: 'Any category',
        icon: <Star className="h-6 w-6" />
    }, {
        id: 'groups',
        name: 'New Groups',
        icon: <Users className="h-6 w-6" />
    }, {
        id: 'social',
        name: 'Social Activities',
        icon: <PartyPopper className="h-6 w-6" />
    }, {
        id: 'hobbies',
        name: 'Hobbies & Passions',
        icon: <Palette className="h-6 w-6" />
    }, {
        id: 'sports',
        name: 'Sports & Fitness',
        icon: <Dumbbell className="h-6 w-6" />
    }, {
        id: 'travel',
        name: 'Travel & Outdoor',
        icon: <Tent className="h-6 w-6" />
    }, {
        id: 'career',
        name: 'Career & Business',
        icon: <Briefcase className="h-6 w-6" />
    }, {
        id: 'technology',
        name: 'Technology',
        icon: <Cpu className="h-6 w-6" />
    }, {
        id: 'community',
        name: 'Community & Environment',
        icon: <Leaf className="h-6 w-6" />
    }];
    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        onFilterChange(categoryId);
    };
    return <div className="w-full overflow-x-auto py-4">
        <div className="flex space-x-8 min-w-max px-4">
            {categories.map(category => <div key={category.id} className={`flex flex-col items-center cursor-pointer transition-colors ${selectedCategory === category.id ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => handleCategoryClick(category.id)}>
                <div className={`p-3 rounded-full mb-2 ${selectedCategory === category.id ? 'bg-gray-100' : 'bg-white'}`}>
                    {category.icon}
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                    {category.name}
                </span>
                {selectedCategory === category.id && <div className="h-1 w-12 bg-black mt-2 rounded-full"></div>}
            </div>)}
        </div>
    </div>;
};