import React from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Select,
  DatePicker,
  InputNumber,
} from "antd";

import { usePost } from "../../api";
import { Layout } from "../../Layout/Layout";

const genreOptions = [
  { value: "Hành động", id: 0 },
  { value: "Tình cảm", id: 1 },
  { value: "Hài", id: 2 },
  { value: "Kinh dị", id: 3 },
  { value: "Khoa học viễn tưởng", id: 4 },
  { value: "Hoạt hình", id: 5 },
  { value: "Tâm Lý", id: 6 },
  { value: "Tội phạm", id: 7 },
  { value: "Phim tài liệu", id: 8 },
  { value: "Phiêu Lưu", id: 9 },
  { value: "Thần thoại", id: 10 },
];

export const AddMovie = () => {
  const { fetchPost, isLoading, result } = usePost();
  const openNotificationWithIcon = (type, message = "", des = "") => {
    notification[type]({
      message: message,
      description: des,
    });
  };

  const onFinish = (values) => {
    console.log(values.genre.toString());

    console.log();
    fetchPost("movie", {
      ...values,
      releaseDate: values.date._d.toISOString(),
    });
  };
  const dateFormat = "DD/MM/YYYY";

  React.useEffect(() => {
    openNotificationWithIcon("success", "Add user successfully");
  }, [result]);
  return (
    <Layout>
      <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
        <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
          <Form
            name="AddUser"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Tên phim"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên phim",
                },
              ]}
            >
              <Input placeholder="Nhập tên phim" />
            </Form.Item>
            <Form.Item
              label="Đạo diễn"
              name="director"
              rules={[
                {
                  required: true,
                  message: "Vui Lòng nhập tên đạo diễn",
                },
              ]}
            >
              <Input placeholder="Vui Lòng nhập tên đạo diễn" />
            </Form.Item>
            <Form.Item
              label="Diễn viên"
              name="actors"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập các diễn viên",
                },
              ]}
            >
              <Input placeholder="Vui lòng nhập các diễn viên" />
            </Form.Item>
            <Form.Item
              label="Thể loại"
              name="genre"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Chọn thể loại"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={genreOptions}
              />
            </Form.Item>
            <Form.Item
              label="Kiểm duyệt"
              name="rated"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Select
                placeholder="Chọn loại kiểm duyệt"
                options={[
                  {
                    label: "P - PHIM DÀNH CHO MỌI ĐỐI TƯỢNG",
                    value: "P - PHIM DÀNH CHO MỌI ĐỐI TƯỢNG",
                  },
                  {
                    label: "C13 - PHIM CẤM KHÁN GIẢ DƯỚI 13 TUỔI",
                    value: "C13 - PHIM CẤM KHÁN GIẢ DƯỚI 13 TUỔI",
                  },
                  {
                    label: "C16 - PHIM CẤM KHÁN GIẢ DƯỚI 16 TUỔI",
                    value: "C16 - PHIM CẤM KHÁN GIẢ DƯỚI 16 TUỔI",
                  },
                  {
                    label: "C18 - PHIM CẤM KHÁN GIẢ DƯỚI 18 TUỔI",
                    value: "C18 - PHIM CẤM KHÁN GIẢ DƯỚI 18 TUỔI",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Ngày khởi chiếu"
              name="date"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <DatePicker format={dateFormat} />
            </Form.Item>
            <Form.Item
              label="Thời lượng"
              name="duration"
              rules={[
                {
                  required: true,
                  message: "Thời lượng phim",
                },
              ]}
            >
              <InputNumber
                min="0"
                type="Number"
                placeholder="Thời lượng phim"
              />
            </Form.Item>
            <Form.Item
              label="Ngôn ngữ"
              name="language"
              rules={[
                {
                  required: true,
                  message: "Nhập ngôn ngữ",
                },
              ]}
            >
              <Input placeholder="Ngôn ngữ" />
            </Form.Item>
            <Form.Item
              label="Link trailer"
              name="trailer_url"
              rules={[
                {
                  required: true,
                  message: "Nhập link trailer",
                },
              ]}
            >
              <Input placeholder="Nhập trailer" />
            </Form.Item>
            <Form.Item
              label="Mô tả:"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Nhập mô tả",
                },
              ]}
            >
              <Input.TextArea placeholder="mô tả" />
            </Form.Item>
            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Chọn hình ảnh",
                },
              ]}
            >
              <Input placeholder="Nhập link hinh anh" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                id="AddUser"
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                loading={isLoading}
              >
                Thêm phim mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};
