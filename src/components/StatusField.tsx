import { RichTextField } from "react-admin";
import { Box } from "@mui/material";

export const StatusField = (_props: { label: string }) => (
  <Box>
    <RichTextField source="status" />
  </Box>
);

StatusField.defaultProps = {
  label: "Status",
};