import {
    List,
    SimpleList,
    Datagrid,
    RadioButtonGroupInput,
    TextField,
    EmailField,
    FunctionField,
    ReferenceField,
} from 'react-admin';

import { useMediaQuery, Theme } from "@mui/material";
import { DescriptionField } from "../components/DescriptionField";
import { StatusField } from '../components/StatusField';
import { DateField } from 'react-admin';
import { Customer } from '../types';

export const requestFilters = [
    <RadioButtonGroupInput source="status" label="Status" alwaysOn choices={[
        { id: '', name: 'None' },
        { id: '<b>NEW REQUEST</b>', name: 'New' },
        { id: '<b>PROPOSAL REQUIRED</b>', name: 'Needs Proposal' },
        { id: '<b>FOLLOW UP REQUIRED</b>', name: 'Follow-up' },
        { id: '<b>SCHEDULED</b>', name: 'Scheduled' },
        { id: '<b>COMPLETED</b>', name: 'Complete' },
    ]} />,
    <RadioButtonGroupInput source="location" label="Location" alwaysOn choices={[
        { id: "Atlanta", name: "Atlanta" },
        { id: "Birmingham", name: "Birmingham" },
        { id: "30A", name: "30A" },
        { id: '', name: "All" },
    ]}/>,
];

export const ListRequests = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    return (
        <List 
            sort={{ field: "created_at", order: "DESC" }}
            perPage={25}
            filters={requestFilters}
            title={"Support Requests"}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `${record.first_name} ${record.last_name}`}
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
                    <ReferenceField
                        source="customer_id"
                        reference="customers"
                        label="Name"
                    />
                    <ReferenceField source="customer_id" reference="customers">
                        <TextField source="email" />
                    </ReferenceField>
                    <TextField source="phone" />
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
