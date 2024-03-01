import { Dashboard, ViewListRounded } from '@mui/icons-material/';
import { Box } from '@mui/material';
import {
  Admin,
  RefreshIconButton,
  CustomRoutes,
  Resource,
  Layout,
} from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { ListRequests, ShowRequests, EditRequests, CreateRequests } from './requests/Requests';
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from 'ra-supabase';

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
  <BrowserRouter>
    <Admin 
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="GHT Service Dashboard"
      layout={MyLayout}
      loginPage={LoginPage}
      >
      <CustomRoutes noLayout>
        <Route
          path={SetPasswordPage.path}
          element={<SetPasswordPage />}
          />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordPage />}
          />  
        </CustomRoutes>
      <Resource
        name="ingest_table"
        list={ListRequests}
        create={CreateRequests}
        edit={EditRequests}
        show={ShowRequests}
        icon={ViewListRounded}
        options={{ label: 'Support Requests' }}
        />
    </Admin>
  </BrowserRouter>
);
