import { FC } from "react";
import { Route, RouteObject, Routes } from "react-router";
import MainPage from "./pages/main-page/MainPage";
import Layout from "./components/Layout/Layout";
import EditEmployeePage from "./pages/edit-employee/EditEmployeePage";
import AddEmployeePage from "./pages/add-employee/AddEmployeePage";
import NotFound from "./pages/not-found/NotFound";

interface AppProps {
  
}
 
const App: FC<AppProps> = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <MainPage />
    },
    {
      path: '/edit-employee/:id',
      element: <EditEmployeePage />
    },
    {
      path: '/add-employee',
      element: <AddEmployeePage />
    },
    {
      path: '/*',
      element: <NotFound />
    }
  ]
  return ( 
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
   );
}
 
export default App;
