const serviceLinks = [
  { name: "Mobile & online trading platform", path: "/App" },
  { name: "Calculator", path: "/Calculator" },
];

const quickLinks = [
  { name: "Fund Transfer", path: "/Fund-Transfer" },
  { name: "Privacy Policy", path: "/Privacy-Policy" },
  { name: "Terms & Conditions", path: "/Terms-&-Conditions" },
  { name: "Downloads Center", path: "/downloads" },
  { name: "SEBI Account Opening", path: "/downloads/sebi-account-opening" },
  { name: "RMS Policy", path: "/downloads/rms-policy" },
  { name: "Investor Charter", path: "/downloads/investor-charter" },
  { name: "Investor Grievance Policy", path: "/downloads/investor-grievance" },
];

const resourceLinks = [
  { name: "Downloads Center", path: "/downloads" },
  { name: "SEBI Account Opening", path: "/downloads/sebi-account-opening" },
  { name: "RMS Policy", path: "/downloads/rms-policy" },
  { name: "Investor Charter", path: "/downloads/investor-charter" },
  { name: "Investor Grievance Policy", path: "/downloads/investor-grievance" },
];

const primaryQuickLinks = [
  { name: "Fund Transfer", path: "/Fund-Transfer" },
  { name: "Privacy Policy", path: "/Privacy-Policy" },
  { name: "Terms & Conditions", path: "/Terms-&-Conditions" },
];

const companyLinks = [];

export const footerData = {
  brand: {
    name: "Stockology",
    tagline: "The Joy of Earning",
  },
  columns: [
    { title: "Services", links: serviceLinks },
    { title: "Resources", links: resourceLinks },
    { title: "Quick Links", links: primaryQuickLinks },
    { title: "Company", links: companyLinks },
  ],
  contact: {
    address:
      "111, Krishna Business Centre, PU-4, Vijay Nagar, Indore 452010, Madhya Pradesh, India.",
    phone: "07314258021",
    phoneHref: "07314258021",
    email: "info@stockologysecurities.com",
    workingHours: {
      weekday: "Monday - Friday : 08:30 am - 7:00 pm",
      saturday: "Saturday : 10:00 am - 4:00 pm",
    },
  },
  appLinks: [
    {
      store: "google",
      name: "Google Play",
      path: "https://play.google.com/store/apps/details?id=com.saral_info.moneymakerapi.stockology&hl=en-US",
    },
  ],
  socialLinks: [
    { icon: "facebook", label: "Facebook", path: "#" },
    { icon: "twitter", label: "X", path: "#" },
    { icon: "linkedin", label: "LinkedIn", path: "#" },
    { icon: "instagram", label: "Instagram", path: "#" },
    { icon: "youtube", label: "YouTube", path: "#" },
  ],

  // Legacy keys kept for compatibility with older footer variants.
  services: serviceLinks,
  company: companyLinks,
  quickLinks,
};
