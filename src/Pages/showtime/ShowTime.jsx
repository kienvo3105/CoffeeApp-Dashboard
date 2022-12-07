import { Breadcrumb, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Layout/Layout";

export const ShowTime = () => {
  let navigate = useNavigate();
  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>ShowTime</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
        <Button onClick={() => navigate("/showtime/add")} type="primary" danger>
          Add ShowTime
        </Button>
      </div>
    </Layout>
  );
};
