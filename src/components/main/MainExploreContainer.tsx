interface MainExploreContainerProps {
    title: string;
    subtitle: string;
    description: string;
    bgColor: string;
}

export default function MainExploreContainer({
    title,
    subtitle,
    description,
    bgColor,
}: MainExploreContainerProps) {

  return (
    <div className="main-explore-container">
        <div className="mx-auto max-w-screen-2xl px-10">
          <div className={`rounded-3xl ${bgColor} px-4 py-25`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 id="sky" className="text-3xl font-bold">{title}</h2>
                <p className="text-xl font-medium text-gray-600 mt-1">{subtitle}</p>
                <p className="mt-10 text-lg mb-8 max-w-3xl">
                    {description}
                </p>
              </div>
              <a href="#" className="mt-2 inline-flex items-center px-4 py-2 font-medium text-indigo-600 font-medium hover:underline">
                모두 보기
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
              </a>
            </div>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="py-36 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow ">Dummy</div>
              <div className="py-36 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
              <div className="py-36 border-gray-200 rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow">Dummy</div>
            </div>
          </div>
        </div>  
    </div>
  );
}