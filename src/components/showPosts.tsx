import { EmailField, NumberField, RichTextField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const ShowPosts = () => (
    <Show>
        <SimpleShowLayout>
            <NumberField source="id" />
            <TextField source="name" />
            <TextField source="mobile" />
            <EmailField source="email" />
            <TextField source="description" />
            <TextField source="remarks" />
            <TextField source="location" />
            <TextField source="support_type" />
            <RichTextField source="status" />
            <TextField source="created_at" />
        </SimpleShowLayout>
    </Show>
);