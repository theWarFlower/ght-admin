import { 
    SimpleShowLayout,
    TextField,
    useRecordContext,
} from "react-admin";

import { DateField } from "../components/DateField";
import { StatusField } from "../components/StatusField";
import { Box } from '@mui/material';

export const RequestAside = () => {
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