import { useTheme } from "@mui/material/styles";

export const useGlobalStyles = () => {
  const theme = useTheme();

  return {
    // Generic reusable styles for pages and sections
    pageContainer: { p: { xs: 1.5, md: 2 } },
    pageTitle: { mb: 2 },
    subtitle: { mb: 2, fontSize: "18px" },
    sectionPaper: { p: 2, mb: 2, borderRadius: 2 },
    responsiveGrid: {
      display: "grid",
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
      },
      gap: 2,
    },
    actionsBox: {
      gridColumn: { xs: "1", sm: "1 / -1" },
      display: "flex",
      justifyContent: { xs: "flex-start", md: "flex-end" },
      mt: { xs: 1, md: 0 },
    },
    actionsStack: {
      width: { xs: "100%", md: "auto" },
      alignItems: { xs: "stretch", md: "center" },
    },
  };
};
