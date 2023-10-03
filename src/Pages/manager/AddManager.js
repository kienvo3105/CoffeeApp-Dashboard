import React from "react";
import { Button, Form, Input, notification } from "antd";

import { usePost } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddManager = () => {
    const { fetchPost, isLoading, result } = usePost();
    const openNotificationWithIcon = (type, message = "", des = "") => {
        notification[type]({
            message: message,
            description: des,
        });
    };
    const onFinish = (values) => {
        console.log(values);
        fetchPost("manager", {
            ...values,
        });
    };

    React.useEffect(() => {
        openNotificationWithIcon("success", "Thêm quản lý mới thành công");
        console.log("🚀 ~ file: AddManager.js:25 ~ AddManager ~ result:", result)
    }, [result]);


    return (
        <Layout>
            <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
                <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
                    <Form
                        name="AddBranch"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập email",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập emal" type="email" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Số điện thoại",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập mật khẩu" />
                        </Form.Item>

                        <Form.Item
                            label="Họ"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Họ" />
                        </Form.Item>

                        <Form.Item
                            label="Tên"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Tên" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button
                                id="AddManager"
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                loading={isLoading}
                            >
                                Thêm quản lý mới
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};
