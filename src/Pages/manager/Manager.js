import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Button, Modal } from "antd";
import React from "react";
import { useGet, useDelete } from "../../api";
// import { useNavigate } from "react-router-dom";

import { Layout } from "../../Layout/Layout";

export const Manager = () => {
    // let navigate = useNavigate();
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
            title: "Họ",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "Tên",
            dataIndex: "firstName",
            key: "firstName",
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
        fetchGet("manager");
        // eslint-disable-next-line
    }, []);

    return (
        <Layout>
            <Breadcrumb style={{ marginLeft: "16px" }}>
                <Breadcrumb.Item>Manager</Breadcrumb.Item>
            </Breadcrumb>
            <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
                <div>
                    {result && (
                        <Table
                            loading={isLoading || isDeleteLoading}
                            columns={columns}
                            dataSource={result.errorCode ? null : result?.managers}
                            rowKey="id"
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
};
