import React, { useState } from 'react';
import { BookOpen, Map, Video } from 'lucide-react';
interface CategoryTabsProps {
    onTabChange?: (tab: string) => void;
}

export default function CategoryTabs({
    onTabChange
}: CategoryTabsProps) {
    const [activeTab, setActiveTab] = useState('experience');
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        if (onTabChange) {
            onTabChange(tab);
        }
    };
    return <div className="container mx-auto px-4 mb-6 mt-0">
        <div className="flex justify-center items-end space-x-12 py-2">
            {/* Learn Tab */}
            <div className={`flex flex-col items-center cursor-pointer ${activeTab === 'learn' ? 'opacity-100' : 'opacity-70'}`} onClick={() => handleTabClick('learn')}>
                <div className="relative mb-2">
                    <div className="bg-blue-50 p-4 rounded-full">
                        <BookOpen size={32} className="text-blue-600" />
                    </div>
                </div>
                <span className="font-medium">Learn</span>
                {activeTab === 'learn' && <div className="h-1 w-16 bg-black mt-3 rounded-full"></div>}
            </div>
            {/* Experience Tab */}
            <div className={`flex flex-col items-center cursor-pointer ${activeTab === 'experience' ? 'opacity-100' : 'opacity-70'}`} onClick={() => handleTabClick('experience')}>
                <div className="relative mb-2">
                    <div className="bg-orange-50 p-4 rounded-full">
                        <Map size={32} className="text-orange-600" />
                    </div>
                </div>
                <span className="font-medium">체험</span>
                {activeTab === 'experience' && <div className="h-1 w-16 bg-black mt-3 rounded-full"></div>}
            </div>
            {/* Watching Tab */}
            <div className={`flex flex-col items-center cursor-pointer ${activeTab === 'watching' ? 'opacity-100' : 'opacity-70'}`} onClick={() => handleTabClick('watching')}>
                <div className="relative mb-2">
                    <div className="bg-gray-100 p-4 rounded-full">
                        <Video size={32} className="text-gray-600" />
                    </div>
                </div>
                <span className="font-medium">Watching</span>
                {activeTab === 'watching' && <div className="h-1 w-16 bg-black mt-3 rounded-full"></div>}
            </div>
        </div>
    </div>;
};