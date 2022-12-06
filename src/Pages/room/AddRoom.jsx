import React from "react";
import { Button, Form, Input, notification, Select } from "antd";

import { usePost, useGet } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddRoom = () => {
  const { fetchGet, result: Optionsresult } = useGet();
  const [options, setOptions] = React.useState(undefined);
  const { fetchPost, isLoading, result } = usePost();
  const openNotificationWithIcon = (type, message = "", des = "") => {
    notification[type]({
      message: message,
      description: des,
    });
  };
  const onFinish = (values) => {
    console.log();
    fetchPost("room", {
      ...values,
    });
  };

  React.useEffect(() => {
    openNotificationWithIcon("success", "Thêm rạp mới thành công");
  }, [result]);

  React.useEffect(() => {
    fetchGet("cinema");
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    if (Optionsresult) {
      const newOptions = Optionsresult.map((option) => {
        return {
          label: option.name,
          value: option._id,
        };
      });
      setOptions(newOptions);
    }
    // eslint-disable-next-line
  }, [Optionsresult]);

  return (
    <Layout>
      <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
        <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
          <Form
            name="AddRoom"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên phòng"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phòng",
                },
              ]}
            >
              <Input placeholder="Nhập tên phòng" />
            </Form.Item>

            <Form.Item
              label="Rạp"
              name="cinema"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                placeholder="Chọn rạp"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={options}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoading}
              >
                Thêm phòng mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
