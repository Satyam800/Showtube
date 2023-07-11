import "./App.css";
import ButtonList from "./Component/ButtonList";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import { Provider } from "react-redux";
import Store from "./Utils/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Component/Body";
import MainBody from "./Component/MainBody";
import WatchPage from "./Component/WatchPage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <MainBody />,
      },

      {
        path: "watch",
        element: <WatchPage />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Provider store={Store}>
        <Header />

        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
}

export default App;
