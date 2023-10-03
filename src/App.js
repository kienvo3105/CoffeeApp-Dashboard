import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { PrivatePage } from "./Pages/PrivatePage";
import { NotFound } from "./Pages/NotFound";
import { ChangePassword } from "./Pages/ChangePassword";
import { Branch } from "./Pages/branch/Branch";
import { AddBranch } from "./Pages/branch/AddBranch";
import { User } from "./Pages/user/User";
import { AddUser } from "./Pages/user/AddUser";
import { Manager } from "./Pages/manager/Manager";
import { AddManager } from "./Pages/manager/AddManager";
const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivatePage>
            <Branch />
          </PrivatePage>
        }
      ></Route>

      <Route
        path="manager"
        element={
          <PrivatePage>
            <Manager />
          </PrivatePage>
        }
      />
      <Route
        path="manager/add"
        element={
          <PrivatePage>
            <AddManager />
          </PrivatePage>
        }
      />


      <Route
        path="user"
        element={
          <PrivatePage>
            <User />
          </PrivatePage>
        }
      />
      <Route
        path="user/add"
        element={
          <PrivatePage>
            <AddUser />
          </PrivatePage>
        }
      />

      <Route
        path="branch"
        element={
          <PrivatePage>
            <Branch />
          </PrivatePage>
        }
      />

      <Route
        path="branch/add"
        element={
          <PrivatePage>
            <AddBranch />
          </PrivatePage>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
