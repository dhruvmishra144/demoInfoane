/**
 * Open roles, each with its own application page at /careers/[slug] and a card
 * on /careers/openings.
 *
 * !! CONFIRM BEFORE LAUNCH !!
 * Only "Web Developer" is a role the business has described. The other eleven
 * entries are copied from the design mockup of the Current Openings page (title,
 * category, location, type) and their summary, description, responsibilities and
 * skills are GENERIC, plausible copy written to fill the layout. They must be
 * confirmed as real, currently open positions (and the copy replaced with the
 * hiring managers' actual requirements) or removed before the site goes live:
 * a stale listing wastes applicants' time. See CONTENT-TODO.md, section 4.
 *
 * Kept as a checked-in file for now: the CMS `openings` field on the careers
 * page only carries a title, location and summary, while a job page needs the
 * full description, responsibilities and skills. Moving these into D1 means
 * adding those fields to `pageSchema.openings` — see CONTENT-TODO.md.
 */

export type Job = {
  slug: string;
  title: string;
  /** Department / discipline tag shown on the card and used by the category filter. */
  category: string;
  /** One or more locations, separated by " / ". */
  location: string;
  type: string;
  summary: string;
  description: string[];
  responsibilities: string[];
  skills: string[];
};

export const jobs: Job[] = [
  {
    slug: "senior-associate-talent-acquisition",
    title: "Senior Associate - Talent Acquisition",
    category: "Talent Acquisition",
    location: "Trivandrum",
    type: "Full-Time",
    summary: "Source, screen and close engineering candidates for our delivery teams.",
    description: [
      "We are looking for a Talent Acquisition professional to help us hire engineers and delivery leads who fit how we work.",
      "You will own requisitions end to end, partnering with hiring managers to keep candidates informed at every stage.",
    ],
    responsibilities: [
      "Source and screen candidates for technical and non-technical roles.",
      "Partner with hiring managers to define role requirements and interview plans.",
      "Coordinate interviews and keep candidates updated at each step.",
      "Maintain accurate pipeline data and hiring reports.",
    ],
    skills: [
      "2+ years of recruitment experience, ideally in technology hiring.",
      "Good understanding of software roles and technology stacks.",
      "Clear written and verbal communication.",
      "Organised, with attention to detail.",
    ],
  },
  {
    slug: "technical-program-manager",
    title: "Technical Program Manager (TPM)",
    category: "Project Management",
    location: "Kochi",
    type: "Full-Time",
    summary: "Drive delivery across engineering programs, from planning to release.",
    description: [
      "We are looking for a Technical Program Manager to keep complex, multi-team engineering programs on track.",
      "You will connect clients, architects and delivery teams, and make dependencies and risks visible early.",
    ],
    responsibilities: [
      "Plan and track program milestones, dependencies and risks.",
      "Run delivery cadences and report status to clients and leadership.",
      "Work with engineering leads to unblock teams and manage scope.",
      "Improve delivery processes across projects.",
    ],
    skills: [
      "Experience delivering software programs across multiple teams.",
      "Working knowledge of agile delivery practices.",
      "Strong stakeholder communication.",
      "Comfortable discussing technical trade-offs with engineers.",
    ],
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    category: "Web Developer",
    location: "Trivandrum / Kochi",
    type: "Full-Time",
    summary:
      "Build and maintain web applications in PHP or Python, with structured training toward being project- and client-ready in six months.",
    description: [
      "We are looking for Web Developers with 2–4 years of experience in web application development who are passionate about software engineering, continuous learning, and AI-assisted development.",
      "The ideal candidate has strong web development fundamentals, excellent problem-solving skills, and the ability to quickly learn new technologies. You will receive structured training in modern stack implementations with the goal of being project and client-ready within six months.",
    ],
    responsibilities: [
      "Design, build, and maintain efficient web applications using PHP or Python.",
      "Develop responsive and intuitive web interfaces using HTML, CSS, and JavaScript.",
      "Design, develop, and integrate secure REST APIs.",
      "Write clean, reusable, maintainable, and well-structured code following OOP principles.",
      "Debug, troubleshoot, and optimize existing applications, including legacy systems.",
      "Collaborate with cross-functional teams to deliver high-quality software solutions.",
      "Leverage AI tools to improve development productivity while ensuring safety, security, and maintainability.",
      "Participate actively in code reviews and continuously improve technical and engineering standards.",
    ],
    skills: [
      "2–4 years of professional web development experience.",
      "Proficiency in either PHP or Python.",
      "Strong front-end fundamentals with HTML, CSS, and vanilla/modern JavaScript.",
      "Practical experience developing and consuming REST APIs.",
      "Solid understanding of Git version control systems.",
      "Analytical mind with excellent problem-solving ability and attention to detail.",
    ],
  },
  {
    slug: "technical-lead-java",
    title: "Technical Lead - Java",
    category: "Java",
    location: "Kochi / Trivandrum",
    type: "Full-Time",
    summary: "Lead a Java engineering team and own the technical quality of what it ships.",
    description: [
      "We are looking for a Java Technical Lead to guide a team building and modernizing enterprise applications.",
      "You will balance hands-on engineering with mentoring, design reviews and client communication.",
    ],
    responsibilities: [
      "Lead the design and development of Java-based services and applications.",
      "Review code and set engineering standards for the team.",
      "Mentor developers and support their growth.",
      "Work with clients and architects to turn requirements into a sound design.",
    ],
    skills: [
      "Strong Java experience, including Spring-based development.",
      "Experience designing and consuming REST APIs.",
      "Prior experience leading or mentoring a team.",
      "Good grasp of testing, CI and version control practices.",
    ],
  },
  {
    slug: "technical-lead-dotnet",
    title: "Technical Lead - .NET",
    category: "Dot Net",
    location: "Kochi / Trivandrum",
    type: "Full-Time",
    summary: "Lead a .NET team through new builds and legacy modernization.",
    description: [
      "We are looking for a .NET Technical Lead to guide a team building and modernizing business applications.",
      "You will combine hands-on development with design reviews, mentoring and client communication.",
    ],
    responsibilities: [
      "Lead the design and development of .NET applications and services.",
      "Review code and set engineering standards for the team.",
      "Mentor developers and support their growth.",
      "Plan and carry out migrations of legacy applications.",
    ],
    skills: [
      "Strong C# and .NET experience.",
      "Experience designing and consuming REST APIs.",
      "Prior experience leading or mentoring a team.",
      "Good grasp of testing, CI and version control practices.",
    ],
  },
  {
    slug: "technical-lead-python",
    title: "Technical Lead - Python",
    category: "Python",
    location: "Kochi / Trivandrum",
    type: "Full-Time",
    summary: "Lead a Python engineering team building reliable services and data-driven applications.",
    description: [
      "We are looking for a Python Technical Lead to guide a team building web services and automation.",
      "You will balance hands-on engineering with mentoring, design reviews and client communication.",
    ],
    responsibilities: [
      "Lead the design and development of Python services and applications.",
      "Review code and set engineering standards for the team.",
      "Mentor developers and support their growth.",
      "Work with clients and architects to turn requirements into a sound design.",
    ],
    skills: [
      "Strong Python experience with a web framework such as Django or Flask.",
      "Experience designing and consuming REST APIs.",
      "Prior experience leading or mentoring a team.",
      "Good grasp of testing, CI and version control practices.",
    ],
  },
  {
    slug: "account-manager-technology-and-solutions",
    title: "Account Manager - Technology and Solutions",
    category: "Technology and Solutions",
    location: "Bangalore",
    type: "Full-Time",
    summary: "Own client relationships and help clients find the right technology engagement.",
    description: [
      "We are looking for an Account Manager to grow and look after relationships with our technology clients.",
      "You will work closely with delivery teams to make sure what we propose is what we can deliver well.",
    ],
    responsibilities: [
      "Manage existing client relationships and identify new opportunities.",
      "Understand client needs and shape proposals with delivery teams.",
      "Coordinate contracts, renewals and regular account reviews.",
      "Report on pipeline and account health.",
    ],
    skills: [
      "Experience in account management or business development for technology services.",
      "Ability to discuss technical solutions with clients.",
      "Strong communication and negotiation skills.",
      "Organised and comfortable with long sales cycles.",
    ],
  },
  {
    slug: "senior-technical-lead-architect",
    title: "Senior Technical Lead / Architect",
    category: "Project Manager",
    location: "Trivandrum / Kochi",
    type: "Full-Time",
    summary: "Set the technical direction for client projects and guide teams delivering them.",
    description: [
      "We are looking for a Senior Technical Lead or Architect to define and oversee the architecture of client solutions.",
      "You will work with engineering teams and clients to make sound, well-documented technology decisions.",
    ],
    responsibilities: [
      "Define solution architecture and technology choices for projects.",
      "Guide teams through design reviews and technical risk.",
      "Communicate architecture decisions to clients and stakeholders.",
      "Mentor technical leads and developers.",
    ],
    skills: [
      "Substantial experience designing and delivering enterprise software.",
      "Broad knowledge of architecture patterns, cloud and integration.",
      "Experience leading technical teams.",
      "Clear written and verbal communication.",
    ],
  },
  {
    slug: "technical-recruitment-lead",
    title: "Technical Recruitment Lead",
    category: "Talent Acquisition",
    location: "Kochi / Trivandrum",
    type: "Full-Time",
    summary: "Lead technical hiring and build a strong pipeline of engineering talent.",
    description: [
      "We are looking for a Technical Recruitment Lead to run hiring for our engineering teams.",
      "You will set the recruiting approach, lead a small team of recruiters and keep the candidate experience strong.",
    ],
    responsibilities: [
      "Plan and lead hiring for technical roles.",
      "Guide and coach recruiters on sourcing and screening.",
      "Work with engineering leads to define roles and interview loops.",
      "Track hiring metrics and improve the process.",
    ],
    skills: [
      "Several years of technical recruitment experience.",
      "Experience leading or coaching recruiters.",
      "Good understanding of software roles and technology stacks.",
      "Strong stakeholder management.",
    ],
  },
  {
    slug: "principal-database-engineer",
    title: "Principal Database Engineer",
    category: "Database",
    location: "Trivandrum / Kochi",
    type: "Full-Time",
    summary: "Own database design, performance and reliability across client systems.",
    description: [
      "We are looking for a Principal Database Engineer to lead database design and optimisation across our projects.",
      "You will advise teams on data modelling and performance, and lead database migrations and modernization work.",
    ],
    responsibilities: [
      "Design and review data models and database architectures.",
      "Tune queries and diagnose database performance problems.",
      "Plan and carry out database migrations.",
      "Set standards for backup, recovery and security.",
    ],
    skills: [
      "Deep experience with relational databases such as SQL Server, PostgreSQL or MySQL.",
      "Strong SQL and performance tuning skills.",
      "Experience with migrations and data modernization.",
      "Ability to advise and mentor engineering teams.",
    ],
  },
  {
    slug: "qa-automation-lead",
    title: "QA Automation Lead",
    category: "Quality Assurance",
    location: "Kochi",
    type: "Full-Time",
    summary: "Lead test automation so delivery teams can ship with confidence.",
    description: [
      "We are looking for a QA Automation Lead to build and run test automation across client projects.",
      "You will set the testing approach, guide a team of QA engineers and work closely with developers.",
    ],
    responsibilities: [
      "Design and maintain automated test frameworks.",
      "Define test strategy and coverage for projects.",
      "Integrate automated tests into CI pipelines.",
      "Mentor QA engineers and review their work.",
    ],
    skills: [
      "Experience building test automation with tools such as Selenium, Playwright or Cypress.",
      "Solid understanding of API and UI testing.",
      "Experience with CI pipelines.",
      "Prior experience leading or mentoring testers.",
    ],
  },
  {
    slug: "senior-devops-engineer",
    title: "Senior DevOps Engineer",
    category: "Infrastructure",
    location: "Remote / Kochi",
    type: "Full-Time",
    summary: "Automate and run the infrastructure that keeps client platforms stable.",
    description: [
      "We are looking for a Senior DevOps Engineer to build and operate delivery pipelines and cloud infrastructure.",
      "You will automate the right things, keep production stable and improve the platform continuously.",
    ],
    responsibilities: [
      "Build and maintain CI/CD pipelines.",
      "Provision and manage cloud infrastructure as code.",
      "Monitor systems and respond to production issues.",
      "Improve security, reliability and cost of the platforms we run.",
    ],
    skills: [
      "Experience with a major cloud provider such as AWS or Azure.",
      "Infrastructure-as-code experience, for example Terraform.",
      "Experience with containers and CI/CD tooling.",
      "Good scripting skills and a habit of automating repetitive work.",
    ],
  },
];

export function findJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
