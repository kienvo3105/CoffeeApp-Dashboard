import React from "react";
import { Locations } from "./Pages/Locations";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { PrivatePage } from "./Pages/PrivatePage";
import { NotFound } from "./Pages/NotFound";
import { Movie } from "./Pages/Movie";
import { ChangePassword } from "./Pages/ChangePassword";
import { AddMovie } from "./Pages/AddMovie";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivatePage>
            <Movie />
          </PrivatePage>
        }
      ></Route>
      <Route
        path="locations"
        element={
          <PrivatePage>
            <Locations />
          </PrivatePage>
        }
      />
      <Route
        path="movie"
        element={
          <PrivatePage>
            <Movie />
          </PrivatePage>
        }
      />
      <Route
        path="movie/add"
        element={
          <PrivatePage>
            <AddMovie />
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
