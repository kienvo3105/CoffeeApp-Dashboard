import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Button, Modal } from "antd";
import React from "react";
import { useGet, useDelete } from "../../api";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../Layout/Layout";

export const Province = () => {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const { fetchGet, isLoading, result } = useGet();
  const { fetchDelete, isLoading: isDeleteLoading } = useDelete();

  const showConfirm = (id) => {
    confirm({
      title: "Bạn có muốn xóa tỉnh này không?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await fetchDelete("province/" + id);
        fetchGet("province");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Tỉnh",
      dataIndex: "name",
      key: "name",
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
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  React.useEffect(() => {
    fetchGet("province");
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>Province</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
        <Button onClick={() => navigate("/province/add")} type="primary" danger>
          Add province
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
