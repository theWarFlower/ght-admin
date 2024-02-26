import { Dashboard, ViewListRounded } from '@mui/icons-material/';

import { Box } from "@mui/material";
import {
  Admin,
  RefreshIconButton,
  Resource,
  Layout,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { ListRequests, ShowRequests, EditRequests, CreateRequests } from "./requests/Requests";

const MyLayout = (props: any) => (
  <>
    <Layout
      {...props}
      maxWidth="xl"
      toolbar={
        <Box display="flex" gap={1} mr={1} alignItems="center">
          <Dashboard /> GHT Service Dashboard
          <RefreshIconButton />
        </Box>
      }
    />
  </>
);

export const App = () => (
  <Admin 
    dataProvider={dataProvider}
    title="GHT Service Dashboard"
    layout={MyLayout}
  >
  <Resource
    name="requests"
    list={ListRequests}
    create={CreateRequests}
    edit={EditRequests}
    show={ShowRequests}
    icon={ViewListRounded}
    />
  </Admin>
);
