import { TextField } from "react-admin";
import { Box } from "@mui/material";

export const DescriptionField = (_props: { label: string }) => (
  <Box
    className="column-content"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    maxWidth={{ xl: "700px", lg: "450px", md: "300px" }}
  >
    <TextField source="description" />
  </Box>
);

DescriptionField.defaultProps = {
  label: "Subject",
};