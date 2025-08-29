Project Workflow
│
├── User Authentication
│   └── Sign Up / Login (JWT session)
│
├── Student Profile Input
│   ├── Branch
│   ├── Year
│   ├── Interests
│   └── Skills → Stored in MongoDB
│
├── Recommendations Engine (Node.js + Python ML)
│   ├── Input: Student Profile
│   ├── Processing: ML Model (career + skills prediction)
│   └── Output:
│       ├── Top Career Paths
│       ├── Required Skills
│       ├── Confidence Scores
│       └── Suggested Courses
│
├── Dashboard
│   ├── Career Recommendations (cards)
│   ├── Career Roadmap (timeline chart)
│   ├── Job/Skill Trends (bar/line charts, sample data)
│   └── Curated Learning Resources
│
├── Resume Section
│   ├── ATS Resume Score Checker
│   │   └── Parse resume → Match keywords → Score & Feedback
│   └── Resume Builder
│       └── Pre-filled template (based on profile & skills)
│
└── Student Utilities
    ├── Bookmarks (saved resources)
    └── Export (roadmap/resume PDF)
