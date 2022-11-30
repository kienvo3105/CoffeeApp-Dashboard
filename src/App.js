import React from "react";
import { Locations } from "./Pages/Locations";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { PrivatePage } from "./Pages/PrivatePage";
import { NotFound } from "./Pages/NotFound";
import { Movie } from "./Pages/movie/Movie";
import { ChangePassword } from "./Pages/ChangePassword";
import { AddMovie } from "./Pages/movie/AddMovie";
import { Province } from "./Pages/province/Province";
import { Cinema } from "./Pages/cinema/Cinema";

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
      <Route
        path="province"
        element={
          <PrivatePage>
            <Province />
          </PrivatePage>
        }
      />
      <Route
        path="cinema"
        element={
          <PrivatePage>
            <Cinema />
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
