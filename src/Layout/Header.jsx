import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import useLocalStore from "../hook/useLocalStorage";

export const Header = () => {
  let navigate = useNavigate();
  const { email } = useLocalStore();

  const opts = [
    {
      title: "Logout",
      cb: () => {
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("token");

        navigate("/");
      },
    },
    {
      title: "Change password",
      cb: () => {
        navigate("/changepassword");
      },
    },
  ];
  const menu = (
    <Menu>
      {opts.map((item, key) => {
        return (
          <Menu.Item key={key} onClick={item.cb}>
            {item.title}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <Layout.Header>
      <div className="flex justify-between items-center w-full max-h-[64px]">
        <div className="flex justify-between items-center w-[400px]">
          <div className="flex justify-between font-bold text-[32px] text-center  text-[white]  ">
            UIT
          </div>
        </div>

        {/* <Dropdown  placement="bottomRight" arrow>
      
    </Dropdown> */}
        <div className="text-[white] max-h-[64px]">
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <span id="login" className="ml-2 font-bold cursor-pointer">
              {email && email}
            </span>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};
