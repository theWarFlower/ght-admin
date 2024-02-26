import { useMediaQuery, Theme } from "@mui/material";
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

import { 
    List, 
    SimpleList, 
    Datagrid, 
    Show, 
    Create, 
    SimpleShowLayout,
    TextField, 
    EmailField, 
    NumberField, 
    RichTextField,
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    CheckboxGroupInput,
    SelectField,
    ArrayField,
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
    <TextInput source="q" label="Search" alwaysOn />,
    <CheckboxGroupInput source="status" label="Status" alwaysOn choices={[
        { id: '<b>NEW REQUEST</b>', name: 'NEW REQUEST' },
        { id: '<b>PROPOSAL REQUIRED</b>', name: 'PROPOSAL REQUIRED' },
        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'FOLLOW UP REQUIRED' },
        { id: '<b>SCHEDULED</b>', name: 'SCHEDULED' },
        { id: '<b>COMPLETED</b>', name: 'COMPLETED' },
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
        <List perPage={25} filters={requestFilters} title={"GHT Service Dashboard"}>
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

export const ShowRequests = () => (
    <Show title={<RequestTitle />}>
        <SimpleShowLayout>
            <TextField source="name" />
            <EmailField source="email" />
            <NumberField source="mobile" />
            <TextField source="description" />
            <TextField source="remarks" />
            <SelectField source="location" choices={[
                { id: "Atlanta", name: "Atlanta" },
                { id: "Birmingham", name: "Birmingham" },
                { id: "30A", name: "30A" },
            ]}/>
            <ArrayField source="support_type" />
            <RichTextField source="status" choices={[
                { id: '<b>NEW REQUEST</b>', name: 'NEW REQUEST' },
                { id: '<b>PROPOSAL REQUIRED</b>', name: 'PROPOSAL REQUIRED' },
                { id: '<b>FOLLOW UP REQUIRED</b>', name: 'FOLLOW UP REQUIRED' },
                { id: '<b>SCHEDULED</b>', name: 'SCHEDULED' },
                { id: '<b>COMPLETED</b>', name: 'COMPLETED' },
            ]} />
            <DateField source="created_at" />
        </SimpleShowLayout>
    </Show>
);
export const EditRequests = () => (
    <Edit title={<RequestTitle />}>
        <SimpleForm>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextInput source="name" />
                    <TextInput source="email" />
                    <TextInput source="mobile" />
                    <SelectInput source="location" choices={[
                        { id: "Atlanta", name: "Atlanta" },
                        { id: "Birmingham", name: "Birmingham" },
                        { id: "30A", name: "30A" },
                    ]}/>
                    <CheckboxGroupInput source="support_type" choices={[
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
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="mobile" />
            <TextInput source="description" multiline rows={5}/>
            <TextInput source="remarks" multiline rows={5}/>
            <SelectInput source="location" choices={[
                { id: "Atlanta", name: "Atlanta" },
                { id: "Birmingham", name: "Birmingham" },
                { id: "30A", name: "30A" },
            ]}/>
            <CheckboxGroupInput source="support_type" choices={[
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
        </SimpleForm>
    </Create>
);