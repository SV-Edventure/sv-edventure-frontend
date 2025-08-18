import { Compass } from 'lucide-react';

export default function MainHeader() {
    return (
        <header className="bg-white shadow-sm py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Compass className="h-8 w-8 text-indigo-600" />
                    <span className="font-bold text-xl">
                        Silicon Valley Kids Edventure
                    </span>
                </div>

            </div>
        </header>
    );
}