export const dataGridSx = (theme, height = 350, extra = {}) => {
  const borderColor = theme.palette.divider;
  const headerBg = theme.palette.action.hover;
  const focusColor = theme.colors?.focus || theme.palette.primary.main;

  return {
    height,
    padding: "4px",
    border: `1px solid ${borderColor}`,
    borderRadius: 1,
    backgroundColor: theme.palette.background.paper,

    "& .MuiDataGrid-columnHeader": {
      borderLeft: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
      backgroundColor: headerBg,
      fontSize: 12,
      fontWeight: 700,
    },

    "& .MuiDataGrid-columnHeader:first-of-type": {
      borderLeft: 0,
    },

    "& .MuiDataGrid-columnHeader:last-of-type": {
      borderRight: 0,
    },

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: headerBg,
      backgroundClip: "padding-box",
    },

    "& .MuiDataGrid-columnHeadersInner": {
      backgroundColor: headerBg,
    },

    "& .MuiDataGrid-scrollbarFiller": {
      backgroundColor: headerBg,
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: 700,
      lineHeight: 1.2,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${borderColor}`,
    },

    "& .MuiDataGrid-cell": {
      py: 0,
      fontSize: 12,
      lineHeight: "30px",
      borderLeft: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    "& .MuiDataGrid-cell:first-of-type": {
      borderLeft: 0,
    },

    "& .MuiDataGrid-cell:last-of-type": {
      borderRight: 0,
    },

    "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
      {
        outline: `2px solid ${focusColor}`,
        outlineOffset: -2,
      },

    "& .MuiDataGrid-checkboxInput": {
      padding: 0,
    },

    "& .MuiCheckbox-root": {
      padding: 0,
      width: 16,
      height: 16,
    },

    "& .MuiSvgIcon-root": {
      fontSize: 16,
    },

    ...extra,
  };
};

export const toolbarSx = {
  minHeight: 60,
  px: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
};

export const toolbarButtonBoxSx = {
  display: "flex",
  flex: "0 0 auto",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: 1,
};

export default {
  dataGridSx,
  toolbarSx,
  toolbarButtonBoxSx,
};
