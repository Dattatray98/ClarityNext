import { FaSearch } from "react-icons/fa";
import Navbar from "../Components/Navbar"
import { BlogTabLinks } from "../Types/types"

const BlogPage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-200 to-blue-50">
      <Navbar />
      <div className="py-10 px-30">
        <div className="border shadow-md border-gray-300 rounded-2xl p-5 bg-white">
          <div className="flex gap-2">
            <div className="border-2 border-gray-200 h-11 w-[60vh] rounded-xl items-center flex focus-within:border-[#029097] ">
              <input type="text" placeholder="Search Blog here..." className="h-full w-full rounded-l-xl px-5 outline-none" />
            </div>
            <div className="flex border-2 hover:border-[#029097] border-gray-200 duration-500 rounded-xl cursor-pointer bg-gray-100 text-gray-500 h-11 items-center font-medium text-lg px-2">
              <FaSearch className="h-8 w-8 p-2 mt-1 " />
              Search
            </div>
          </div>
          <div className="mt-5 flex gap-5 p-5">
            {BlogTabLinks.map((tab) => {
              return (
                <div key={tab.id}
                  className="border px-5 py-1 rounded-2xl"
                >
                  {tab.label}
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <section className="border-t-2 border-gray-300 px-30 py-10">
        <div className="border h-80">

        </div>
      </section>
    </div>
  )
}

export default BlogPage

