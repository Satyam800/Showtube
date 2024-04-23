import "./App.css";
import React, { useState, useEffect } from "react";
import ButtonList from "./Component/ButtonList";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar";
import { Provider } from "react-redux";
import Store from "./Utils/Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./Component/Body";
import MainBody from "./Component/MainBody";
import WatchPage from "./Component/WatchPage";
import Login from "./views/Login";
import PrivateRoute from "./isAuth.js/PrivateRoute";
import ResetPassword from "./views/ResetPassword";
import OTPVerification from "./views/OTPVerification.js";
import NewPassword from "./views/NewPassword.js";
import WatchHistory from "./Component/History/WatchHistory.js";
import LikedVideo from "./Component/Like/LikedVideo.js";
import Playlistcard from "./Component/Playlist/Playlistcard.js";
import SearchResult from "./Component/SearchResult.js";
import Offline from "./Component/Offline.js";
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
        element: (
          <PrivateRoute>
            {" "}
            <WatchPage />{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/OTP-verify",
    element: <OTPVerification />,
  },
  {
    path: "New-Password",
    element: <NewPassword />,
  },
  {
    path: "/history",
    element: <WatchHistory />,
  },
  {
    path: "/likedVideo",
    element: <LikedVideo />,
  },
  {
    path: "/playlist",
    element: <Playlistcard />,
  },
  {
    path: "/search/:id",
    element: <SearchResult />,
  },
]);

function App() {
  console.log(process.env.REACT_APP_API_KEYS, "URRRRL");

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <>
      {!isOnline ? <Offline /> : null}
      <Provider store={Store}>
        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
}

export default App;
