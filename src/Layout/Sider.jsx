import React from "react";
import { Menu, Layout } from "antd";
import { useNavigate, useLocation } from "react-router";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Tỉnh", "province"),
  getItem("Rạp chiếu", "cinema"),
  getItem("Phim", "movie"),
  getItem("Phòng", "room"),
  getItem("Suất chiếu", "showtime"),
  getItem("Khách hàng", "user"),
  getItem("Chi nhánh", "branch")
];
export const Sider = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Layout.Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
    >
      <Menu
        theme="light"
        defaultSelectedKeys={pathname}
        mode="inline"
        items={items}
        onClick={(item) => {
          switch (item.key) {
            case "movie":
              navigate("/movie");
              break;
            case "province":
              navigate("/province");
              break;
            case "cinema":
              navigate("/cinema");
              break;
            case "room":
              navigate("/room");
              break;
            case "showtime":
              navigate("/showtime");
              break;
            case "user":
              navigate("/user");
              break;
            case "branch":
              navigate("/branch");
              break;
            default:
              navigate("/movie");
          }
        }}
      />
    </Layout.Sider>
  );
};
