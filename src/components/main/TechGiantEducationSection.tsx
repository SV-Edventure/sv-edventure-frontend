interface EducationProgramProps {
    id: string;
    company: string;
    logo: string;
    title: string;
    description: string;
}

export default function TechGiantEducationSection() {
    const educationPrograms: EducationProgramProps[] = [{
        id: 'apple-1',
        company: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        title: 'Apple Camp',
        description: 'Creative tech workshops for kids'
    }, {
        id: 'google-1',
        company: 'Google',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
        title: 'Code Next',
        description: 'Computer science for underrepresented youth'
    }, {
        id: 'nvidia-1',
        company: 'NVIDIA',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg',
        title: 'AI Education',
        description: 'AI & robotics workshops for students'
    }, {
        id: 'intel-1',
        company: 'Intel',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
        title: 'Future Skills',
        description: 'STEM education & tech innovation'
    }, {
        id: 'tesla-1',
        company: 'Tesla',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png',
        title: 'Engineering Days',
        description: 'EV technology & sustainability programs'
    }, {
        id: 'nasa-1',
        company: 'NASA',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg',
        title: 'Space Academy',
        description: 'Space science & exploration for kids'
    }];
    return (
        <section className="py-10 bg-white">
            <div className="container mx-auto px-8 py-8 bg-white rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold text-blue-700">
                        Tech Giants&apos; Educational Programs
                    </h2>
                    <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                        View all programs
                         {/* <ExternalLink className="h-4 w-4 ml-1" /> */}
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {educationPrograms.map(program => <div key={program.id} className="flex flex-col items-center text-center">
                        <div className="h-16 flex items-center justify-center mb-4">
                            <img src={program.logo} alt={`${program.company} logo`} className="h-full object-contain" />
                        </div>
                        <h3 className="font-bold text-lg text-blue-700 mb-2">
                            {program.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{program.description}</p>
                    </div>)}
                </div>
                <div className="mt-10 flex justify-center">
                    <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-3 px-6 rounded-full transition-colors">
                        Find Tech Education Programs Near You
                    </button>
                </div>
            </div>
        </section>
    );
}