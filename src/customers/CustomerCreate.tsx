import { Create, SimpleForm, TextInput, RadioButtonGroupInput } from 'react-admin';

export const CreateCustomer = () => (
    <Create title={"Customer | Create New"}>
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
            <TextInput source="zipcode" />
        </SimpleForm>
    </Create>
);