import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, Datagrid, TextField, EmailField, RichTextField } from "react-admin";

export const ListPosts = () => {
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
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="name" />
                    <EmailField source="email" />
                    <TextField source="mobile" width={400}/>
                    <TextField source="description" />
                    <TextField source="remarks" />
                    <TextField source="location" />
                    <TextField source="support_type" />
                    <RichTextField source="status" />
                    <TextField source="created_at" />
                </Datagrid>
            )}
        </List>
            )
            };