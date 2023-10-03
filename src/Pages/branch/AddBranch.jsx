import React from "react";
import { Button, Form, Input, notification, Select, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { usePost, useGet } from "../../api";
import { Layout } from "../../Layout/Layout";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebaseConfig"
export const AddBranch = () => {
    const { fetchGet, result: Optionsresult } = useGet();
    const [options, setOptions] = React.useState(undefined);
    const [image, setImage] = React.useState("");
    const { fetchPost, isLoading, result } = usePost();
    const openNotificationWithIcon = (type, message = "", des = "") => {
        notification[type]({
            message: message,
            description: des,
        });
    };
    const onFinish = (values) => {
        // console.log(values.image);
        fetchPost("branch", {
            branchInfo: {
                managerId: values.managerId,
                name: values.name,
                image: image
            },
            address: {
                houseNumber: values.houseNumber,
                street: values.street,
                commune: values.commune,
                district: values.district,
                province: values.province,
                latitude: values.latitude,
                longitude: values.longitude
            }

        });
    };

    const checkFile = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Chỉ cho phép tải lên các tệp ảnh JPG/PNG!');
        }
        return isJpgOrPng;
    };

    const customRequest = async ({ file, onSuccess, onError }) => {

        // Xử lý tải lên tệp ở đây, ví dụ, sử dụng XMLHttpRequest hoặc Fetch API.
        const storageRef = ref(storage, `/Branchs/${file.uid}`);
        await uploadBytes(storageRef, file).then(async (snapshot) => {
            const imageUrl = await getDownloadURL(storageRef);
            setImage(imageUrl);
            onSuccess();
        }).catch(e => {
            console.log(`Error uploading the file:${e}`)
            onError();
        })

        // Sau khi tải lên thành công, gọi `onSuccess()`, nếu có lỗi, gọi `onError()`.
    };

    React.useEffect(() => {
        openNotificationWithIcon("success", "Thêm chi nhánh mới thành công");
    }, [result]);

    React.useEffect(() => {
        fetchGet("manager");
        // eslint-disable-next-line
    }, [])
    React.useEffect(() => {
        if (Optionsresult) {
            const newOptions = Optionsresult.managers.map((option) => {
                return {
                    label: option.firstName + " " + option.lastName,
                    value: option.id,
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
                    <label>THÔNG TIN:</label>
                    <Form
                        name="AddBranch"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên chi nhánh"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên chi nhánh",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên chi nhánh" />
                        </Form.Item>
                        <Form.Item
                            label="Quản lý"
                            name="managerId"
                            rules={[
                                {
                                    required: true,
                                    message: "",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn quản lý"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ảnh",
                                },
                            ]}
                        >
                            <Upload
                                customRequest={customRequest}
                                showUploadList={true}
                                beforeUpload={checkFile}
                            >
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item>

                        <label>ĐỊA CHỈ:</label>
                        <Form.Item
                            label="Số nhà"
                            name="houseNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số nhà",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số nhà" />
                        </Form.Item>
                        <Form.Item
                            label="Tên đường"
                            name="street"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đường",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên đường" />
                        </Form.Item>
                        <Form.Item
                            label="Phường/xã"
                            name="commune"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập phường/xã",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập phường/xã" />
                        </Form.Item>
                        <Form.Item
                            label="Quận/huyện"
                            name="district"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập quận/huyện",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số quận/huyện" />
                        </Form.Item>
                        <Form.Item
                            label="Tỉnh"
                            name="province"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tỉnh",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số tỉnh" />
                        </Form.Item>
                        <Form.Item
                            label="Vĩ độ"
                            name="latitude"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Vĩ độ",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Vĩ độ" />
                        </Form.Item>
                        <Form.Item
                            label="Kinh độ"
                            name="longitude"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Kinh độ",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập Kinh độ" />
                        </Form.Item>



                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button
                                id="AddUser"
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                loading={isLoading}
                            >
                                Thêm chi nhánh mới
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};
