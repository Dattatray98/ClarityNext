import { useNavigate } from "react-router-dom"

const StayUpdated = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full">
            <section className="rounded-xl">
                <div className="px-10 py-7 text-center rounded-xl items-center">
                    <h1 className="text-3xl md:text-4xl mt-10 font-bold text-[#029097] drop-shadow-lg">
                        Stay Updated – Your Gateway to the Tech World
                    </h1>

                    <p className="text-lg text-gray-600 mt-3 mb-8 ml-4">
                        Never miss out on the latest trends, industry insights, and market movements in technology.
                    </p>
                </div>
            </section>


            <section className="px-25 py-4">
                <div className="flex-col flex gap-6">
                    <h1 className="font-medium text-xl">Features :</h1>
                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Daily Tech Blogs</li>
                        <p className="mx-10">Explore curated blogs covering coding, AI, data science, software engineering, and more.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Industry News</li>
                        <p className="mx-10">Get real-time updates about what’s happening in the global tech industry.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Market Trends</li>
                        <p className="mx-10">Stay ahead with analysis on startups, innovations, and future opportunities.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Career Insights</li>
                        <p className="mx-10">Articles and reports highlighting in-demand skills, tools, and roles in the tech world.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Weekly Roundups</li>
                        <p className="mx-10">A digest of the week’s most important tech updates, handpicked for you.</p>
                    </div>

                    <p className="font-medium text-gray-600">Stay informed, stay inspired — ClarityNext keeps you connected with the future of tech.</p>
                </div>
            </section>

            <section className="px-25 py-4">
                <div className="">
                    <h1 className="font-medium text-xl ">CTA :</h1>
                    <div className="flex gap-5 p-6">
                        <button
                        onClick={()=>{navigate('/blogpage')}}
                        className="border-2 border-gray-400 text-gray-600 py-2 px-7 font-medium rounded-2xl cursor-pointer">
                            Vist Blog Page
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StayUpdated
