/**
 * Open roles, each with its own application page at /careers/[slug].
 *
 * Kept as a checked-in file for now: the CMS `openings` field on the careers
 * page only carries a title, location and summary, while a job page needs the
 * full description, responsibilities and skills. Moving these into D1 means
 * adding those fields to `pageSchema.openings` — see CONTENT-TODO.md.
 *
 * Every role listed here must be real and currently open: a stale listing
 * wastes applicants' time and reads as a company that isn't paying attention.
 */

export type Job = {
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  description: string[];
  responsibilities: string[];
  skills: string[];
};

export const jobs: Job[] = [
  {
    slug: "web-developer",
    title: "Web Developer",
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
];

export function findJob(slug: string): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
