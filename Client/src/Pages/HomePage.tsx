import Footer from "../Components/Footer"
import { IoIosArrowForward } from "react-icons/io";
import Navbar from "../Components/Navbar"
import { RiChatSmileAiLine } from "react-icons/ri";
import { Features } from "../Types/types";

const HomePage = () => {
  // Consider making the username dynamic by fetching from user context/state
  // const { user } = useAuth(); // Example: if you have authentication context
  // const userName = user?.name || "User";


  return (
    <div className="bg-gray-100 ">
      <Navbar />

      {/* Hero Section */}
      <section>
        <div className="p-10 min-h-[40vh] bg-gradient-to-b from-[#e2f7f8] to-gray-100 text-center">
          <h1 className="text-3xl md:text-4xl mt-15 font-bold text-[#029097] drop-shadow-lg">
            Welcome Back to Your Dashboard, User!
            {/* Change to: Welcome Back, {userName}! */}
          </h1>

          <p className="text-xl text-gray-600 mt-3 mb-8 ml-4">
            Here's your personalized academic snapshot. Review your recent progress and next recommended steps.
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            {/* Added flex-wrap for better responsiveness */}
            <button className="px-5 py-2 text-lg font-medium shadow-md border-t-2 border-t-gray-100 hover:border-gray-400 transition-all duration-400 bg-gradient-to-bl from-green-50 to-cyan-50 rounded-2xl border-b-2 border-b-gray-600">
              View Goals & Recommendations
            </button>

            <button className="px-5 py-2 flex items-center gap-2 text-lg font-medium shadow-md border-t-2 border-t-gray-100 hover:border-gray-400 transition-all duration-400 bg-gradient-to-bl from-green-50 to-cyan-50 rounded-2xl border-b-2 border-b-gray-600">
              <RiChatSmileAiLine /> Chat with AI
            </button>
          </div>
        </div>
      </section>

      {/* Stats/Overview Cards Section */}
      <section className="px-3">
        <div className="flex flex-wrap justify-center gap-5 p-10">

          {Features.map((Features) => {
            return (
              <div className="border bg-blue-50 max-w-[40vh] p-5 rounded-2xl border-gray-200 hover:shadow-md shadow-sm group hover:scale-[1.02] transition-all duration-300 cursor-pointer flex-wrap hover:bg-blue-100">
                <h1 className="font-medium text-xl flex items-center">
                  {Features.lable}
                  <IoIosArrowForward className="h-5 w-5 mt-1 text-gray-700 group-hover:scale-[0.96] font-bold group-hover:ml-1 transition-all duration-200" />
                </h1>
                {/* Add actual tasks data here later */}
                <div className="mt-4 text-gray-600">
                  <p>Last Mock Interview: Good clarity, needs more confidence.</p>
                  <p>Attempts This Week: 2</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industry Insights Section */}
      <section className="px-5 py-3">
        <div className="px-10 py-4">
          <h1 className="font-bold text-2xl text-gray-700">Check Out Industry Insights</h1>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10 items-start md:items-center justify-between mt-1">
            {/* Made flex-col for mobile */}
            <p className="text-gray-600 font-medium max-w-2xl">
              Stay ahead of the curve with news tailored to your career path.
              Switch perspectives using the tabs below.
            </p>
            <a href="/blogpage" className="text-blue-800 font-medium hover:text-blue-600 transition-colors">
              Go to Blog Page →
            </a>
          </div>
        </div>

        <div className="border-y-2 border-gray-300 rounded-2xl max-h-[100vh] space-y-5 overflow-y-auto p-5 scrollbar-hidden">


          {/* Blog Card 1 */}
          <div className="border border-gray-200 bg-white rounded-xl flex flex-col md:flex-row shadow-sm hover:shadow-md group transition-shadow">
            <div className="md:w-[35%] p-2">
              <img
                src="./bg2.avif"
                alt="Python programming language trends"
                className="w-full h-48 md:h-full object-cover rounded-xl group-hover:scale-[1.02] transition-all duration-500"
              />
            </div>

            <div className="md:w-[65%] p-5 space-y-2">
              <h1 className="text-xl md:text-2xl font-medium text-gray-700">
                Python Tops 2024 Most In-Demand Programming Languages List
              </h1>
              <div className="ml-2 space-y-3">
                <p className="font-medium text-gray-600 text-sm">
                  Tech Journal • 2 hrs ago • Trending in CS
                </p>
                <p className="text-gray-700">
                  Based on your strong performance in CS101, mastering Python could make you
                  a top candidate for data science roles.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium mt-2">
                  Read full article →
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default HomePage