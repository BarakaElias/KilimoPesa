import {
  Info,
  Award,
  Briefcase,
  Archive,
  UserCheck,
  Columns,
  Users,
  Clipboard,
  BarChart2,
} from "react-feather";

const adminSection = [
  {
    href: "/admin/dashboard",
    icon: Info,
    title: "Dashboard",
  },
  // {
  //   href: "/admin/award-cycles",
  //   icon: Award,
  //   title: "Award Cycle",
  // },
];

const manageSection = [
  {
    href: "/admin/survey",
    icon: Users,
    title: "Survey Results",
  },
  {
    href: "/admin/survey",
    icon: Archive,
    title: "Page 1",
  },

  {
    href: "/admin/survey",
    icon: Clipboard,
    title: "Page 2",
    children: [
      {
        href: "/admin/survey",
        title: "Sub page 1",
      },
      {
        href: "/admin/survey",
        title: "Sub page 2",
      },
      {
        href: "/admin/survey",
        title: "Sub page 3",
      },
    ],
  },
];

const settingsSection = [
  // {
  //   href: "/admin/ballot-positions",
  //   icon: Archive,
  //   title: "Ballot Positions",
  // },
  {
    href: "/admin/users",
    icon: Users,
    title: "Users",
    children: [
      {
        href: "/admin/users/all-users",
        title: "All Users",
      },
      {
        href: "/admin/users/create",
        title: "Create User",
      },
    ],
  },
];

const navItems = [
  {
    title: "Administration",
    pages: adminSection,
  },
  {
    title: "Manage",
    pages: manageSection,
  },
  {
    title: "Settings",
    pages: settingsSection,
  },
];

export default navItems;
