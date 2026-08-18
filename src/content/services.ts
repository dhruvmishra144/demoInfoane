/**
 * Full content for the six service pages.
 *
 * Service pages are where a consulting site actually earns commercial search
 * traffic — the homepage ranks for your brand, these rank for what people buy.
 * So each one is written to stand on its own: a specific H1, a distinct meta
 * title and description, symptoms a buyer will recognise, concrete
 * deliverables, and its own FAQs.
 *
 * `summary` and `bullets` are also used by the homepage cards and the header
 * dropdown, so the wording stays consistent everywhere the service appears.
 */

export type ServiceSection = { title: string; body: string };

export type ServicePage = {
  slug: string;
  /** Nav/card label — short. */
  title: string;
  /** Page H1 — may be longer and more descriptive than the nav label. */
  heading: string;
  /** <title> tag. Leads with the keyword, ~60 characters. */
  metaTitle: string;
  /** ~150–160 characters. */
  metaDescription: string;
  /** Short label for the header dropdown. */
  navDescription: string;
  /** Card summary on the homepage and the services index. */
  summary: string;
  /** Card bullets on the homepage. */
  bullets: string[];
  /** Opening paragraphs on the service page. */
  intro: string[];
  /** "You probably need this if…" */
  signals: string[];
  /** The substance of the offering. */
  sections: ServiceSection[];
  /** Concrete artefacts the client receives. */
  deliverables: string[];
  /** Technologies used, shown as chips. */
  technologies: string[];
  faqs: { question: string; answer: string }[];
  /** Slugs of two related services, for internal linking. */
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    heading: "Custom software development services",
    metaTitle: "Custom Software Development Services",
    metaDescription:
      "Custom software development services for web, mobile and back-office systems. Discovery-led scoping, senior engineers, and a working demo every two weeks.",
    navDescription: "Web, mobile and back-office applications",
    summary:
      "Web, mobile and back-office applications built around how your business actually works, instead of forcing your process into off-the-shelf software.",
    bullets: [
      "Product discovery and technical scoping",
      "Web and cross-platform mobile apps",
      "API and integration layers",
    ],
    intro: [
      "Off-the-shelf software is cheaper right up to the point where your process has to bend to fit it. When the workaround spreadsheets start multiplying, or when the thing that makes you competitive is the thing no vendor sells, custom software stops being a luxury.",
      "We build web applications, mobile apps and the back-office systems behind them — starting with a discovery phase that establishes what is actually worth building before anyone writes production code.",
    ],
    signals: [
      "Your team maintains spreadsheets to work around the software you bought",
      "A process that differentiates you is being flattened to fit a vendor's workflow",
      "Licence costs scale with headcount and are now larger than a build would be",
      "Two systems that should talk to each other are reconciled by hand",
    ],
    sections: [
      {
        title: "Discovery before code",
        body: "We interview the people who will use the system, watch the current process, and write down what we found. You get a scope, an architecture with options and trade-offs, and a costed plan — a document that is useful even if you build it with someone else.",
      },
      {
        title: "Web and mobile applications",
        body: "React and Next.js on the web; React Native or Flutter where a single codebase serves both app stores. We build for the browsers and devices your users actually have, which for enterprise clients is rarely the latest.",
      },
      {
        title: "APIs and integration",
        body: "Most enterprise software is mostly integration. We design the API layer first, document it, and treat every third-party system as something that will eventually be slow or down — so your application degrades instead of failing.",
      },
      {
        title: "Handover you can maintain",
        body: "Your repository, your cloud account, your CI pipeline, from the first commit. Documentation and a walkthrough are part of delivery, not an upsell. If you want to take the system in-house afterwards, that is a success, not a lost account.",
      },
    ],
    deliverables: [
      "Written scope, architecture options and costed delivery plan",
      "Working software demonstrated at the end of every sprint",
      "Automated test suite and CI/CD pipeline",
      "API documentation and data model reference",
      "Runbook, monitoring and a recorded handover session",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      ".NET",
      "Python",
      "PostgreSQL",
      "React Native",
      "Flutter",
    ],
    faqs: [
      {
        question: "How long does a custom software project take?",
        answer:
          "A focused first release is typically [3–6] months from discovery to production; larger programmes run in parallel tracks. You see working software at the end of every two-week sprint, so the timeline is visible rather than promised.",
      },
      {
        question: "Can you take over an existing project?",
        answer:
          "Yes. We start with a short technical audit — code quality, test coverage, deployment process and the risks nobody has written down — and give you an honest read on whether to continue, refactor or restart before we quote the work.",
      },
      {
        question: "What happens if requirements change mid-project?",
        answer:
          "They will. Time-and-materials engagements absorb change within the sprint cadence; fixed-scope engagements handle it through a change process we agree up front. Either way you are not renegotiating a contract to reprioritise a backlog.",
      },
    ],
    related: ["application-modernization", "dedicated-development-teams"],
  },

  {
    slug: "cloud-migration-devops",
    title: "Cloud Migration & DevOps",
    heading: "Cloud migration and DevOps services",
    metaTitle: "Cloud Migration & DevOps Services",
    metaDescription:
      "Cloud migration services for AWS, Azure and Google Cloud, with DevOps, infrastructure as code and CI/CD. Migrate without downtime, then cut cloud spend.",
    navDescription: "AWS, Azure and Google Cloud migration",
    summary:
      "Move workloads to AWS, Azure or Google Cloud without downtime, then keep them cheap and observable with infrastructure as code and CI/CD.",
    bullets: [
      "Migration assessment and landing zones",
      "Kubernetes, Terraform and CI/CD pipelines",
      "Cloud cost and performance optimization",
    ],
    intro: [
      "Most disappointing cloud migrations were lift-and-shift projects: the same architecture, now billed by the hour. The bill goes up, nothing gets faster, and the team concludes the cloud was oversold.",
      "We assess what should move, what should be re-architected first, and what should stay where it is — then migrate in stages, each with a rollback path.",
    ],
    signals: [
      "Cloud spend is growing faster than usage and nobody can explain the invoice",
      "Deployments happen at night because they are risky",
      "Infrastructure is configured by hand and only one person knows how",
      "A hardware refresh or data-centre contract is forcing a decision",
    ],
    sections: [
      {
        title: "Migration assessment",
        body: "An inventory of workloads, dependencies and data gravity, scored on effort and business value. The output is a sequenced plan: what moves first, what gets re-architected, what is retired, and what the steady-state bill will look like.",
      },
      {
        title: "Landing zones and infrastructure as code",
        body: "Accounts, networking, identity and guardrails defined in Terraform before workloads arrive. Environments become reproducible, and permissions are least-privilege from day one rather than tightened after an audit.",
      },
      {
        title: "CI/CD and Kubernetes",
        body: "Pipelines that build, test and deploy on merge, with environments that match production. Kubernetes where the workload justifies it — and managed services where it does not, because a cluster nobody wants to operate is a liability.",
      },
      {
        title: "Cost and performance optimization",
        body: "Right-sizing, autoscaling, storage tiering and commitment planning, with a per-service cost dashboard so spend stays attributable. This is usually where the engagement pays for itself.",
      },
    ],
    deliverables: [
      "Workload inventory and sequenced migration plan",
      "Terraform-defined landing zone and environments",
      "CI/CD pipelines with automated rollback",
      "Observability stack: metrics, logs, traces, alerts",
      "Cost baseline, dashboard and optimization backlog",
    ],
    technologies: [
      "AWS",
      "Azure",
      "Google Cloud",
      "Kubernetes",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "Azure DevOps",
      "Prometheus",
      "Grafana",
    ],
    faqs: [
      {
        question: "Will we need downtime to migrate?",
        answer:
          "Usually no. Most workloads move behind a proxy or with database replication and a short cutover window measured in minutes. Where a longer window is unavoidable we tell you during assessment, not during the migration.",
      },
      {
        question: "Which cloud provider should we choose?",
        answer:
          "Whichever your team can operate and your existing agreements favour. We work across AWS, Azure and Google Cloud, and we will say when a multi-cloud setup adds cost and complexity without adding resilience — which is most of the time.",
      },
      {
        question: "Can you reduce our existing cloud bill without migrating?",
        answer:
          "Often, yes. A cost review of an existing estate typically surfaces idle resources, over-provisioned instances, untiered storage and unclaimed commitment discounts. It is a short, self-contained engagement.",
      },
    ],
    related: ["application-modernization", "custom-software-development"],
  },

  {
    slug: "application-modernization",
    title: "Legacy Application Modernization",
    heading: "Legacy application modernization services",
    metaTitle: "Legacy Application Modernization Services",
    metaDescription:
      "Modernize legacy applications incrementally — monolith decomposition, framework and database upgrades, phased cutover with rollback. No big-bang rewrites.",
    navDescription: "Refactor and re-platform legacy systems",
    summary:
      "Refactor or re-platform the systems your business depends on, incrementally, so you retire technical debt without a risky big-bang rewrite.",
    bullets: [
      "Monolith to microservices decomposition",
      "Database and framework upgrades",
      "Phased cutover with rollback plans",
    ],
    intro: [
      "The system is fifteen years old, undocumented, and runs the business. Every quarter it gets more expensive to change and harder to hire for. A rewrite has been proposed twice and shelved twice, because stopping feature work for eighteen months is not survivable.",
      "That instinct is right: big-bang rewrites fail at a famously high rate. We modernize in slices, each one shippable, each one reversible, with the old and new systems running side by side until the new one has earned the traffic.",
    ],
    signals: [
      "The framework or runtime is past end-of-life and security patches have stopped",
      "Onboarding a developer onto the codebase takes months",
      "Small changes require regression testing the whole application",
      "One person is the only one who understands a critical component",
    ],
    sections: [
      {
        title: "Audit and risk map",
        body: "We map the codebase, its dependencies, its data and its actual usage — which features are used, and by whom. Plenty of modernization budget gets spent rebuilding functionality nobody has opened in two years.",
      },
      {
        title: "Incremental decomposition",
        body: "Strangler-fig pattern: new capability is built outside the monolith and traffic is routed to it a slice at a time. The monolith shrinks as its responsibilities move out, and every step is independently valuable.",
      },
      {
        title: "Platform and database upgrades",
        body: "Runtime, framework and database version upgrades with a test harness built first, so you can tell the difference between a behaviour change and a bug. Data migrations are rehearsed against production-shaped data before they are run.",
      },
      {
        title: "Phased cutover",
        body: "Feature flags, dual-write where it is warranted, and a documented rollback for every step. Users move in cohorts and the previous system stays available until the new path is proven under real load.",
      },
    ],
    deliverables: [
      "Codebase audit with a prioritised risk register",
      "Target architecture and slice-by-slice migration sequence",
      "Regression test harness around existing behaviour",
      "Rehearsed data migration scripts with rollback",
      "Decommissioning plan for the retired system",
    ],
    technologies: [
      ".NET",
      "Java",
      "Node.js",
      "Python",
      "PostgreSQL",
      "SQL Server",
      "Oracle",
      "Kafka",
      "Docker",
      "Kubernetes",
    ],
    faqs: [
      {
        question: "Should we rewrite or refactor?",
        answer:
          "Refactor unless the platform itself is the constraint — an unsupported runtime, a language you cannot hire for, or a data model that blocks every roadmap item. Even then we replace it in slices rather than all at once. The audit gives you the evidence to make that call rather than an opinion.",
      },
      {
        question: "Can you work on a system with no documentation and no tests?",
        answer:
          "That is the normal starting point. We characterise existing behaviour with tests first, so there is a safety net before anything moves. Those tests are also the documentation you were missing.",
      },
      {
        question: "How do you avoid breaking things during modernization?",
        answer:
          "Small reversible steps, a test harness around current behaviour, traffic shifted gradually behind flags, and the old path kept warm until the new one is proven. Nothing goes out that cannot be rolled back within minutes.",
      },
    ],
    related: ["cloud-migration-devops", "custom-software-development"],
  },

  {
    slug: "data-engineering-analytics",
    title: "Data Engineering & Analytics",
    heading: "Data engineering and analytics services",
    metaTitle: "Data Engineering & Analytics Services",
    metaDescription:
      "Data engineering services: ELT pipelines, warehouse modelling, BI dashboards and governance. Consolidate scattered data into numbers your teams trust.",
    navDescription: "Pipelines, warehousing and BI",
    summary:
      "Consolidate scattered data into a warehouse your teams trust, with pipelines, governance and dashboards that answer real business questions.",
    bullets: [
      "ELT pipelines and warehouse modelling",
      "BI dashboards and self-serve reporting",
      "Data quality and governance",
    ],
    intro: [
      "Two departments bring different revenue numbers to the same meeting, and the meeting becomes about whose spreadsheet is right. The data exists — it is spread across a CRM, an ERP, a payment processor and a folder of exports, with no agreed definition of a customer.",
      "We build the pipelines, the model and the definitions that make one number the number, then put it in front of the people who need it without a ticket queue in between.",
    ],
    signals: [
      "Reports are assembled by hand and are stale by the time they circulate",
      "Two teams cannot reconcile the same metric",
      "Analysts spend most of their time cleaning data rather than analysing it",
      "Nobody can say where a number in the board pack came from",
    ],
    sections: [
      {
        title: "Pipelines and ingestion",
        body: "Incremental, idempotent, monitored ELT from your operational systems into the warehouse. Pipelines that fail loudly and can be re-run safely, rather than scripts on someone's laptop.",
      },
      {
        title: "Warehouse modelling",
        body: "A dimensional model with agreed definitions and lineage, built in dbt so every metric is version-controlled, tested and traceable back to source. Changing a definition becomes a reviewed pull request.",
      },
      {
        title: "Dashboards and self-serve",
        body: "A small number of dashboards that answer the questions leadership actually asks, plus a semantic layer so analysts can go further without re-deriving joins each time. Fewer, trusted dashboards beat a gallery of abandoned ones.",
      },
      {
        title: "Governance and quality",
        body: "Freshness and volume tests, documented ownership per dataset, access control by role, and PII handled deliberately — masked or tokenised, with retention rules that match your obligations.",
      },
    ],
    deliverables: [
      "Source-to-warehouse pipelines with monitoring and alerting",
      "Dimensional model with tests and documented lineage",
      "Metric definitions agreed and signed off by the business",
      "Dashboard set for leadership and operational teams",
      "Data catalogue, access model and quality test suite",
    ],
    technologies: [
      "Snowflake",
      "Databricks",
      "BigQuery",
      "PostgreSQL",
      "dbt",
      "Airflow",
      "Fivetran",
      "Power BI",
      "Looker",
      "Metabase",
    ],
    faqs: [
      {
        question: "Do we need a data warehouse, or is a database enough?",
        answer:
          "If reporting queries are slowing your production database, or you need to join data from several systems, you need a warehouse. Below that, a well-modelled read replica is often enough — and we will tell you when that is the answer.",
      },
      {
        question: "How long before we see the first dashboard?",
        answer:
          "We aim for one genuinely useful dashboard on real data within the first [4–6] weeks, covering one domain end to end rather than every source at once. It proves the pipeline and gives the business something to react to early.",
      },
      {
        question: "Can you work with our existing BI tool?",
        answer:
          "Yes. The warehouse and the model are the durable assets; the visualisation layer is replaceable. We build so that changing BI tool later does not mean rebuilding your metrics.",
      },
    ],
    related: ["ai-automation", "cloud-migration-devops"],
  },

  {
    slug: "ai-automation",
    title: "AI & Intelligent Automation",
    heading: "AI and intelligent automation services",
    metaTitle: "AI Consulting & Intelligent Automation Services",
    metaDescription:
      "AI consulting and automation services: LLM assistants, RAG over your own content, document processing and workflow automation — with evaluation built in.",
    navDescription: "LLM assistants, RAG and automation",
    summary:
      "Put AI where it pays for itself — document processing, support triage, forecasting and internal copilots — with evaluation built in from day one.",
    bullets: [
      "LLM assistants and RAG over your own content",
      "Workflow and back-office automation",
      "Model evaluation and human-in-the-loop review",
    ],
    intro: [
      "Most AI pilots stall in the same place: the demo was impressive, nobody could say whether the output was correct, and it never got trusted with real work.",
      "We start from the task, not the model. Pick a process with a measurable cost, define what a good answer looks like, build the evaluation harness alongside the feature, and keep a human in the loop wherever being wrong is expensive.",
    ],
    signals: [
      "Staff retype information from documents into systems all day",
      "Support agents answer the same questions from scattered internal docs",
      "An AI pilot impressed everyone and then quietly stopped being used",
      "You need to know how often the system is wrong before you can deploy it",
    ],
    sections: [
      {
        title: "Use-case selection",
        body: "We shortlist candidate processes on volume, cost of error and how easily quality can be measured, then start with the one that is high value and safely reversible. Some tasks turn out not to need a model at all, and we will say so.",
      },
      {
        title: "Assistants and RAG",
        body: "Retrieval over your own documents, with permissions respected at query time and answers that cite their sources so users can verify them. Retrieval quality, not the model, is what usually determines whether people trust it.",
      },
      {
        title: "Document and workflow automation",
        body: "Extraction from invoices, claims, contracts and forms, wired into the systems that consume them — with confidence thresholds that route uncertain cases to a person instead of guessing.",
      },
      {
        title: "Evaluation and guardrails",
        body: "A labelled evaluation set, regression runs on every prompt or model change, and monitored accuracy in production. You get a number for how often it is right, which is the difference between a demo and a deployment.",
      },
    ],
    deliverables: [
      "Use-case assessment with expected value and risk per candidate",
      "Working assistant or automation on your own data",
      "Evaluation harness, labelled test set and accuracy baseline",
      "Human-in-the-loop review workflow for low-confidence cases",
      "Cost-per-task model and production monitoring",
    ],
    technologies: [
      "Claude",
      "OpenAI",
      "LangChain",
      "Python",
      "pgvector",
      "Pinecone",
      "FastAPI",
      "TypeScript",
      "Databricks",
    ],
    faqs: [
      {
        question: "Will our data be used to train someone else's model?",
        answer:
          "Not under the enterprise API terms we deploy on, and we confirm the specific provider's data-handling terms in writing as part of design. Where the data cannot leave your environment at all, we design for a self-hosted or in-region model instead.",
      },
      {
        question: "How do you stop the system inventing answers?",
        answer:
          "Ground answers in retrieved sources and show the citation; refuse rather than guess when retrieval finds nothing relevant; set confidence thresholds that hand off to a human. Then measure how often it happens, because the honest answer is never zero.",
      },
      {
        question: "What does it cost to run?",
        answer:
          "We model cost per task before building, including retrieval and review time, so you can compare it against the process it replaces. Ongoing inference cost is usually a small fraction of the salary cost of the manual process.",
      },
    ],
    related: ["data-engineering-analytics", "custom-software-development"],
  },

  {
    slug: "dedicated-development-teams",
    title: "Dedicated Development Teams",
    heading: "Dedicated development teams and staff augmentation",
    metaTitle: "Dedicated Development Teams & Staff Augmentation",
    metaDescription:
      "Hire a dedicated development team: vetted engineers, QA and DevOps who join your existing team, work in your tools and your process, and scale as scope changes.",
    navDescription: "Vetted engineers who join your team",
    summary:
      "Vetted engineers, QA and DevOps specialists who join your existing team, work in your tools and your rituals, and scale up or down as scope changes.",
    bullets: [
      "Staff augmentation and managed pods",
      "Onboarding in [2] weeks or less",
      "Your process, your repo, your standards",
    ],
    intro: [
      "You know what to build and you have a roadmap the team cannot get through. Hiring takes months, and a fixed-scope vendor is the wrong shape for work that is still moving.",
      "A dedicated team is the middle path: engineers who work as part of your team, in your repository and your rituals, with the option to add or drop capacity as the roadmap changes.",
    ],
    signals: [
      "The roadmap is capacity-constrained, not clarity-constrained",
      "Hiring for a specialism you need for months, not permanently",
      "A deadline needs more hands than your team can add in time",
      "You want to keep product ownership in-house and only buy delivery",
    ],
    sections: [
      {
        title: "Staff augmentation",
        body: "Individual engineers embedded in your team, reporting into your leads and working your process. Best when you have strong technical leadership and need throughput in specific skills.",
      },
      {
        title: "Managed pods",
        body: "A self-sufficient unit — engineers, QA, and a lead — that owns a slice of the roadmap end to end. Best when you want an outcome delivered without adding management load to your own leads.",
      },
      {
        title: "How we staff",
        body: "We propose named candidates with their actual background, you interview them, and you decide. No unnamed resources, and no substituting someone else after you have signed.",
      },
      {
        title: "Continuity and knowledge transfer",
        body: "Documentation and pairing are part of the engagement, not a phase at the end. If someone rotates off, the context does not leave with them — and neither does your ability to run the system without us.",
      },
    ],
    deliverables: [
      "Named candidate profiles for you to interview",
      "Onboarding plan and a first-week delivery target",
      "Work tracked in your backlog, visible in your tools",
      "Sprint reporting against your own definition of done",
      "Documentation and pairing for knowledge transfer",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      ".NET",
      "Java",
      "Python",
      "Go",
      "AWS",
      "Azure",
      "Kubernetes",
    ],
    faqs: [
      {
        question: "How is this different from hiring a contractor?",
        answer:
          "Continuity and bench depth. If someone is unavailable we cover the role, and their context is already documented and shared. You also get access to specialists — DevOps, QA automation, data — for part of a role rather than having to hire a whole one.",
      },
      {
        question: "Which time zones do you work in?",
        answer:
          "We staff for a minimum overlap with your working day — [4] hours or more by default — because standups and code review need real-time conversation. Full time-zone alignment is available where the work demands it.",
      },
      {
        question: "What is the minimum engagement?",
        answer:
          "[Three] months, billed monthly per person, with [30] days' notice to change team size. Shorter than that and onboarding consumes most of the value.",
      },
    ],
    related: ["custom-software-development", "cloud-migration-devops"],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug);
}

export const serviceSlugs = servicePages.map((service) => service.slug);
