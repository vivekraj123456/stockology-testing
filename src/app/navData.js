export const navData = [
  {
    id: 1,
    label: "Home",
    href: "/",
    type: "link",
  },
  {
    id: 2,
    label: "About Us",
    href: "/About",
    type: "link",
  },
  {
    id: 3,
    label: "App",
    href: "/App",
    type: "link",
  },
  {
    id: "services",
    label: "Services",
    href: "/Service",
    type: "dropdown",
    subItems: [
      {
        id: "services-home",
        label: "All Services",
        href: "/Service",
      },
      {
        id: "services-calculator",
        label: "Calculator",
        href: "/Calculator",
      },
    ],
  },
  {
    id: 5,
    label: "Fund Transfer",
    href: "/Fund-Transfer",
    type: "link",
  },
  {
    id: 6,
    label: "Contact Us",
    href: "/Contact",
    type: "link",
  },
  {
    id: "7",
    label: "Login",
    href: "#",
    type: "dropdown",
    subItems: [
      {
        id: "1",
        label: "Back-Office",
        href: "/Back-Office",
      },
      {
        id: "2",
        label: "Web-Terminal",
        href: "/Web-Terminal",
      },
    ],
  },
];
