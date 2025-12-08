import { Edit, Visibility } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ADD, EDIT, VIEW, DELETE } from "../../utils/constants";
import * as Yup from "yup";

export const initialValues = {
  fullName: "",
  emailId: "",
  phoneNumber: "",
  dob: "",
  fee: "",
  joiningDate: "",
  address: "",
  proof: "",
  reason: "",
  roomType: "",
};

export const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full Name is required")
    .max(50, "Maximum 50 characters allowed"),
  emailId: Yup.string()
    .email("Invalid email format")
    .required("Email ID is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
  dob: Yup.string().required("Date of Birth is required"),
  fee: Yup.number().required("Fee is required").min(0, "Fee must be positive"),
  joiningDate: Yup.string().required("Joining Date is required"),
  address: Yup.string().required("Address is required"),
  proof: Yup.string().required("Proof is required"),
  reason: Yup.string().required("Reason is required"),
  // roomType: Yup.string().required("Room Type is required"),
});

export const GRID_TITLE = "Hosteller List";
export const ADD_POPUP_TITLE = "Add Hosteller";
export const EDIT_POPUP_TITLE = "Edit Hosteller";
const US_CURRENCY_FORMAT = '"$"#,##0.00_);$(#,##0.00)';

export const revisedFields = [
  { field: "hostellerId", headerName: "Hosteller ID", width: 120 },
  { field: "fullName", headerName: "Full Name", width: 150 },
  { field: "emailId", headerName: "Email ID", width: 200 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150 },
  { field: "dob", headerName: "Date of Birth", width: 150 },
  { field: "fee", headerName: "Fee", width: 120, format: US_CURRENCY_FORMAT },
  { field: "joiningDate", headerName: "Joining Date", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "proof", headerName: "Proof", width: 150 },
  { field: "reason", headerName: "Reason", width: 150 },
  { field: "vacatedDate", headerName: "Vacated Date", width: 150 },
  { field: "active", headerName: "Active", width: 150 },
];

export const buildColumns = (onAction) => {
  const actionColumn = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 160,
    getActions: (params) => [
      <GridActionsCellItem
        icon={
          <Tooltip title="View Details">
            <Visibility fontSize="small" />
          </Tooltip>
        }
        label={VIEW}
        onClick={() => onAction(VIEW, params.row)}
      />,
      <GridActionsCellItem
        icon={
          <Tooltip title="Edit Details">
            <Edit fontSize="small" />
          </Tooltip>
        }
        label={EDIT}
        onClick={() => onAction(EDIT, params.row)}
      />,
      <GridActionsCellItem
        icon={
          <Tooltip title="Delete">
            <DeleteForeverOutlinedIcon fontSize="small" />
          </Tooltip>
        }
        label={DELETE}
        onClick={() => onAction(DELETE, params.row)}
      />,
      <GridActionsCellItem
        icon={<AddIcon fontSize="small" />}
        label={ADD}
        onClick={() => onAction(ADD, params.row)}
      />,
    ],
  };

  return [actionColumn, ...revisedFields];
};

export const searchPayload = {
  pageNumber: 1,
  pageSize: 25,
  sortBy: "",
  sortOrder: "",
  columnFilters: [],
  exportExcel: false,
  exportCsv: false,
  exportPdf: false,
  exportZip: false,
  fullLoad: false,
  fullName: "",
  emailId: "",
};

export const roomTypeOptions = [
  { roomTypeId: 1, roomType: "Single" },
  { roomTypeId: 2, roomType: "Double" },
  { roomTypeId: 3, roomType: "Suite" },
];

