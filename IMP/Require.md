## Tech Stack used for Features

1. AI Based Mock Interview
  >> What it is?
     - A virtual interview simulator that asks role-specific questions and provides real-time feedback on student performance.
   
   
  >> How it works(WorkFlow)
     1. User log's in or sign's up first 
     2. enters all the details about him self including skills :
        - Name
        - Career Objective
        - skill's
        - and past expirence
     3. user Inters role (for which job user want to prepar for interview)
     4. Ai Dynamical creates questions based on roles, career objective and current skills 
     5. After Interview AI evaluates the interview 
        > content check - keywords, technical accuracy.
        > Communication - Fluency, clarity, confidence.
        > Sentiment - Tone analysis.
     6. Feeding back and Scoring
        - Ai provides instant feedback ( Strenths + Weaknessess)
        - Score displayed
        - Stored in dashboard for process traking.
     7. Students can practice unlimited times until ready.
  >> Why it is useful?
     1. Students get 24/7 interview practice 
     2. Placement cells don't need one trainer for 100 students 
     3. Each student gets personalized, data-backed feedback
   
  >> Tech Stack for AI Interview :
     - React 
     - Google speach api/ OpenAI whisper
     - GPT Modles 
     - GTTs/eleven labs/ Azure cognitive speach
     - NLP(spaCy, BERT) for keyword match + sentiment analysis
     - Mongodb 


2. AI Resume Builder :
  >> What it is?
   - An AI-powered tool that helps students create professional, ATS-friendly resumes quickly, with personalized suggestions.

  >> How it works
    1. Student Input

      - Fills in details (education, skills, projects, internships).

      - Or uploads an existing resume for improvement.

  >> AI Resume Generation

    - AI (GPT) refines bullet points, highlights achievements, and rewrites descriptions to match industry standards.

    - Ensures resume is ATS-friendly (optimized for job portals).

  >> Template Formatting

    - Resume is auto-formatted into a clean, professional template.

    - Multiple templates available (student-friendly, corporate, modern).

  >> Output

    - Student can download PDF or create an online portfolio link.

    - Resume is saved for continuous updates.
  
  >> Why it is useful

       - Saves students from bad formatting & weak descriptions.

       - Creates resumes that pass ATS filters (used by recruiters).

       - Ensures consistency and professionalism across the batch.
  

  >> Tech Stack used for Ai Resume Builder
      - React + Tailwind CSS
      - GPT Models for AI Resume suggestion or ollama offline models
      - jsPDF of PDF-lib to convert html to pdf
      - MongoDB
  

  >>  Challenges to Solve

      - Ensuring ATS compliance (avoid graphics-heavy resumes).

      - Handling multiple formats (resume uploaded as PDF, DOCX, etc.).

      - Balancing AI text with student authenticity (avoid generic resumes).
  
3. Career Guidance & Roadmap Generator
  >> What it is?
    - An AI-powered career coach that helps students identify the right career path and provides a personalized step-by-step learning roadmap to reach it.
  
  
  >> How it works?
      1. we have details of user provided by user while creating user profile
   
      2. Skill Gap Analysis
         - AI Will analys user profile and skills and career objectives of user 
         - Compairs current skills with required skills for user career role
  
      3. Personalized roadmap creation 
         - give's suggestion of required skills and  recommends resoureses to compelte the skills and also provides the roadmap


  >> Why it is useful

   - Students often don’t know which skills to learn for their dream job.

   - Placement cells can monitor progress and ensure students are on the right track.

   - Makes training personalized instead of one-size-fits-all.


  >> Tech Stack used for Career Guidance and Roadmap Generator
   - 