import { useNavigate } from "react-router-dom"

const AiChat = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full">
            <section className="rounded-xl">
                <div className="px-10 py-7 text-center rounded-xl items-center">
                    <h1 className="text-3xl md:text-4xl mt-10 font-bold text-[#029097] drop-shadow-lg">
                        Smart AI Chat – Your Personal Career & Study Assistant
                    </h1>

                    <p className="text-lg text-gray-600 mt-3 mb-8 ml-4">
                        An intelligent chat assistant designed to answer questions, provide study help, and guide your career journey.
                    </p>
                </div>
            </section>


            <section className="px-25 py-4">
                <div className="flex-col flex gap-6">
                    <h1 className="font-medium text-xl">Features :</h1>
                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Instant Answers</li>
                        <p className="mx-10">Get quick, accurate responses to your coding, career, and academic questions.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">24/7 Availability</li>
                        <p className="mx-10">Your personal AI assistant is always online, ready to help whenever you need it.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Multi-Domain Expertise</li>
                        <p className="mx-10">Covers academics, career guidance, coding help, interview prep, and soft skills.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Career Guidance</li>
                        <p className="mx-10">Receive tailored suggestions for skills, courses, and career opportunities.</p>
                    </div>

                    <div className="mx-10">
                        <li className="font-medium text-gray-700">Personalized Memory</li>
                        <p className="mx-10">The AI remembers your preferences, skills, and past conversations for better guidance.</p>
                    </div>

                    <p className="font-medium text-gray-600">Study smarter, not harder — let ClarityNext’s AI Chat guide you every step of the way.</p>
                </div>
            </section>

            <section className="px-25 py-4">
                <div className="">
                    <h1 className="font-medium text-xl ">CTA :</h1>
                    <div className="flex gap-5 p-6">
                        <button
                        onClick={()=>{navigate("/chatwithai")}}
                        className="border-2 border-gray-400 text-gray-600 py-2 px-7 font-medium rounded-2xl cursor-pointer">
                            Chat With Ai
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AiChat
