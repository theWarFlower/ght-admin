import { 
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    useRecordContext
} from "react-admin";

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { RequestAside } from "./RequestAside";

const RequestTitle = () => {
    const record = useRecordContext();
    return <span>Request | {record ? `${record.name}` : ''}</span>
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