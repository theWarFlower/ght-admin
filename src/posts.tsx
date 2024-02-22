import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField } from "react-admin";

export const PostList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.description}
                />      
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="id" />
                    <TextField source="name" />
                    <EmailField source="email" />
                    <TextField source="mobile" width={400}/>
                    <TextField source="description" />
                    <TextField source="remarks" />
                    <TextField source="location" />
                    <TextField source="support_type" />
                    <TextField source="status" />
                    <TextField source="created_at" />
                </Datagrid>
            )}
        </List>
            )
            };