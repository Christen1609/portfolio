// ============================================================
// Site content — all real information from Christen's resume.
// No fabricated claims. Repo/demo links only where a real URL exists.
//
// TODO for Christen: fill in `github` and `linkedin` below, and add
// `repo` URLs to any project whose code you want to link. Empty links
// are hidden automatically (no fake links are rendered).
// ============================================================

export const site = {
  name: "Christen I. Loyola",
  shortName: "Christen Loyola",
  role: "AI/ML & Software Engineer",
  location: "Adelaide, Australia",
  email: "christenloyola75@gmail.com",
  phone: "+61 487 282 142",
  resume: "/Christen_Loyola_Resume.pdf",
  // Add these to light up the matching buttons:
  github: "https://github.com/Christen1609",
  linkedin: "https://www.linkedin.com/in/christen-loyola-912858221/",
  year: "20 / 26",
} as const;

export const hero = {
  // Small greeting top-left (Valentin Cheval style): first name highlighted,
  // surname muted.
  greeting: "Hi there! this is",
  firstName: "Christen",
  lastName: "Loyola",
  // Giant poster lead-in (white), one line above the rolling cube.
  lead: "I BUILD AS AN",
  // The 3D cube rolls through these roles — one per cube face.
  roles: ["AI ENGINEER", "SOFTWARE ENGINEER"],
  positioning:
    "AI/ML and software engineer. I build and ship LLM, computer vision, and full-stack data systems.",
  subline:
    "Based in Adelaide, Australia. Eligible for the 485 post-study work visa and open to roles in Sydney and Melbourne.",
};

export const about = {
  heading: "About",
  paragraphs: [
    "I am an engineer who likes to take machine learning out of the notebook and put it in front of real users. I am most comfortable across the whole path, from a model or an LLM call to the API, the database, and the interface around it.",
    "At Ahfy I work on the backend with Supabase, designing authentication and role-based access control, writing Row Level Security policies for multi-role users with login-context-conditional visibility, and building React and TypeScript dashboards on top of a shared, standardized development database.",
    "My focus is AI/ML: LLM integration, computer vision, and data pipelines. I am completing a Masters in Artificial Intelligence and Machine Learning at the University of Adelaide, a Group of Eight university, after a Bachelor of Engineering in Computer Science.",
  ],
};

export type Focus = {
  no: string;
  title: string;
  body: string;
  items: string[];
};

export const focusAreas: Focus[] = [
  {
    no: "01",
    title: "AI / ML Engineering",
    body: "Computer vision and NLP models, plus LLM integration into real products. I care about grounding model output in real data and shipping it behind a clean API.",
    items: ["Computer Vision (CNN, VGG16)", "NLP", "LLM Integration", "RAG", "PyTorch / TensorFlow / Keras"],
  },
  {
    no: "02",
    title: "Full-Stack Development",
    body: "End-to-end web apps: React and Next.js on the front, Django or Node on the back, with the auth, data model, and access control that production actually needs.",
    items: ["React / Next.js", "TypeScript", "Node / Express", "Django + DRF", "Supabase + RLS"],
  },
  {
    no: "03",
    title: "Data & Systems",
    body: "Recommender systems, pattern mining, and data pipelines. Designing schemas, querying with SQL, and turning messy data into something dependable.",
    items: ["SQL", "MongoDB (MERN)", "Recommender Systems", "Pattern Mining", "Data Pipelines"],
  },
];

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  date: string;
  oneLine: string;
  problem: string;
  approach: string;
  stack: string[];
  decisions: string;
  // Real, defensible facts only — never invented numbers.
  metrics?: Metric[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: "oolee.com.au",
    date: "2025",
    oneLine:
      "A Next.js offers catalog with an LLM-powered natural-language search bar.",
    problem:
      "People browsing a large offers catalog get stuck with rigid keyword filters when they would rather just describe what they want in plain language.",
    approach:
      "A Next.js (App Router) frontend over a structured catalog, with a search bar that maps free-text queries to real catalog results through an LLM.",
    stack: ["Next.js", "TypeScript", "LLM API"],
    decisions:
      "I mapped natural language onto a constrained set of catalog filters instead of letting the model generate freely, which keeps every result grounded in real inventory and rules out hallucinated offers. Rendering the catalog statically keeps the page fast and cheap, with the LLM call scoped only to the search interaction so the rest of the site carries no runtime AI cost.",
    metrics: [
      { value: "Live", label: "In production" },
      { value: "NL", label: "Natural-language search" },
    ],
    demo: "https://oolee.com.au",
  },
  {
    title: "Regex Pattern Matching & Replacement Web App",
    date: "Aug 2025 – Sep 2025",
    oneLine:
      "A full-stack tool that turns plain-language descriptions into working regex and cleans tabular data.",
    problem:
      "Non-technical users often need to find and replace patterns across CSV or Excel data but cannot write regex by hand.",
    approach:
      "A React frontend for upload and preview talks to a Django REST backend that sends the plain-language description to OpenAI's LLM, returns generated regex, highlights matches, applies replacements to chosen columns, then lets users preview and download the transformed file.",
    stack: ["Django", "Django REST Framework", "React", "OpenAI API"],
    decisions:
      "I kept regex generation on the server behind a REST boundary so the API key and prompt logic never reach the client. Returning the generated regex and an explanation, not just the result, lets users verify the transformation before it touches their data, and scoping replacements to selected columns avoids corrupting unrelated fields.",
    metrics: [
      { value: "CSV / XLSX", label: "File formats accepted" },
      { value: "Plain text → regex", label: "via REST API" },
    ],
  },
  {
    title: "Pattern Mining & Recommender System",
    date: "Apr 2025 – May 2025",
    oneLine:
      "A grocery recommender combining item-based collaborative filtering with frequent pattern mining.",
    problem:
      "A grocery retail setting needs relevant top-N suggestions for each customer drawn from their previous purchasing behaviour.",
    approach:
      "An item-based collaborative filtering model produces the top five product recommendations per customer, complemented by frequent pattern mining over transaction baskets.",
    stack: ["Python", "pandas", "scikit-learn", "Collaborative Filtering"],
    decisions:
      "I chose item-based collaborative filtering over user-based because item-to-item similarities stay stable as the user base shifts and are cheaper to precompute for fast serving. Pairing it with frequent pattern mining covers the cold-start gap, since basket association rules still surface sensible co-purchases when a customer has little history.",
    metrics: [
      { value: "Top 5", label: "Recommendations per customer" },
      { value: "2 methods", label: "Collaborative filtering + pattern mining" },
    ],
  },
  {
    title: "Automated Text Classification System",
    date: "Apr 2025 – May 2025",
    oneLine:
      "A rule-based classifier that organises 22,000+ NLP developer questions into a searchable knowledge base.",
    problem:
      "Developer questions about NLP are scattered across Stack Overflow with no topical structure, which makes recurring issues hard to find.",
    approach:
      "Pulled over 22,000 NLP-related posts through the Stack Exchange API and categorised them with a rule-based system into a structured knowledge base of issues and solutions.",
    stack: ["Python", "Stack Exchange API", "pandas"],
    decisions:
      "A transparent rule-based approach fit a curated knowledge base where every categorisation has to be explainable and auditable, rather than a black box trained on noisy labels. It also avoided the cost and labelling effort of supervised training while staying easy to extend with new rules as fresh categories appear.",
    metrics: [
      { value: "22,000+", label: "NLP issues categorised" },
      { value: "Stack Exchange API", label: "Data source" },
    ],
  },
  {
    title: "Underwater Marine Animal Identification",
    date: "Oct 2023 – Oct 2024",
    oneLine:
      "A marine-species identifier built on transfer learning over roughly 7,000 images. Led as team lead.",
    problem:
      "Identifying the type and name of a marine creature from images by the features extracted across a large dataset.",
    approach:
      "Used VGG16 for feature extraction through transfer learning and a custom Convolutional Neural Network to classify species across about 7,000 images, working as the team lead.",
    stack: ["Python", "TensorFlow / Keras", "VGG16", "Custom CNN"],
    decisions:
      "Transfer learning from VGG16 was deliberate: roughly 7,000 images is too small to train a deep network from scratch without overfitting, so the pretrained convolutional features carry over generalisation from a far larger corpus. A custom CNN head on top adapted the model to marine-specific classes while keeping training tractable on limited hardware.",
    metrics: [
      { value: "~7,000", label: "Training images" },
      { value: "Team lead", label: "Role" },
      { value: "VGG16 + CNN", label: "Architecture" },
    ],
  },
  {
    title: "ConserVision",
    date: "Oct 2022 – Dec 2022",
    oneLine:
      "A CNN that classifies and counts wildlife in sanctuary camera imagery.",
    problem:
      "Wildlife sanctuaries need automated counting and classification of animals across large sets of camera images.",
    approach:
      "Built a Convolutional Neural Network to classify species and automate counting from wildlife images.",
    stack: ["Python", "TensorFlow / Keras", "CNN"],
    decisions:
      "As an earlier project, this is where I learned to treat data quality as the real bottleneck rather than model depth, since class imbalance and inconsistent lighting in camera images hurt accuracy more than the architecture did. That lesson shaped how I handle preprocessing and augmentation in my later vision work.",
    metrics: [
      { value: "CNN", label: "Classification + counting" },
      { value: "Wildlife imagery", label: "Domain" },
    ],
  },
];

export type Experience = {
  role: string;
  type: string; // employment type, for the timeline row
  company: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    type: "Full-time",
    company: "Ahfy",
    period: "Sep 2025 – Present",
    bullets: [
      "Built Supabase authentication with SQL-based role detection and access control so users with higher clearance can reach sensitive information.",
      "Designed and enforced Row Level Security policies for multi-role users, including conditional data visibility based on login context.",
      "Integrated Lovable with Supabase across schemas, auth flows, and environment variables to support development-to-production transitions.",
      "Created and maintained a shared development database, standardizing table structures, naming conventions, and security policies for the team.",
      "Built a statistics dashboard in React and TypeScript on the Lovable platform.",
    ],
  },
  {
    role: "Trainee Developer",
    type: "Internship",
    company: "Power Links Consortium",
    period: "Jun 2023 – Jul 2023",
    bullets: [
      "Developed 3D models using the iTwin platform.",
      "Built a configuration log reader to parse log files, with troubleshooting techniques for the configuration log.",
    ],
  },
  {
    role: "Software Intern",
    type: "Internship · Remote",
    company: "Campalin Innovations",
    period: "Jan 2023 – Feb 2023",
    bullets: ["Developed a wine quality ranking system."],
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};

export const education: Education[] = [
  {
    degree: "Masters in Artificial Intelligence and Machine Learning",
    school: "University of Adelaide (Go8)",
    period: "2024 – 2026",
    detail: "GPA 5.7 / 7",
  },
  {
    degree: "Bachelor of Engineering, Computer Science",
    school: "Anna University — Kumaraguru College of Technology",
    period: "2020 – 2024",
    detail: "GPA 8.08 / 10",
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

// Lead with the same top skills used on LinkedIn so the site matches the profile.
export const topSkills = [
  "Python",
  "Machine Learning",
  "Deep Learning",
  "LLM Integration",
  "SQL",
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI / ML",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Keras",
      "CNNs",
      "NLP",
      "LLM Integration",
      "RAG",
    ],
  },
  {
    title: "Full-Stack",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Node / Express",
      "MongoDB (MERN)",
      "Django",
      "Supabase + RLS",
    ],
  },
  {
    title: "Other",
    skills: ["SQL", "Solidity"],
  },
];

export const languages = ["English", "Tamil", "Hindi"];

// ============================================================
// "Companies I've worked with" band (full-bleed hero -> reveal)
// Real roles only. Logos live in /public/logos.
// ============================================================
export type Company = {
  name: string;
  /** Path under /public. Omit to render a styled text wordmark instead. */
  logo?: string;
  role: string;
  period: string;
};

export const companies: Company[] = [
  {
    name: "Ahfy",
    // TODO(Christen): drop the Ahfy logo at portfolio/public/logos/ahfy.png
    // (or .svg) then set:  logo: "/logos/ahfy.png"
    role: "Software Engineer",
    period: "2025 — Present",
  },
  {
    name: "Power Links Consortium",
    logo: "/logos/powerlinks.png",
    role: "Trainee Developer",
    period: "2023",
  },
  {
    name: "Campalin Innovations",
    logo: "/logos/campalin.png",
    role: "Software Intern",
    period: "2023",
  },
];

// Shorter, distinct intro for the worked-with band (the longer version
// still lives in `about.paragraphs`). No fabricated claims; no em dashes.
export const worked = {
  heading: "Companies I've worked with",
  introLabel: "(Intro)",
  intro: [
    "I build software/AI products that make it out of the wrapper and in front of real users. From the model and the LLM call to the API, the database, and the interface around it.",
    "Across internships, side projects, and my current role, Software Engineer at Ahfy, I have shipped AI with RAG pipelines, vector databases, NLP, full-stack data systems, and LLM integration, with the authentication, access control, and data models that production actually needs.",
    "I have recently completed a Master's in Artificial Intelligence and Machine Learning at the University of Adelaide. My goal is to build AI that is scalable.",
  ],
};
