import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Button, Modal } from "antd";
import React from "react";
import { useGet, useDelete } from "../../api";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../Layout/Layout";

export const Cinema = () => {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const { fetchGet, isLoading, result } = useGet();
  const { fetchDelete, isLoading: isDeleteLoading } = useDelete();

  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this Cinema?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await fetchDelete("cinema/" + id);
        fetchGet("cinema");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Linh địa chỉ",
      dataIndex: "address_url",
      key: "address_url",
      render: (value) => {
        return (
          <a target="_blank" rel="noreferrer" href={value}>
            {value}
          </a>
        );
      },
    },

    {
      title: "Tỉnh",
      dataIndex: "province",
      key: "province",
      render: (province) => province?.name,
    },
    {
      key: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                navigate("/cinema/update/" + record._id);
              }}
              className="mr-2"
            >
              Cập nhật
            </Button>
            <Button
              onClick={() => {
                showConfirm(record._id);
              }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  React.useEffect(() => {
    fetchGet("cinema");
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>cinema</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
        <Button onClick={() => navigate("/cinema/add")} type="primary" danger>
          Add cinema
        </Button>
        <div>
          {result && (
            <Table
              loading={isLoading || isDeleteLoading}
              columns={columns}
              dataSource={result.error ? null : result}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};
