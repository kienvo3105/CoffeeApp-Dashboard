import React from "react";
import { Button, Form, Input, notification, Select } from "antd";

import { usePost, useGet } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddCinema = () => {
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
    fetchPost("cinema", {
      ...values,
    });
  };

  React.useEffect(() => {
    openNotificationWithIcon("success", "Thêm rạp mới thành công");
  }, [result]);

  React.useEffect(() => {
    fetchGet("province");
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
            name="AddCinema"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên rạp"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên rạp",
                },
              ]}
            >
              <Input placeholder="Nhập tên rạp" />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>

            <Form.Item
              label="Tỉnh"
              name="provinceId"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                placeholder="Chọn thể loại"
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
                id="AddUser"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoading}
              >
                Thêm rạp mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
