import { 
    List, 
    SimpleList, 
    Datagrid, 
    Show, 
    Create, 
    SimpleShowLayout,
    TextField,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    CheckboxGroupInput,
    RadioButtonGroupInput,
    useRecordContext,
    EmailField,
    BooleanField
} from "react-admin";

import { useMediaQuery, Theme } from "@mui/material";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DateField } from "./DateField";
import { DescriptionField } from "./DescriptionField";
import { CommentsField } from "./CommentsField";
import { StatusField } from "./StatusField";

const RequestTitle = () => {
    const record = useRecordContext();
    return <span>Request | {record ? `${record.name}` : ''}</span>
};

export const requestFilters = [
    <RadioButtonGroupInput source="status" label="Status" alwaysOn choices={[
        { id: '<b>NEW REQUEST</b>', name: 'New' },
        { id: '<b>PROPOSAL REQUIRED</b>', name: 'Needs Proposal' },
        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'Follow-up' },
        { id: '<b>SCHEDULED</b>', name: 'Scheduled' },
        { id: '<b>COMPLETED</b>', name: 'Complete' },
    ]} />,
    <CheckboxGroupInput source="location" label="Location" alwaysOn choices={[
        { id: "Atlanta", name: "Atlanta" },
        { id: "Birmingham", name: "Birmingham" },
        { id: "30A", name: "30A" },
    ]}/>,
];

export const ListRequests = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List 
            sort={{ field: "created_at", order: "DESC" }}
            perPage={25}
            filters={requestFilters}
            title={"GHT Service Dashboard"}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.description}
                />      
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false} sx={{
                    '& .RaDatagrid-rowOdd': {
                        backgroundColor: '#eef',
                    },
                    '& .RaDatagrid-row': {
                        whiteSpace: 'nowrap',
                    },
                    '& .column-mobile': {
                        maxWidth: 100,
                        fontWeight: 'bold',
                    },
                    '& .column-email': {
                        maxWidth: 150,
                        overflow: 'clip'
                    },
                    '& .column-name': {
                        maxWidth: 150,
                        overflow: 'hidden',
                        fontWeight: 'bold'
                    },
                    '& .column-support_type': {
                        maxWidth: 200,
                        overflow: 'hidden'
                    },
                    '& .column-status': {
                        overflow: 'clip',
                        whiteSpace: 'nowrap',
                        maxWidth: 100
                    }
                }}>
                    <TextField source="name" label="Name" />
                    <EmailField source="email" />
                    <TextField source="mobile" label="Phone" />
                    <DescriptionField />
                    <TextField source="location" />
                    <TextField source="support_type" />
                    <StatusField />
                    <DateField source="created_at" label="Date" textAlign="right" />
                </Datagrid>
            )}
        </List>
            )
    };

export const ShowRequests = () => (
    <Show title={<RequestTitle />} aside={<RequestAside />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="mobile" label="Phone" />
            <TextField source="description" />
            <TextField source="remarks" label="Comments"/>
            
        </SimpleShowLayout>
    </Show>
);

const RequestAside = () => {
    const record = useRecordContext();
    if (!record) return <Box minWidth={200} flexShrink={0} />;
    return (
        <SimpleShowLayout sx={{ minWidth: 200, flexShrink: 0 }}>
        <StatusField />
        <TextField source="support_type" />
        <DateField source="created_at" showTime />
        <TextField source="location" />
      </SimpleShowLayout>
    );
};

export const EditRequests = () => (
    <Edit title={<RequestTitle />} aside={<RequestAside />}>
        <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextInput source="name" label="Name" />
                    <TextInput source="email" label="Email" />
                    <TextInput source="mobile" label="Phone" />
                    <SelectInput source="location" choices={[
                        { id: "Atlanta", name: "Atlanta" },
                        { id: "Birmingham", name: "Birmingham" },
                        { id: "30A", name: "30A" },
                    ]}/>
                    <SelectInput source="support_type" choices={[
                        { id: "A/V Automation", name: "A/V Automation" },
                        { id: "Lighting Control", name: "Lighting Control" },
                        { id: "Security", name: "Security" },
                        { id: "Network/Wi-Fi", name: "Network/Wi-Fi" },
                        { id: "Electrical", name: "Electrical" },
                        { id: "Other", name: "Other" },
                    ]}/>
                    <SelectInput source="status" choices={[
                        { id: '<b>NEW REQUEST</b>', name: 'NEW REQUEST' },
                        { id: '<b>PROPOSAL REQUIRED</b>', name: 'PROPOSAL REQUIRED' },
                        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'FOLLOW UP REQUIRED' },
                        { id: '<b>SCHEDULED</b>', name: 'SCHEDULED' },
                        { id: '<b>COMPLETED</b>', name: 'COMPLETED' },
                    ]} />
                </Grid>
                <Grid item xs={6}>
                <Box sx={{ flexGrow: 1 }}>
                    <TextInput source="description" InputProps={{ disabled: true }} multiline fullWidth rows={5} />
                    <TextInput source="remarks" multiline fullWidth rows={5} />
                </Box>
                </Grid>
            </Grid>
        </Box>
        </SimpleForm>
    </Edit>
);

export const CreateRequests = () => (
    <Create>
        <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextInput source="name" label="Name" />
                    <TextInput source="email" label="Email" />
                    <TextInput source="mobile" label="Phone" />
                    <SelectInput source="location" choices={[
                        { id: "Atlanta", name: "Atlanta" },
                        { id: "Birmingham", name: "Birmingham" },
                        { id: "30A", name: "30A" },
                    ]}/>
                    <SelectInput source="support_type" choices={[
                        { id: "A/V Automation", name: "A/V Automation" },
                        { id: "Lighting Control", name: "Lighting Control" },
                        { id: "Security", name: "Security" },
                        { id: "Network/Wi-Fi", name: "Network/Wi-Fi" },
                        { id: "Electrical", name: "Electrical" },
                        { id: "Other", name: "Other" },
                    ]}/>
                    <SelectInput source="status" choices={[
                        { id: '<b>NEW REQUEST</b>', name: 'NEW REQUEST' },
                        { id: '<b>PROPOSAL REQUIRED</b>', name: 'PROPOSAL REQUIRED' },
                        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'FOLLOW UP REQUIRED' },
                        { id: '<b>SCHEDULED</b>', name: 'SCHEDULED' },
                        { id: '<b>COMPLETED</b>', name: 'COMPLETED' },
                    ]} />
                </Grid>
                <Grid item xs={6}>
                <Box sx={{ flexGrow: 1 }}>
                    <TextInput source="description" multiline fullWidth rows={5} />
                    <TextInput source="remarks" multiline fullWidth rows={5} />
                </Box>
                </Grid>
            </Grid>
        </Box>
        </SimpleForm>
    </Create>
);