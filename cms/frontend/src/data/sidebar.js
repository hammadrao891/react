import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbReportSearch } from "react-icons/tb";
import { AiFillFileAdd } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";
import { MdBackup } from "react-icons/md";
export const menuAdmin = 
[
  {
    title: "Check Student Info",
    icon: <FaRegChartBar />,
    path: "/add-student",
  }
]
export const menuAD = [
  
  {
    title: "Student Information Management",
    icon: <CgProfile />,
    path: "/student-information-management",
  },
  
  {
    title: "Fee Collection And Modification",
    icon: <FaMoneyBillAlt />,
    path: "/fee-collection-and-modification",
  },{
    title: "Reports",
    icon: <TbReportSearch />,
    path: "/reports",
  },{
    title: "Generate Fee",
    icon: <AiFillFileAdd />,
    path: "/generate-fee",
  },
  {
    title: "Expenses",
    icon: <GrMoney />,
    path: "/expenses",
  },
  {
    title: "Backup File",
    icon: <MdBackup />,
    path: "/backup-file",
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

