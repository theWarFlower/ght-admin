import { TextField } from "react-admin";
import { Box } from "@mui/material";

export const CommentsField = (_props: { label: string }) => (
  <Box
    className="column-content"
    overflow="hidden"
    textOverflow="ellipsis"
    whiteSpace="nowrap"
    maxWidth={{ xl: "200px", lg: "150px", md: "100px" }}
  >
    <TextField source="remarks" />
  </Box>
);

CommentsField.defaultProps = {
  label: "Comments",
};