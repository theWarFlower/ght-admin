import { useMediaQuery, Theme } from "@mui/material";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { 
    List, 
    SimpleList, 
    Datagrid, 
    TextField, 
    EmailField, 
    NumberField, 
    RichTextField,
    TextInput,
    SelectInput,
    RadioButtonGroupInput,
    useRecordContext
} from "react-admin";
import { DateField } from "./DateField";
import { DescriptionField } from "./DescriptionField";
import { CommentsField } from "./CommentsField";

const RequestTitle = () => {
    const record = useRecordContext();
    return <span>Request | {record ? `${record.name}` : ''}</span>
};

const requestFilters = [
    <RadioButtonGroupInput source="location" label="Location" alwaysOn choices={[
        { id: "Atlanta", name: "Atlanta" },
        { id: "Birmingham", name: "Birmingham" },
        { id: "30A", name: "30A" },
    ]}/>,
    <TextInput source="q" label="Search" alwaysOn />,
    <SelectInput source="status" disabled choices={[
        { id: '<b>NEW REQUEST</b>', name: 'NEW REQUEST' },
        { id: '<b>PROPOSAL REQUIRED</b>', name: 'PROPOSAL REQUIRED' },
        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'FOLLOW UP REQUIRED' },
        { id: '<b>SCHEDULED</b>', name: 'SCHEDULED' },
        { id: '<b>COMPLETED</b>', name: 'COMPLETED' },
    ]} />
];

export const NewRequests = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List filters={requestFilters} title={"GHT Service Dashboard"}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.description}
                />      
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false} sx={{
                    '& .RaDatagrid-rowOdd': {
                        backgroundColor: '#fee',
                    },
                }}>
                    <TextField source="name" />
                    <EmailField source="email" />
                    <NumberField source="mobile"/>
                    <DescriptionField />
                    <CommentsField label="Comments" />
                    <TextField source="location" />
                    <TextField source="support_type" />
                    <RichTextField source="status" />
                    <DateField source="created_at" />
                </Datagrid>
            )}
        </List>
            )
    };