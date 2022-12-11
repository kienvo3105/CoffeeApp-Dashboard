import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { PrivatePage } from "./Pages/PrivatePage";
import { NotFound } from "./Pages/NotFound";
import { Movie } from "./Pages/movie/Movie";
import { ChangePassword } from "./Pages/ChangePassword";
import { AddMovie } from "./Pages/movie/AddMovie";
import { Province } from "./Pages/province/Province";
import { Cinema } from "./Pages/cinema/Cinema";
import { AddCinema } from "./Pages/cinema/AddCinema";
import { AddProvince } from "./Pages/province/AddProvince";
import { AddRoom } from "./Pages/room/AddRoom";
import { Room } from "./Pages/room/Room";
import { ShowTime } from "./Pages/showtime/ShowTime";
import { User } from "./Pages/user/User";
import { AddUser } from "./Pages/user/AddUser";

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
        path="province/add"
        element={
          <PrivatePage>
            <AddProvince />
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
      <Route
        path="cinema/add"
        element={
          <PrivatePage>
            <AddCinema />
          </PrivatePage>
        }
      />
      <Route
        path="room"
        element={
          <PrivatePage>
            <Room />
          </PrivatePage>
        }
      />
      <Route
        path="room/add"
        element={
          <PrivatePage>
            <AddRoom />
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
        path="showtime"
        element={
          <PrivatePage>
            <ShowTime />
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
