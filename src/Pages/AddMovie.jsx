import React from "react";
import { Button, Col, Form, Input, notification, Row, Upload } from "antd";

import { usePost } from "../api";
import { Layout } from "../Layout/Layout";
import S3FileUpload from "react-s3";
import { Buffer } from "buffer";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: "ie104",
  dirName: "images",
  region: "ap-southeast-1",
  accessKeyId: "AKIA2F4RQQUOW5OCZMEE",
  secretAccessKey: "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",
};

export const AddMovie = () => {
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
    fetchPost("movie", {
      ...values,
      image: imageUrl,
    });
  };
  React.useEffect(() => {
    openNotificationWithIcon("success", "Add user successfully");
  }, [result]);
  const uploadButton = (
    <div>
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Layout>
      <div className="relative w-full min-h-screen m-0 p-0 bg-[#e5e7eb]">
        <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
          <h1 className="text-center text-[40px] mb-[30px]">Add new movie</h1>
          <Row>
            <Col span={8} className="">
              <Upload showUploadList={false} name="file" onChange={upload}>
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" className="w-[80%]" />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
            <Col span={16}>
              <Form
                name="AddUser"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="director"
                  name="director"
                  rules={[
                    {
                      required: true,
                      message: "Please input first name",
                    },
                  ]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
                <Form.Item
                  label="actors"
                  name="actors"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name",
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                  label="genre"
                  name="genre"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name",
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                  label="duration"
                  name="duration"
                  rules={[
                    {
                      required: false,
                      message: "Please input last name",
                    },
                  ]}
                >
                  <Input type="Number" placeholder="Enter your last name" />
                </Form.Item>
                <Form.Item
                  label="language"
                  name="language"
                  rules={[
                    {
                      required: true,
                      message: "Please input last name",
                    },
                  ]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                  <Button
                    id="AddUser"
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                    loading={isLoading}
                  >
                    AddUser
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};
