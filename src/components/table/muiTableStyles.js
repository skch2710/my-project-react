
export const styles = {
  container: {
    mt: 1,
    fontSize: "14px",
  },

  title: {
    mb: 1,
    fontWeight: 600,
    textAlign: "left",
    fontSize: "14px",
  },

  tableContainer: {
    borderRadius: 1,
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    border: "1px solid #e8eaed",
    overflow: "hidden",
  },

  headerCell: {
    fontWeight: 600,
    backgroundColor: "#f5f7fa",
    fontSize: "14px",
    height: 34,
    lineHeight: "34px",
    verticalAlign: "middle",
    padding: "6px 10px",
    borderBottom: "1px solid #e8eaed",
    borderRight: "1px solid #e8eaed",
    "&:last-child": {
      borderRight: "none",
    },
  },

  row: {
    transition: "background-color 0.15s ease",
    "&:hover": {
      backgroundColor: "#fbfcfd",
    },
  },

  leftCell: {
    textAlign: "left",
    fontSize: "14px",
    height: 34,
    lineHeight: "34px",
    verticalAlign: "middle",
    padding: "6px 10px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #e8eaed",
    borderRight: "1px solid #e8eaed",
    "&:last-child": {
      borderRight: "none",
    },
  },

  centerCell: {
    textAlign: "center",
    fontSize: "14px",
    height: 34,
    lineHeight: "34px",
    verticalAlign: "middle",
    padding: "6px 10px",
    borderBottom: "1px solid #e8eaed",
    borderRight: "1px solid #e8eaed",
    "&:last-child": {
      borderRight: "none",
    },
  },
};
