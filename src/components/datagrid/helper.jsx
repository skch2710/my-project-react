import { CheckCircle, Edit, Settings, Visibility } from "@mui/icons-material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";

const handleAction = (type, row) => {
  console.log(`${type}:`, row);
};

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
      label="View"
      onClick={() => handleAction("View", params.row)}
    />,
    <GridActionsCellItem
      icon={
        <Tooltip title="Edit Details">
          <Edit fontSize="small" />
        </Tooltip>
      }
      label="Edit"
      onClick={() => handleAction("Edit", params.row)}
    />,
    <GridActionsCellItem
      icon={
        params.row.hasCheckmark ? (
          <CheckCircle color="success" fontSize="small" />
        ) : (
          <Settings fontSize="small" />
        )
      }
      label="Settings"
      onClick={() => handleAction("Settings", params.row)}
    />,
    <GridActionsCellItem
      icon={<AddIcon fontSize="small" />}
      label="Add"
      onClick={() => handleAction("Add", params.row)}
    />,
  ],
};

    const US_CURRENCY_FORMAT = '"$"#,##0.00_);$(#,##0.00)';
    const NUMERIC_FORMAT = "###0";

export const formatValue = (value, format) => {
  if (value == null || value === "") return "";
  const num = Number(value);
  if (isNaN(num)) return value;

  // Detect if currency symbol is included in format
  const currencySymbolMatch = format.match(/[^#0.,]/);
  const currencySymbol = currencySymbolMatch ? currencySymbolMatch[0] + " " : "";

  // Detect decimal places
  const decimalMatch = format.split(".")[1];
  const fractionDigits = decimalMatch ? decimalMatch.length : 0;

  // Format number
  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(num);

  return `${currencySymbol}${formattedNumber}`;
};



export const revisedFields = [
  { field: "empId", headerName: "Employee ID", width: 120 },
  { field: "firstName", headerName: "First Name", width: 150 },
  { field: "lastName", headerName: "Last Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "dob", headerName: "Date of Birth", width: 150 },
  { field: "joiningDate", headerName: "Joining Date", width: 150 },
  { field: "phoneNumber", headerName: "Phone Number", width: 150, format: NUMERIC_FORMAT },
  { field: "salary", headerName: "Salary", width: 150, format: US_CURRENCY_FORMAT },
];

export const columns = [actionColumn, ...revisedFields];

// const revisedFields = [
//   { field: 'empId', headerName: 'Employee ID', flex: 1.5, sortable: true },
//   { field: 'firstName', headerName: 'First Name', flex: 2, sortable: true },
//   { field: 'lastName', headerName: 'Last Name', flex: 2, sortable: true },
//   { field: 'email', headerName: 'Email', flex: 3, sortable: true },
//   { field: 'address', headerName: 'Address', flex: 3, sortable: true },
//   { field: 'dob', headerName: 'Date of Birth', flex: 1.5, sortable: true },
//   { field: 'joiningDate', headerName: 'Joining Date', flex: 1.5, sortable: true },
//   { field: 'phoneNumber', headerName: 'Phone Number', flex: 2, sortable: true },
// ];

export const rowsempty = [];

export const rows = [
  {
    id: 1,
    empId: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Main St, New York, NY",
    dob: "1990-05-12",
    joiningDate: "2020-06-15",
    phoneNumber: "9876543210",
    salary: "₹ 55,000.00",
  },
  {
    id: 2,
    empId: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    address: "456 Park Ave, Chicago, IL",
    dob: "1988-11-23",
    joiningDate: "2019-03-01",
    phoneNumber: "9876501234",
  },
  {
    id: 3,
    empId: "EMP003",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    address: "789 Elm St, Dallas, TX",
    dob: "1992-02-10",
    joiningDate: "2021-01-10",
    phoneNumber: "9988776655",
  },
  {
    id: 4,
    empId: "EMP004",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.johnson@example.com",
    address: "321 Oak Rd, San Francisco, CA",
    dob: "1995-08-05",
    joiningDate: "2022-09-01",
    phoneNumber: "9123456789",
  },
  {
    id: 5,
    empId: "EMP005",
    firstName: "David",
    lastName: "Williams",
    email: "david.williams@example.com",
    address: "654 Pine St, Seattle, WA",
    dob: "1987-04-19",
    joiningDate: "2018-11-20",
    phoneNumber: "9898989898",
  },
  {
    id: 6,
    empId: "EMP006",
    firstName: "Sophia",
    lastName: "Taylor",
    email: "sophia.taylor@example.com",
    address: "987 Maple Ave, Denver, CO",
    dob: "1993-07-30",
    joiningDate: "2021-03-15",
    phoneNumber: "9001234567",
  },
  {
    id: 7,
    empId: "EMP007",
    firstName: "Liam",
    lastName: "Anderson",
    email: "liam.anderson@example.com",
    address: "111 Cedar Ln, Austin, TX",
    dob: "1991-09-21",
    joiningDate: "2020-01-10",
    phoneNumber: "9812345678",
  },
  {
    id: 8,
    empId: "EMP008",
    firstName: "Olivia",
    lastName: "Martinez",
    email: "olivia.martinez@example.com",
    address: "222 Birch St, Miami, FL",
    dob: "1994-12-10",
    joiningDate: "2022-04-25",
    phoneNumber: "9090909090",
  },
  {
    id: 9,
    empId: "EMP009",
    firstName: "Noah",
    lastName: "Garcia",
    email: "noah.garcia@example.com",
    address: "333 Walnut Dr, Phoenix, AZ",
    dob: "1996-03-05",
    joiningDate: "2023-06-01",
    phoneNumber: "9012345678",
  },
  {
    id: 10,
    empId: "EMP010",
    firstName: "Ava",
    lastName: "Hernandez",
    email: "ava.hernandez@example.com",
    address: "444 Poplar St, Atlanta, GA",
    dob: "1990-10-25",
    joiningDate: "2017-08-10",
    phoneNumber: "9887766554",
  },
  {
    id: 11,
    empId: "EMP011",
    firstName: "James",
    lastName: "Lopez",
    email: "james.lopez@example.com",
    address: "555 Ash St, Boston, MA",
    dob: "1985-06-18",
    joiningDate: "2016-09-12",
    phoneNumber: "9776655443",
  },
  {
    id: 12,
    empId: "EMP012",
    firstName: "Isabella",
    lastName: "Gonzalez",
    email: "isabella.gonzalez@example.com",
    address: "666 Spruce St, Nashville, TN",
    dob: "1997-01-14",
    joiningDate: "2023-02-20",
    phoneNumber: "9223344556",
  },
  {
    id: 13,
    empId: "EMP013",
    firstName: "Ethan",
    lastName: "Wilson",
    email: "ethan.wilson@example.com",
    address: "777 Chestnut Ave, Detroit, MI",
    dob: "1992-09-30",
    joiningDate: "2019-05-05",
    phoneNumber: "9332211445",
  },
  {
    id: 14,
    empId: "EMP014",
    firstName: "Mia",
    lastName: "Clark",
    email: "mia.clark@example.com",
    address: "888 Willow Dr, Houston, TX",
    dob: "1995-11-09",
    joiningDate: "2022-01-12",
    phoneNumber: "9556677889",
  },
  {
    id: 15,
    empId: "EMP015",
    firstName: "Alexander",
    lastName: "Lewis",
    email: "alexander.lewis@example.com",
    address: "999 Sycamore St, Orlando, FL",
    dob: "1989-08-16",
    joiningDate: "2018-07-25",
    phoneNumber: "9445566778",
  },
  {
    id: 16,
    empId: "EMP016",
    firstName: "Charlotte",
    lastName: "Walker",
    email: "charlotte.walker@example.com",
    address: "123 Cypress Rd, Columbus, OH",
    dob: "1993-05-21",
    joiningDate: "2021-11-03",
    phoneNumber: "9331122334",
  },
  {
    id: 17,
    empId: "EMP017",
    firstName: "Henry",
    lastName: "Hall",
    email: "henry.hall@example.com",
    address: "234 Beech Ln, San Diego, CA",
    dob: "1991-07-13",
    joiningDate: "2019-09-08",
    phoneNumber: "9112233445",
  },
  {
    id: 18,
    empId: "EMP018",
    firstName: "Amelia",
    lastName: "Allen",
    email: "amelia.allen@example.com",
    address: "345 Dogwood St, Portland, OR",
    dob: "1996-02-22",
    joiningDate: "2023-04-17",
    phoneNumber: "9443322110",
  },
  {
    id: 19,
    empId: "EMP019",
    firstName: "Lucas",
    lastName: "Young",
    email: "lucas.young@example.com",
    address: "456 Magnolia Ave, Raleigh, NC",
    dob: "1988-12-05",
    joiningDate: "2017-10-23",
    phoneNumber: "9667788990",
  },
  {
    id: 20,
    empId: "EMP020",
    firstName: "Harper",
    lastName: "King",
    email: "harper.king@example.com",
    address: "567 Palm St, Tampa, FL",
    dob: "1994-03-17",
    joiningDate: "2020-08-29",
    phoneNumber: "9554411223",
  },
  {
    id: 21,
    empId: "EMP021",
    firstName: "Daniel",
    lastName: "Wright",
    email: "daniel.wright@example.com",
    address: "678 Fir Rd, Charlotte, NC",
    dob: "1992-04-10",
    joiningDate: "2019-01-15",
    phoneNumber: "9221100998",
  },
  {
    id: 22,
    empId: "EMP022",
    firstName: "Evelyn",
    lastName: "Scott",
    email: "evelyn.scott@example.com",
    address: "789 Aspen St, Las Vegas, NV",
    dob: "1995-09-19",
    joiningDate: "2022-06-20",
    phoneNumber: "9885511223",
  },
  {
    id: 23,
    empId: "EMP023",
    firstName: "Sebastian",
    lastName: "Green",
    email: "sebastian.green@example.com",
    address: "890 Redwood Ln, Minneapolis, MN",
    dob: "1989-01-08",
    joiningDate: "2018-02-28",
    phoneNumber: "9553322114",
  },
  {
    id: 24,
    empId: "EMP024",
    firstName: "Ella",
    lastName: "Baker",
    email: "ella.baker@example.com",
    address: "901 Palm Blvd, Kansas City, MO",
    dob: "1993-06-26",
    joiningDate: "2021-12-01",
    phoneNumber: "9661100223",
  },
  {
    id: 25,
    empId: "EMP025",
    firstName: "Jack",
    lastName: "Adams",
    email: "jack.adams@example.com",
    address: "101 Maple Ct, Philadelphia, PA",
    dob: "1990-10-03",
    joiningDate: "2020-05-10",
    phoneNumber: "9778899001",
  },
];
