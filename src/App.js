import React from "react";
import "./App.css";

/* React-Router */
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

/* Components */
import Root from "./components/Root";
//import SearchResults from "./components/SearchResults/SearchResults";
//import Playlist from "./components/Playlist/Playlist";

/* Mocks */
//import tracksMock from "./tracksMock";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
