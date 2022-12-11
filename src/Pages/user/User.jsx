import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Button, Modal } from "antd";
import React from "react";
import { useGet, useDelete } from "../../api";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../Layout/Layout";

export const User = () => {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const { fetchGet, isLoading, result } = useGet();
  const { fetchDelete, isLoading: isDeleteLoading } = useDelete();

  const showConfirm = (id) => {
    confirm({
      title: "Bạn có muốn khóa tài khoản này không?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await fetchDelete("user/" + id);
        fetchGet("user");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dayOfBirth",
      key: "dayOfBirth",
      render: (dayOfBirth) => {
        const date = new Date(dayOfBirth);
        const formatDate =
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getFullYear();
        return formatDate;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Tổng chi tiêu",
      dataIndex: "tickets",
      key: "tickets",
      render: (tickets) => {
        if (tickets.length === 0) return <></>;
        const total = tickets.reduce(
          (total, ticket) => total + ticket.totalTicket + ticket.totalFood,
          0
        );
        return total;
      },
    },
    {
      key: "action",
      render: (_, record) => {
        return (
          <div>
            <Button
              onClick={() => {
                showConfirm(record._id);
              }}
            >
              Khóa
            </Button>
          </div>
        );
      },
    },
  ];
  React.useEffect(() => {
    fetchGet("user");
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
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
