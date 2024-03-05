import {
  Admin,
  CustomRoutes,
  Resource,
} from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { ForgotPasswordPage, LoginPage, SetPasswordPage } from 'ra-supabase';
import requests from './requests';

export const App = () => (
  <BrowserRouter>
    <Admin 
      dataProvider={dataProvider}
      authProvider={authProvider}
      title="GHT Service Dashboard"
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
