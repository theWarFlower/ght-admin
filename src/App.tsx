import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';

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
          <DashboardIcon /> GHT Service Dashboard
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
    icon={ViewListRoundedIcon}
    />
  </Admin>
);
