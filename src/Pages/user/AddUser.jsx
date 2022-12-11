import React from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Upload,
  Select,
  DatePicker,
  InputNumber,
} from "antd";

import { usePost } from "../../api";
import { Layout } from "../../Layout/Layout";
import S3FileUpload from "react-s3";
import { Buffer } from "buffer";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "ie104",
  dirName: "images",
  region: "ap-southeast-1",
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
};

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

export const AddUser = () => {
  const [imageUrl, setImageUrl] = React.useState();
  const { fetchPost, isLoading, result } = usePost();
  const openNotificationWithIcon = (type, message = "", des = "") => {
    notification[type]({
      message: message,
      description: des,
    });
  };
  const upload = (e) => {
    S3FileUpload.uploadFile(e.file.originFileObj, config)
      .then((data) => {
        console.log(data);
        setImageUrl(data.location);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(imageUrl);
  const onFinish = (values) => {
    console.log(values.genre.toString());

    console.log();
    fetchPost("user", {
      ...values,
      image: imageUrl,
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
                    label: "P",
                    value: 1,
                  },
                  {
                    label: "C13",
                    value: 2,
                  },
                  {
                    label: "C16",
                    value: 3,
                  },
                  {
                    label: "C18",
                    value: 4,
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
              <Upload showUploadList={false} name="file" onChange={upload}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="hinh anh"
                    className="max-w-[300px]"
                  />
                ) : (
                  <Button> Tải ảnh lên</Button>
                )}
              </Upload>
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
