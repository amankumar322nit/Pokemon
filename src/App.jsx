import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} /> 
          {/* <Route path="post/:id" element={<SinglePost />} /> */}
        </Route>
      </>
    )
  );
  


  return (
      <RouterProvider router={router} />
  );
}

export default App;
