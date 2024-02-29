import { TextField } from "react-admin";
import { Box } from "@mui/material";

export const DescriptionField = (_props: { label: string }) => (
  <Box
    className="column-content"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    maxWidth={{ xl: "450px", lg: "300px", md: "150px" }}
  >
    <TextField source="description" />
  </Box>
);

DescriptionField.defaultProps = {
  label: "Description",
};