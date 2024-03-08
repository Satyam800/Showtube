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
import Login from "./views/Login"
import PrivateRoute from "./isAuth.js/PrivateRoute";
import ResetPassword from "./views/ResetPassword";
import OTPVerification from "./views/OTPVerification.js";
import NewPassword from "./views/NewPassword.js";
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
        element:<PrivateRoute> <WatchPage /> </PrivateRoute>,
      },
     
    ],
    
  },
  {
    path:"/login",
    element:<Login/>,
  
  },

  {
    path:"/reset",
    element:<ResetPassword/>
  },
  {
    path:"/OTP-verify",
    element:<OTPVerification/>
  },
  {
    path:"New-Password",
    element:<NewPassword/>
  }
  
])

function App() { 
  return (
    <>
      <Provider store={Store}>


        <RouterProvider router={appRouter} />
      </Provider>
    </>
  );
}

export default App;
