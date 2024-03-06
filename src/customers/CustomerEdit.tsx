import { Edit, NumberInput, SimpleForm, TextInput, RadioButtonGroupInput, useRecordContext, TopToolbar, UpdateButton, useNotify, useRedirect } from 'react-admin';
import { CustomerAside } from './CustomerAside';

const CustomerTitle = () => {
    const record = useRecordContext();
    return <span>Customer | {record ? `${record.first_name} ${record.last_name}` : ''}</span>
};

export const EditCustomer = () => (
    <Edit title={<CustomerTitle />} aside={<CustomerAside />}>
        <SimpleForm>
            <TextInput source="first_name" />
            <TextInput source="last_name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <RadioButtonGroupInput source="location" choices={[
                        { id: "Atlanta", name: "Atlanta" },
                        { id: "Birmingham", name: "Birmingham" },
                        { id: "30A", name: "30A" },
                    ]}/>
            <TextInput source="address1" />
            <TextInput source="address2" />
            <TextInput source="city" />
            <TextInput source="state" />
            <NumberInput source="zipcode" />
        </SimpleForm>
    </Edit>
);