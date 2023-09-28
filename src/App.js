import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";

const routeDefinition = createRoutesFromElements(
  <Route path="/">
    <Route index={true} element={<Dashboard />}></Route>
    {/* <Route path="buildings">
      <Route index={true} element={<Buildings />}></Route>
    </Route> */}
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
