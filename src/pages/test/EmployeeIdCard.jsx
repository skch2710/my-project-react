import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { pageStyles } from "./EmployeeMyInfo.styles";
import { styles } from "./EmployeeIdCard.styles";
import { cardDetails, employeeLeftDetails } from "./employeeData";

const EmployeeIdCard = () => {
  return (
    <>
      <Box>
        <Typography variant="h6" sx={styles.sectionTitle}>
          Employee ID Card
        </Typography>
        <Typography variant="body2" sx={styles.subTitle}>
          This is your official employee identification card.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* LEFT SECTION */}
          <Grid size={{ xs: 12, md: 7 }}>
          <Paper variant="outlined" sx={pageStyles.leftCard}>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                 justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Paper elevation={0} sx={styles.card}>
                {/* HEADER */}
                <Box sx={styles.topSection}>
                  <Box sx={styles.circleOne} />
                  <Box sx={styles.circleTwo} />
                  <Box sx={styles.wave} />
                  <Box sx={styles.companyContainer}>
                    <Box sx={styles.logo}>T</Box>
                    <Typography sx={styles.companyName}>
                      {employeeLeftDetails.companyName}
                    </Typography>
                  </Box>
                </Box>
                {/* PROFILE */}
                <Box sx={styles.profileSection}>
                  <Avatar
                    src="https://i.pravatar.cc/300"
                    sx={pageStyles.avatar}
                  />
                </Box>
                {/* BODY */}
                <Box>
                  <Typography variant="h6" sx={styles.employeeName}>
                    {employeeLeftDetails.employeeName}
                  </Typography>
                  <Typography variant="body2" sx={styles.designation}>
                    {employeeLeftDetails.designation}
                  </Typography>
                  {/* DETAILS */}
                  <Box>
                    {cardDetails.map((item, index) => (
                      <Box key={index} sx={styles.detailCard}>
                        <Box>
                          <Typography sx={styles.detailLabel}>
                            {item.label}
                          </Typography>
                          <Typography sx={styles.detailValue}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                {/* FOOTER - placed outside body so it spans full card width */}
                <Box sx={styles.footer}>www.onetechsolutions.com</Box>
              </Paper>

              <Paper elevation={0} sx={styles.card}>
                {/* BACK CARD */}
                <Typography sx={styles.detailValue}>
                  {"Card Back - Coming Soon!"}
                </Typography>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT SECTION */}
          <Grid size={{ xs: 12, md: 5 }}>
          <Paper variant="outlined" sx={pageStyles.rightCard}>
            <Typography variant="h6" sx={pageStyles.sectionTitle}>
              Employee Details Card - Coming Soon!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeIdCard;
