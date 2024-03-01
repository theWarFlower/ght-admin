import { Dashboard } from '@mui/icons-material/';
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
import requests from './requests';
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
        options={{ label: 'Support Requests' }}
        {...requests}
        />
    </Admin>
  </BrowserRouter>
);
