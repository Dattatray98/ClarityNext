
const AboutSections = () => {
    return (
        <section className="relative h-auto py-5 border-t border-[#029097] ">
            <div className="container mx-auto px-4 py-12">

                <h1 className="font-medium text-3xl text-[#029097] text-center mb-8"> About Us</h1>
                <div className="grid md:grid-cols-2 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-1 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 text-[#029097]">Our Mission</h2>
                        <p className="text-gray-700">
                            At ClarityNext, we're dedicated to helping students find their path through personalized guidance
                            and comprehensive resources tailored to their unique strengths and aspirations.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
                        <h2 className="text-xl font-semibold mb-4 text-[#029097]">How We Help</h2>
                        <p className="text-gray-700">
                            Our platform combines AI-driven insights with expert counseling to provide clear roadmaps
                            for educational and career success, turning confusion into clarity.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl translate-y-2 border border-gray-100 group">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <svg className="w-6 h-6 text-[#029097]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Personalized Guidance</h3>
                        <p className="text-gray-600">Tailored advice based on your unique strengths and interests.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 group">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <svg className="w-6 h-6 text-[#029097]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Career Roadmaps</h3>
                        <p className="text-gray-600">Clear pathways to achieve your educational and career goals.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 group">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                            <svg className="w-6 h-6 text-[#029097]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Expert Support</h3>
                        <p className="text-gray-600">Connect with professionals who can guide your journey.</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AboutSections
