import {
    Show,
    SimpleShowLayout,
    TextField,
    EmailField,
    useRecordContext
} from 'react-admin';

import { RequestAside } from './RequestAside'

const RequestTitle = () => {
    const record = useRecordContext();
    return <span>Request | {record ? `${record.name}` : ''}</span>
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

