import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styles } from "./muiTableStyles";

const MuiTable = ({ title, headers = [], rows = [], onChange }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        {title}
      </Typography>

      <TableContainer component={Paper} sx={styles.tableContainer}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell
                  key={index}
                  align={index === 0 ? "left" : "center"}
                  sx={styles.headerCell}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover sx={styles.row}>
                {headers.map((header, colIndex) => {
                  const field = header.field;

                  return (
                    <TableCell
                      key={colIndex}
                      sx={colIndex === 0 ? styles.leftCell : styles.centerCell}
                    >
                      {header.type === "checkbox" ? (
                        <Checkbox
                          disabled
                          checked={row[field]}
                          onChange={(e) =>
                            onChange?.(rowIndex, field, e.target.checked)
                          }
                        />
                      ) : (
                        row[field]
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MuiTable;
