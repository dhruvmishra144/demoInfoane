-- 2026 redesign: header, footer and legal menus plus header/footer labels.
--
-- The new defaults in src/lib/page-sections.ts only apply to an empty
-- database; rows already published in D1 win. This patches those published
-- rows in place with json_set, touching only the listed fields — every other
-- setting (offices, stats, social links…) is left as the editors saved it.
--
-- Apply:
--   npx wrangler d1 execute DB --local  --file=drizzle/updates/2026-09-redesign-chrome.sql
--   npx wrangler d1 execute DB --remote --file=drizzle/updates/2026-09-redesign-chrome.sql
--
-- Cached pages do not see a raw SQL change until they are regenerated: after
-- the remote run, redeploy (or republish any menu in the admin panel, which
-- revalidates the cache). In local dev, restart `npm run dev`.

-- Header: Services · Industries · AI · About (About opens the company panel).
UPDATE content_revisions
SET data = json_set(data, '$.items', json('[
  {"label":"Services","href":"/services","description":"","parent":"","group":""},
  {"label":"Industries","href":"/industries","description":"","parent":"","group":""},
  {"label":"AI","href":"/ai","description":"","parent":"","group":""},
  {"label":"About","href":"/about","description":"","parent":"","group":""},
  {"label":"About Us","href":"/about","description":"How we work and who you will work with","parent":"About","group":"Company"},
  {"label":"Careers","href":"/careers","description":"Open roles and how we hire","parent":"About","group":"Company"},
  {"label":"Case Studies","href":"/case-studies","description":"Problem, approach and measured result","parent":"About","group":"Company"},
  {"label":"Technology","href":"/technology","description":"Our stack and how we choose it","parent":"About","group":"Capability"},
  {"label":"AI & Safety","href":"/ai","description":"How we put models into production safely","parent":"About","group":"Capability"},
  {"label":"Contact Us","href":"/contact","description":"Talk to an engineer, not a salesperson","parent":"About","group":"Capability"}
]'))
WHERE id = (SELECT published_revision_id FROM content_items WHERE collection = 'navMenu' AND slug = 'header');

-- Footer "Quick Links" column.
UPDATE content_revisions
SET data = json_set(data, '$.items', json('[
  {"label":"Home","href":"/","description":"","parent":"","group":""},
  {"label":"About Us","href":"/about","description":"","parent":"","group":""},
  {"label":"Careers","href":"/careers","description":"","parent":"","group":""},
  {"label":"Technology","href":"/technology","description":"","parent":"","group":""},
  {"label":"Contact Us","href":"/contact","description":"","parent":"","group":""}
]'))
WHERE id = (SELECT published_revision_id FROM content_items WHERE collection = 'navMenu' AND slug = 'footer-pages');

-- Footer legal bar.
UPDATE content_revisions
SET data = json_set(data, '$.items', json('[
  {"label":"Privacy","href":"/privacy-policy","description":"","parent":"","group":""},
  {"label":"Terms","href":"/terms","description":"","parent":"","group":""}
]'))
WHERE id = (SELECT published_revision_id FROM content_items WHERE collection = 'navMenu' AND slug = 'legal');

-- Header button label, footer headings, contact details and the three offices
-- (these also feed the Organization JSON-LD Google reads).
UPDATE content_revisions
SET data = json_set(
  data,
  '$.header.ctaLabel', 'Contact',
  '$.footer.blurb', 'Engineering partner for companies who''ve outgrown their own roadmap.',
  '$.footer.pagesHeading', 'Quick Links',
  '$.footer.servicesHeading', 'Services',
  '$.footer.officesHeading', 'Contact Info',
  '$.footer.copyrightSuffix', 'All Rights Reserved.',
  '$.contact.email', 'info@infoane.com',
  '$.contact.phone', '+1-214-929-2500',
  '$.contact.phoneDisplay', '+1 214 929 2500',
  -- Replaced whole, so the order here is the order of the footer icons.
  '$.social', json('{
    "x":"https://x.com/infoanetech",
    "facebook":"https://www.facebook.com/infoanetech/",
    "linkedin":"https://www.linkedin.com/company/infoane-technologies-pvt--ltd/",
    "instagram":"https://www.instagram.com/infoanetech/",
    "telegram":"https://t.me/infoane"
  }'),
  '$.offices', json('[
    {"label":"USA","street":"11899 Presley Pl","city":"Frisco","region":"TX","postalCode":"75035","country":"US","phone":"+1-214-929-2500","phoneDisplay":"+1 214 929 2500","isHeadquarters":true},
    {"label":"INDIA","street":"1403 B, 14th Floor, Manjeera Trinity, JNTU Hi-Tech City Road, KPHB","city":"Hyderabad","region":"Telangana","postalCode":"500 072","country":"IN","phone":"+91-903-017-5190","phoneDisplay":"+91-903 017 5190","isHeadquarters":false},
    {"label":"INDIA","street":"14/3, Jaya Complex, Kovilpatti New town, Suba Nagar","city":"Kovilpatti","region":"Tamil Nadu","postalCode":"628502","country":"IN","phone":"+91-912-357-0321","phoneDisplay":"+91-912 357 0321","isHeadquarters":false}
  ]')
)
WHERE id = (SELECT published_revision_id FROM content_items WHERE collection = 'settings' AND slug = 'site');
