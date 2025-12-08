import { IoIosPeople } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Home from "../home/Home";
import Hostel from "../hostel/Hostel";
import Counter from "../counter/Counter";
import CounterRedux from "../counter/CounterRedux";

// icon mapping
const iconMap = {
  "home.png": <IoHomeOutline />,
  "hostellers.png": <IoIosPeople />,
  "user.png": <FaUser />,
  "reports.png": <MdReport />,
  "full-reports.png": <MdReport />,
  "monthly.png": <MdReport />,
  "yearly.png": <MdReport />,
};

// component mapping
const componentMap = {
  Home: Home,
  Hostellers: Hostel,
  User: CounterRedux,
  "Full Reports": Counter,
  Monthly: Counter,
  Yearly: Counter,
};

// Convert API navigation to app navigation
export const getNav = (apiNav) => {
  return apiNav?.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || null,
    component: componentMap[item.resourceName] || null,
    collapsed: !!item.subNav,
    subNav: item.subNav?.map((sub) => ({
      ...sub,
      icon: iconMap[sub.icon] || null,
      component: componentMap[sub.resourceName] || null,
    })),
  }));
};

// Extract routes from navigation for React Router
export const getRoutesFromNavigation = (apiNav) => {
  const routes = [];

  apiNav?.forEach((item) => {
    // Main route
    if (item.resourcePath && componentMap[item.resourceName]) {
      routes.push({
        path: item.resourcePath,
        element: componentMap[item.resourceName],
      });
    }

    // Sub routes
    item.subNav?.forEach((sub) => {
      if (sub.resourcePath && componentMap[sub.resourceName]) {
        routes.push({
          path: sub.resourcePath,
          element: componentMap[sub.resourceName],
        });
      }
    });
  });

  return routes;
};
