export default function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-100 to-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-xl md:text-2xl lg:text-4xl font-extrabold leading-tight mb-6 text-indigo-800">
                            Explore Sky, Sea, and Ground
                        </h1>
                        <div className="w-24 h-1 bg-indigo-500 mx-auto mb-6"></div>
                        <p className="text-sm md:text-base text-gray-700 mb-6 max-w-xl mx-auto leading-snug">
                            A local hub for Silicon Valley families, offering real-world STEM adventures, nature explorations, and community activities for curious young minds.
                        </p>
                    </div>
                </div>
            </div>
            <div className="absolute -bottom-10 left-0 right-0 h-20 bg-white transform -skew-y-3"></div>
        </section>
    )
}