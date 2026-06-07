import { Box, Grid, Paper, Typography } from "@mui/material";
import Button from "../../components/button/Button";
import { MdOutlineFileUpload, MdDownload } from "react-icons/md";
import { pageStyles } from "./EmployeeMyInfo.styles";
import { styles } from "./EmployeeIdCard.styles"; // your existing styles
import { cardDetails, employeeLeftDetails } from "./employeeData";
import { useState, useRef } from "react";
import PassphotoWithPhoto from "../../assets/PassphotoWithPhoto.jpeg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const EmployeeIdCard = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoUrl(URL.createObjectURL(file));
    }
  };

  const handleDownloadPDF = async () => {
    if (!frontCardRef.current || !backCardRef.current) return;

    try {
      // Capture front and back cards with good resolution
      const frontCanvas = await html2canvas(frontCardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const frontImgData = frontCanvas.toDataURL("image/png");

      const backCanvas = await html2canvas(backCardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });
      const backImgData = backCanvas.toDataURL("image/png");

      // Create PDF (A4 portrait, units in mm)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm

      // Layout: two small ID cards side-by-side at the top of the page (like the provided image)
      const margin = 15; // outer margin in mm
      const gap = 10; // gap between the two cards in mm

      // Calculate card widths: split the available width between two cards
      let cardWidth = (pageWidth - margin * 2 - gap) / 2; // mm per card

      // Preserve aspect ratio using canvas pixel dimensions
      const frontHeightMm =
        (frontCanvas.height / frontCanvas.width) * cardWidth;
      const backHeightMm = (backCanvas.height / backCanvas.width) * cardWidth;

      // Ensure both cards fit vertically on the page; if not, scale both down
      const maxCardHeight = pageHeight - margin * 2; // available vertical space
      const maxActualHeight = Math.max(frontHeightMm, backHeightMm);
      if (maxActualHeight > maxCardHeight) {
        const scaleFactor = maxCardHeight / maxActualHeight;
        cardWidth = cardWidth * scaleFactor;
      }

      // Recompute heights after any scaling
      const finalFrontHeight =
        (frontCanvas.height / frontCanvas.width) * cardWidth;
      const finalBackHeight =
        (backCanvas.height / backCanvas.width) * cardWidth;

      // Y position: place both cards near top with margin
      const yPos = margin;

      // X positions for left (front) and right (back) cards
      const xFront = margin;
      const xBack = margin + cardWidth + gap;

      // Add images to PDF
      pdf.addImage(
        frontImgData,
        "PNG",
        xFront,
        yPos,
        cardWidth,
        finalFrontHeight,
      );
      pdf.addImage(backImgData, "PNG", xBack, yPos, cardWidth, finalBackHeight);

      pdf.save("employee_id_card_both_sides.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

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
        {/* LEFT SECTION - Front & Back cards */}
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
              {/* FRONT CARD */}
              <Paper ref={frontCardRef} elevation={0} sx={styles.card}>
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

                <Box sx={styles.profileSection}>
                  <Box
                    component="img"
                    src={photoUrl || PassphotoWithPhoto}
                    alt="Employee"
                    sx={styles.avatar}
                  />
                </Box>

                <Box>
                  <Typography variant="h6" sx={styles.employeeName}>
                    {employeeLeftDetails.employeeName}
                  </Typography>
                  <Typography variant="body2" sx={styles.designation}>
                    {employeeLeftDetails.designation}
                  </Typography>
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

                <Box sx={styles.footer}>
                  {employeeLeftDetails.companyWebsite}
                </Box>
              </Paper>

              {/* BACK CARD */}
              <Paper ref={backCardRef} elevation={0} sx={styles.card}>
                <Box sx={styles.backFooter}>
                  <Typography sx={styles.backNote}>
                    Loss of this ID card should be reported immediately to the
                    Example Solutions Security Office.
                  </Typography>
                  <Typography sx={styles.backNote}>
                    If this ID card is found unclaimed, please return it to the
                    Security Office at Example Solutions.
                  </Typography>
                  <Typography sx={styles.backNote}>
                    The holder must display this ID card whenever entering the
                    office premises.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT SECTION - Upload + Download */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper variant="outlined" sx={pageStyles.rightCard}>
            <Typography variant="h6" sx={pageStyles.sectionTitle}>
              Upload Your ID Photo
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                mt: 2,
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  component="label"
                  variant="dotted"
                  startIcon={<MdOutlineFileUpload />}
                >
                  Upload Photo
                  <input
                    hidden
                    accept="image/jpeg,image/jpg,image/png"
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  JPG, PNG up to 2MB
                </Typography>
              </Box>

              {/* DOWNLOAD BUTTON */}
              <Button
                variant="contained"
                color="primary"
                startIcon={<MdDownload />}
                onClick={handleDownloadPDF}
                sx={{ mt: 3 }}
              >
                Download PDF (Front & Back)
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default EmployeeIdCard;
