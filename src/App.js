import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";

const routeDefinition = createRoutesFromElements(
  <Route path="/">
    <Route index={true} element={<Dashboard />}></Route>
    <Route path="/:buildingId/rooms">
      <Route index={true} element={<Rooms />}></Route>
    </Route>
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
