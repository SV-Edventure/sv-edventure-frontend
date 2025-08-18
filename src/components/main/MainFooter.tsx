import { Compass, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function MainFooter() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Compass className="h-6 w-6 text-indigo-400" />
                            <span className="font-bold text-lg">
                                Silicon Valley Kids Edventure
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Inspiring the next generation of explorers, scientists, and
                            environmental stewards through hands-on learning adventures.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#sky" className="text-gray-400 hover:text-white transition-colors">
                                    Sky Adventures
                                </a>
                            </li>
                            <li>
                                <a href="#sea" className="text-gray-400 hover:text-white transition-colors">
                                    Sea Explorations
                                </a>
                            </li>
                            <li>
                                <a href="#ground" className="text-gray-400 hover:text-white transition-colors">
                                    Ground Discoveries
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Upcoming Events
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Summer Camps
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Information</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Safety Guidelines
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Educational Approach
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    Testimonials
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                                <p className="text-gray-400">
                                    123 Innovation Way, Palo Alto, CA 94301
                                </p>
                            </div>
                            <div className="flex items-start">
                                <Mail className="h-5 w-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                                <p className="text-gray-400">info@svkidsedventure.org</p>
                            </div>
                            <div className="flex items-start">
                                <Phone className="h-5 w-5 text-indigo-400 mr-3 mt-1 flex-shrink-0" />
                                <p className="text-gray-400">(650) 555-0123</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>
                        © {new Date().getFullYear()} Silicon Valley Kids Edventure
                        Platform. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}