import { FaUser } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import * as Yup from "yup";
import Counter from "../counter/Counter";
import CounterRedux from "../counter/CounterRedux";
import Home from "../home/Home";
import Hostel from "../hostel/Hostel";
import Users from "../users/Users";
import EmployeeProfilePage from "../test/EmployeeProfilePage";

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
  User: Users,
  "Full Reports": EmployeeProfilePage,
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

export const form = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export const validationSchema = Yup.object({
  currentPassword: Yup.string().trim().required("Current password is required"),
  newPassword: Yup.string()
    .min(10, "New password must be at least 10 characters long")
    .required("New password is required")
    .test(
      "not-same-as-current",
      "New password must be different from current password",
      function (value) {
        const { currentPassword } = this.parent || {};
        if (!value) return true;
        return value !== currentPassword;
      },
    ),
  confirmNewPassword: Yup.string()
    .oneOf(
      [Yup.ref("newPassword"), null],
      "New password and confirm new password must match",
    )
    .required("Confirm new password is required"),
});
