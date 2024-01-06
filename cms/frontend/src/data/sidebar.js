import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";



export const menuAdmin = 
[
  {
    title: "Check Student Info",
    icon: <FaTh />,
    path: "/add-student",
  }
]
export const menuAD = [
  // {
  //   title: "Add Student",
  //   icon: <FaTh />,
  //   path: "/add-student",
  // },
  {
    title: "Student Information Management",
    icon: <FaTh />,
    path: "/student-information-management",
  },
  
  
];

export const menuEmployee = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Requisition",
    icon: <BiImageAdd />,
    path: "/add-requisition", 
  }
  
 
];
export const menuStoreIncharge = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Tender",
    icon: <BiImageAdd />,
    path: "/add-tender",
  },
  {
    title: "Add Vendor",
    icon: <BiImageAdd />,
    path: "/add-vendor",
  },
  
  {
    title: "Requisitions",
    icon: <BiImageAdd />,
    path: "/manage-requisition",
  },
  {
    title: "Add Category",
    icon: <BiImageAdd />,
    path: "/add-category",
  },
  {
    title: "Add Inventory",
    icon: <BiImageAdd />,
    path: "/add-inventory",
  },
 
];

