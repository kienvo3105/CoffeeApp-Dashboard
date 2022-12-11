import React from "react";
import { Button, Form, Input, notification, Select } from "antd";

import { useGet, usePatch } from "../../api";
import { Layout } from "../../Layout/Layout";
import { useParams } from "react-router-dom";
export const UpdateCinema = () => {
  const { id } = useParams();
  const { fetchGet: fetchGetCinema, result: cinema } = useGet();

  const { fetchGet, result: Optionsresult } = useGet();
  const [options, setOptions] = React.useState(undefined);
  const { fetchPatch, isLoading, result } = usePatch();
  const openNotificationWithIcon = (type, message = "", des = "") => {
    notification[type]({
      message: message,
      description: des,
    });
  };
  const onFinish = (values) => {
    console.log();
    fetchPatch("cinema/" + id, {
      ...values,
    });
  };

  React.useEffect(() => {
    openNotificationWithIcon("success", "Cập nhật rạp thành công");
  }, [result]);

  React.useEffect(() => {
    fetchGet("province");
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    fetchGetCinema("cinema/" + id);
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
  console.log(cinema);

  return (
    <Layout>
      <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
        <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
          {cinema && (
            <Form
              name="AddCinema"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              initialValues={{
                name: cinema.name,
                address: cinema.address,
                address_url: cinema.address_url,
                provinceId: cinema.province._id,
              }}
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
                label="Link địa chỉ"
                name="address_url"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập link địa chỉ rạp",
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
                  disabled
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
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </Layout>
  );
};
