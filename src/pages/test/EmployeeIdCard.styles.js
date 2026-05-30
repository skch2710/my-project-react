export const styles = {
  sectionTitle: {
    fontWeight: 700,
    color: "#1565c0",
  },
  subTitle: {
    fontWeight: 600,
    color: "text.secondary",
    mb: 2,
  },

  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  card: {
    width: { xs: "100%", sm: 220 },
    maxWidth: 220,
    height: { xs: "auto", sm: 348 },
    aspectRatio: "0.631 / 1",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    borderTop: "1px solid #e5e7eb",
  },

  topSection: {
    position: "relative",
    height: 80,
    overflow: "hidden",
    background: "linear-gradient(180deg,#0b5ed7 0%,#2f80ff 55%)",
  },

  circleOne: {
    position: "absolute",
    width: 350,
    height: 180,
    background: "rgba(255,255,255,0.12)",
    borderRadius: "50%",
    top: -90,
    right: -90,
  },

  circleTwo: {
    position: "absolute",
    width: 300,
    height: 150,
    background: "rgba(255,255,255,0.15)",
    borderRadius: "50%",
    bottom: -90,
    left: -70,
  },

  wave: {
    position: "absolute",
    bottom: -65,
    left: -20,
    width: "120%",
    height: 90,
    backgroundColor: "#fff",
    borderRadius: "50%",
    transform: "rotate(-3deg)",
  },

  companyContainer: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
    p: 1.4,
    color: "#fff",
  },

  logo: {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0b5ed7",
    fontWeight: 800,
    fontSize: 18,
    background: "#fff",
    boxShadow: "0 8px 18px rgba(11,94,215,0.12)",
    borderRadius: "50%",
  },

  companyName: {
    fontWeight: 800,
    fontSize: 14,
    lineHeight: 1,
  },

  profileSection: {
    position: "relative",
    mt: -4,
    zIndex: 10,
    textAlign: "center",
  },
  
  avatar: {
    width: 80,
    height: 80,
    margin: "0 auto",
    border: "2px solid #fff",
    mb: 1,
  },

  employeeName: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: 1,
  },

  designation: {
    textAlign: "center",
    color: "#1565c0",
    fontWeight: 600,
    fontSize: 12,
  },

  detailCard: {
    display: "block",
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: "6px",
    py: 0.2,
    px: 0,
    textAlign: "center",
  },

  detailLabel: {
    display: "block",
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    mb: 0,
  },

  detailValue: {
    display: "block",
    fontWeight: 700,
    fontSize: 12,
    mt: 0,
    lineHeight: 1.2,
    textAlign: "center",
  },

  footer: {
    background: "linear-gradient(135deg,#0057ff,#2f80ff)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: 10,
    py: 1,
    px: 1,
    mt: "auto",
    width: "100%",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
  },
  backFooter: {
    p: 2,
    mt: "auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    boxSizing: "border-box",
    height: "100%",
  },

  backNote: {
    fontSize: 10,
    color: "#29323e",
    fontWeight: 550,
    mb: 1.5,
    textAlign: "left",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal",
  },
};
