

const Upload = () => {
  return (
    <div className="w-full h-full">
      <section className="rounded-xl">
        <div className="px-10 py-6 text-center rounded-xl items-center">
          <h1 className="text-3xl md:text-4xl mt-10 font-bold text-[#029097] drop-shadow-lg">
            AI-Powered Resume Builder: Craft Your Career Story with Ease
          </h1>

          <p className="text-lg text-gray-600 mt-3 mb-8 ml-4">
            Craft a professional, ATS-friendly resume in minutes with AI guidance.
            Highlight your skills, achievements, and career goals with clarity and impact.
          </p>
        </div>
      </section>

      <section className="px-25 py-3">
        <div className="flex-col flex gap-6">
          <h1 className="font-medium text-xl">Features :</h1>
          <div className="mx-10">
            <li className="font-medium text-gray-700">ATS-Friendly Templates</li>
            <p className="mx-10">Professionally designed templates optimized for Applicant Tracking Systems (ATS), ensuring your resume passes first screenings.</p>
          </div>

          <div className="mx-10">
            <li className="font-medium text-gray-700">One-Click Export</li>
            <p className="mx-10">Download your resume in multiple formats (PDF, Word, or plain text) instantly.</p>
          </div>

          <div className="mx-10">
            <li className="font-medium text-gray-700">Multiple Resume Versions</li>
            <p className="mx-10">Create and save multiple versions of your resume for different roles, industries, or companies.</p>
          </div>

          <div className="mx-10">
            <li className="font-medium text-gray-700">Smart Formatting</li>
            <p className="mx-10">Automatically adjust alignment, spacing, and sections to make your resume look clean and professional.</p>
          </div>

          <div className="mx-10">
            <li className="font-medium text-gray-700">Guided Step-by-Step Builder</li>
            <p className="mx-10">Fill in your details through a simple guided process — no need to worry about design or formatting.</p>
          </div>

          <p className="font-medium text-gray-600">Turn your experience into opportunity — let ClarityNext build your job-ready resume in minutes.</p>
        </div>
      </section>

      <section className="px-25 py-3">
        <div className="">
          <h1 className="font-medium text-xl ">CTA :</h1>
          <div className="flex gap-5 p-6">
            <button className="border-2 border-gray-400 text-gray-600 py-2 px-7 font-medium rounded-2xl cursor-pointer">
              Build Resume
            </button>
            <button className="border-2 border-gray-400 text-gray-600 py-2 px-5 font-medium rounded-2xl cursor-pointer" >
              Check ATS Score
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Upload
