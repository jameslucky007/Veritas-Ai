"use client"

const Landing = () => {
        return (
      <>
      <section>
     <div className="relative min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-white flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Navbar */}
        <header className="absolute top-0 w-full flex items-center justify-between px-8 py-4 bg-transparent">
          <h1 className="text-xl font-bold">True Fact</h1>
          <nav className="hidden md:flex space-x-6 text-gray-300">
            <a href="#" className="hover:text-white">Platform</a>
            <a href="#" className="hover:text-white">Solutions</a>
            <a href="#" className="hover:text-white">Integrations</a>
            <a href="#" className="hover:text-white">Users</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-300 hover:text-white">Log in</button>
            {/* Note: 'Button' component is not defined, using a standard button for the example */}
            <button className="rounded-2xl bg-white text-black px-5 py-2">Get Started</button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Relationship <span className="text-gray-400">Intelligence</span> that Drives <span className="text-gray-400">Revenue</span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Accelerate enterprise deals and boost win rates with automatic account mapping and real-time contact insights.
          </p>
          <div className="mt-8 mb-10">
            <a className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 to-blue-5000 text-white px-6 py-3 rounded-full shadow-lg text-xl">
              Register Here 
            </a>
          </div>
          <p className="mt-6 text-gray-500 text-sm">
            Backed by world-class investors, founders & operators
          </p>
        </div>
      </div>
    </section>

      </>
    )
}

export default Landing;