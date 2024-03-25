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
import customers from './customers';

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
        name="requests"
        options={{ label: 'Support Requests' }}
        {...requests}
        />
      <Resource
        name="customers"
        {...customers}
        />
    </Admin>
  </BrowserRouter>
);
