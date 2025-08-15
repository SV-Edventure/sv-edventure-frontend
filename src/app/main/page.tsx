import MainExploreContainer from "@/components/main/MainExploreContainer";

export default function Main() {
  return (
    <main>
      <section className="bg-gradient-to-b from-indigo-100 to-white">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-800">
            Explore Sky, Sea, and Ground
          </h1>
          <div className="my-6 h-1 w-24 bg-indigo-500 mx-auto rounded"></div>
          <p className="text-sm md:text-base text-gray-700 mb-6 max-w-xl mx-auto leading-snug">
            A local hub for Silicon Valley families, offering real-world STEM adventures,
            nature explorations, and community activities for curious young minds.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex items-start justify-center gap-12">
            <button className="group flex flex-col items-center gap-3 focus:outline-none">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 shadow-sm">
                <span className="text-3xl">📘</span>
              </span>
              <span className="text-base font-medium text-gray-900">Learn</span>
              <span className="mt-1 h-1 w-12 rounded-full bg-black" />
            </button>

            <button className="group flex flex-col items-center gap-3 text-gray-500 focus:outline-none">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-400">
                <span className="text-3xl">🗺️</span>
              </span>
              <span className="text-base font-medium">체험</span>
            </button>

            <button className="group flex flex-col items-center gap-3 text-gray-500 focus:outline-none">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <span className="text-3xl">🎥</span>
              </span>
              <span className="text-base font-medium">Watching</span>
            </button>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200 shadow-sm">
            <div className="grid grid-cols-4">
              <div className="flex flex-col justify-center gap-1 p-6 border-r border-gray-200">
                <p className="text-sm text-gray-500">Activity Type</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Select activities</span>
                  <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" /></svg>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-1 p-6 border-r border-gray-200">
                <p className="text-sm text-gray-500">Date</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Select Date</span>
                  <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" /></svg>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-1 p-6 border-r border-gray-200">
                <p className="text-sm text-gray-500">Age</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-lg font-medium text-gray-900">Select Age</span>
                  <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" /></svg>
                </div>
              </div>

              <div className="flex items-center justify-center p-6">
                <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400/50">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="weekly-programs" className="py-10">
        <div className="mx-auto max-w-screen-2xl px-15">
          <h2 id="weekly-programs" className="text-3xl font-bold">
            This Week&apos;s Programs
          </h2>
          <div className="mt-6 rounded-3xl bg-indigo-50/40 p-4 sm:p-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="popular-activities" className="py-10">
        <div className="mx-auto max-w-screen-2xl px-15">
          <h2 id="popular-activities" className="text-3xl font-bold">
            Popular Activities This Month
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
            <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
            <div className="py-30 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
          </div>
        </div>
      </section>

      <section aria-labelledby="sky" className="py-10">
        <MainExploreContainer
          title="Sky Adventures ✈️"
          subtitle="Air, Space &amp; Aviation"
          description="STEM + adventure activities inspired by the sky and space. Perfect for young aviators, astronauts, and drone enthusiasts."
          bgColor="bg-blue-50"
        />
      </section>

      <section aria-labelledby="Land" className="py-10">
        <MainExploreContainer
          title="Land Discoveries 🌱"
          subtitle="Land, Nature &amp; Agriculture"
          description="Hands-on activities about nature, agriculture, environment, and ecology on land for budding naturalists and environmental scientists."
          bgColor="bg-green-50"  
        />
      </section>

      <section aria-labelledby="ocean" className="py-10">
        <MainExploreContainer
          title="Ocean/Water Explorers 🌊"
          subtitle="Marine &amp; Underwater Ecology"
          description="Exploration-based learning focused on marine life, ocean science, and environmental conservation for future marine biologists."
          bgColor="bg-cyan-50"  
        />
      </section>

      <section aria-labelledby="tech-programs" className="py-10">
        <div className="mx-auto max-w-screen-2xl px-10">
          <div className="p-6 sm:p-10">
            <div className="flex items-start justify-between">
              <h2 id="tech-programs" className="text-2xl font-bold text-blue-700">
                Tech Giants&apos; Educational Programs
              </h2>
              <a href="#" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline">
                View all programs
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>

            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {[
                { logo: "", name: "Apple Camp", desc: "Creative tech workshops for kids" },
                { logo: "Google", name: "Code Next", desc: "Computer science for underrepresented youth" },
                { logo: "NVIDIA", name: "AI Education", desc: "AI & robotics workshops for students" },
                { logo: "intel", name: "Future Skills", desc: "STEM education & tech innovation" },
                { logo: "TESLA", name: "Engineering Days", desc: "EV technology & sustainability programs" },
                { logo: "NASA", name: "Space Academy", desc: "Space science & exploration for kids" },
              ].map((b, i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center text-2xl font-semibold">
                    {b.logo}
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-blue-700 mb-2">{b.name}</h3>
                  <p className="mt-2 text-gray-600 text-sm">{b.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-blue-100 px-6 py-3 text-sm font-semibold text-blue-800 shadow-sm hover:bg-blue-200"
              >
                Find Tech Education Programs Near You
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="volunteer" className="py-12">
        <div className="mx-auto max-w-screen-2xl px-15">
          <div className="rounded-3xl bg-amber-50 p-6 sm:p-10">
            <div className="text-center">
              <h2 id="volunteer" className="text-3xl font-bold mb-4">
                Global Volunteer Programs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Make a difference in developing countries through these family-friendly volunteer opportunities.
                Create lasting memories while helping communities thrive.
              </p>
            </div>

            <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
            </div>

            <div className="mt-10 flex justify-center">
              <a
                href="#"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                View All Global Volunteer Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}