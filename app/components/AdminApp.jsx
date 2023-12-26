import { Admin, CustomRoutes, Resource } from "react-admin";
import Dashboard from "../modules/dashboard";
import { darkTheme, lightTheme } from "../themes/adminTheme";
import AppLayout from "../components/AppLayout";
import { Search } from "../modules/search/Search";
import { Route } from "react-router-dom";
import { DSEProvider } from "../provider/DSEProvider";
const AdminApp = () => (
  <Admin
    title="Ecommerce com IA Generativa"
    dashboard={Dashboard}
    dataProvider={DSEProvider}
    layout={AppLayout}
    lightTheme={lightTheme}
    darkTheme={darkTheme}
  >
    {/* <Resource name="search" list={SearchList} /> */}
    <CustomRoutes>
      <Route path="search" element={<Search />} />
    </CustomRoutes>
  </Admin>
);

export default AdminApp;
