import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Pokemons from "./pages/Pokemon";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Filter from "./component/common/Filter";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} /> 
          <Route path="/:id" element={<Pokemons />} />
          <Route path="/aman" element={<Filter />} />
        </Route>
      </>
    )
  );
  
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      </QueryClientProvider>
  );
}

export default App;
