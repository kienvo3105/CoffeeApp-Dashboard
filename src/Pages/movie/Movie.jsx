import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Button, Modal } from "antd";
import React from "react";
import { useGet, useDelete } from "../../api";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../Layout/Layout";

export const Movie = () => {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const { fetchGet, isLoading, result } = useGet();
  const { fetchDelete, isLoading: isDeleteLoading } = useDelete();

  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this movie?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await fetchDelete("movie/" + id);
        fetchGet("movie");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns = [
    {
      title: "Phim",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Banner",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img src={image} alt="" className="h-[50px]" />;
      },
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Ngày khỏi chiếu",
      dataIndex: "releaseDate",
      key: "releaseDate",
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Đạo diễn",
      dataIndex: "director",
      key: "director",
    },
    {
      title: "Diễn viên",
      dataIndex: "actors",
      key: "actors",
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
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
    fetchGet("movie");
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>Movie</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
        <Button onClick={() => navigate("/movie/add")} type="primary" danger>
          Add movie
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
