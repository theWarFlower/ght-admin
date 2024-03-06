import { EmailField, FunctionField, Show, SimpleShowLayout, TextField, useRecordContext } from 'react-admin';
import { Customer } from "../types";
import { CustomerAside } from "./CustomerAside";

const CustomerTitle = () => {
    const record = useRecordContext();
    return <span>Customer | {record ? `${record.first_name} ${record.last_name}` : ''}</span>
};

export const ShowCustomer = () => (
    <Show title={<CustomerTitle />} aside={<CustomerAside />}>
        <SimpleShowLayout>
            <FunctionField<Customer>
                source="last_name"
                label="Name"
                render={record => `${record.first_name} ${record.last_name}`}
            />
            <EmailField source="email" />
            <TextField source="phone" />
            <TextField source="location" />
            <TextField source="city" />
            <TextField source="state" />
            <TextField source="address1" />
            <TextField source="address2" />
            <TextField source="zipcode" />
        </SimpleShowLayout>
    </Show>
)