export default function GetStarted() {
  const resources = [
    {
      title: 'Material blog',
      description: 'News, tutorials, and inspiration from the Material team',
      link: '/blog', // Replace with your actual link
    },
    {
      title: 'Figma M3 Design Kit',
      description: 'Customizable styles and components to help you design with Material',
      link: '/figma', // Replace with your actual link
    },
    {
      title: 'Get started',
      description: 'Guides, videos, and tools to start building with Material',
      link: '/get-started', // Replace with your actual link
    },
    {
      title: 'Develop',
      description: 'Code and developer documentation for building with Material',
      link: '/develop', // Replace with your actual link
    },
  ];
  return (
    <div className="h-auto md:h-[85vh] overflow-hidden bg-[#d4ff00] rounded-[24px] mt-[8px] ml-[8px] mr-[8px] ">
      {/* Orange blob shapes - using pseudo elements for the background shapes */}


      {/* Main content */}
      <div className="container mx-auto px-4 pt-[150px] pb-[10px] getbg">
           {/* Dots - Adjusted positioning */}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4">Get Started</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get to know Material 3 – from UX guidance and tools to reusable components and open-source code
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 gap-2 mx-auto w-full max-w-[1450px] md:ml-0 md:mr-0">
          {/* Added max-w for responsiveness */}
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              className="bg-[--mio-theme-color-surface-1] dark:bg-[#1C1B1D] dark:hover:bg-[#45455A] p-6 rounded-[24px] hover:bg-[--there-hover-coloer] transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold mb-2 font-google-sans">{resource.title}</h3>
              <p className="font-google-sans">{resource.description}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}

