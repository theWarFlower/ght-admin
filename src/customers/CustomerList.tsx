import { 
    Datagrid, 
    EmailField, 
    FunctionField, 
    List, 
    RadioButtonGroupInput, 
    SimpleList, 
    TextField,
} from 'react-admin';
import { useMediaQuery, Theme } from "@mui/material";
import { Customer } from '../types';

export const customerFilters = [
    <RadioButtonGroupInput source="location" label="Location" alwaysOn choices={[
        { id: "Atlanta", name: "Atlanta" },
        { id: "Birmingham", name: "Birmingham" },
        { id: "30A", name: "30A" },
        { id: '', name: "All" },
    ]}/>,
];

export const ListCustomer = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    
    return (
        <List 
            sort={{ field: "last_name", order: "ASC" }}
            perPage={25}
            filters={customerFilters}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => `${record.first_name} ${record.last_name}`} 
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.phone}
                />      
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false} sx={{
                    '& .RaDatagrid-rowOdd': {
                        backgroundColor: '#eef',
                    },
                    '& .RaDatagrid-row': {
                        whiteSpace: 'nowrap',
                    },
                    '& .column-phone': {
                        maxWidth: '6em',
                        overflow: 'clip',
                    },
                    '& .column-email': {
                        maxWidth: '10em',
                        overflow: 'clip',
                    },
                    '& .column-last_name': {
                        maxWidth: '8em',
                        overflow: 'hidden',
                    },
                    '& .column-address1': {
                        maxWidth: '10em',
                        overflow: 'hidden',
                    },
                    '& .column-city':{
                        maxWidth: '4em',
                        overflow: 'hidden',
                    },
                    '& .column-state': {
                        maxWidth: '2em',
                    },
                    '& .column-zipcode': {
                        maxWidth: '3em',
                    }
                }}>
            <FunctionField<Customer>
                source="last_name"
                label="Name"
                render={record => `${record.first_name} ${record.last_name}`}
                sx={{ fontWeight: 'bold'}}
            />
            <EmailField source="email" />
            <TextField source="phone" sx={{ fontWeight: 'bold'}} />
            <TextField source="address1" label="Address" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="zipcode" />
        </Datagrid>
            )}
    </List>
)};