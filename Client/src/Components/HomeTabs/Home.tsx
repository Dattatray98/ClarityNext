
const Home = () => {
  return (
    <div className="w-full h-full  bg-gradient-to-b from-[#e2f7f8] to-gray-50 ">
      <section className="rounded-xl">
        <div className="p-10 min-h-[40vh] text-center rounded-xl items-center">
          <h1 className="text-3xl md:text-4xl mt-16 font-bold text-[#029097] drop-shadow-lg">
            Unlock Your Learning Potential with ClarityNext
          </h1>

          <p className="text-xl text-gray-600 mt-3 mb-8 ml-4">
            Discover powerful tools designed to guide your career, personalize your learning, and keep you ahead in the tech world.
          </p>

          <div className="flex justify-center">
            <p className="max-w-[100vh] text-gray-500"> <b>ClarityNext</b> empowers students and professionals with AI-driven tools to explore personalized career paths, master new skills, and stay ahead in the fast-changing tech world. With powerful insights and seamless access to resources, learning becomes clear, structured, and future-ready</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose ClarityNext?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#029097]">🎯 Career Guidance</h3>
            <p className="text-gray-600 mt-2">AI-powered recommendations to shape your career path.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#029097]">📚 Skill Roadmaps</h3>
            <p className="text-gray-600 mt-2">Step-by-step guides to learn and master skills faster.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-[#029097]">📊 Progress Tracking</h3>
            <p className="text-gray-600 mt-2">Track your growth and stay ahead with insights.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home;
