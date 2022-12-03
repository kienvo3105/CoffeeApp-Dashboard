import React from "react";
import { Button, Form, Input, notification } from "antd";

import { usePost } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddProvince = () => {
  const { fetchPost, isLoading, result } = usePost();
  const openNotificationWithIcon = (type, message = "", des = "") => {
    notification[type]({
      message: message,
      description: des,
    });
  };
  const onFinish = (values) => {
    fetchPost("province", {
      ...values,
    });
  };

  React.useEffect(() => {
    openNotificationWithIcon("success", "Thêm rạp mới thành công");
  }, [result]);

  return (
    <Layout>
      <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
        <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
          <Form
            name="Addprovince"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên tỉnh"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên tỉnh",
                },
              ]}
            >
              <Input placeholder="Nhập tên tỉnh" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                id="AddUser"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoading}
              >
                Thêm tỉnh mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
