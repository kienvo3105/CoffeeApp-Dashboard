import React from "react";
import { Button, Form, Input, notification, Select } from "antd";

import { usePost, useGet } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddShowTime = () => {

    const { fetchGet, result: Optionsresult } = useGet();
    const [options, setOptions] = React.useState(undefined);
    const [optionsCinema, setOptionsCinema] = React.useState(undefined);
    const { fetchPost, isLoading, result } = usePost();
    const openNotificationWithIcon = (type, message = "", des = "") => {
        notification[type]({
            message: message,
            description: des,
        });
    };
    const onFinish = (values) => {
        console.log();
        fetchPost("showtime", {
            ...values,
        });
    };

    React.useEffect(() => {
        openNotificationWithIcon("success", "Thêm xuất chiếu mới thành công");
    }, [result]);

    React.useEffect(() => {
        fetchGet("province");
        // eslint-disable-next-line
    }, [])
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

    React.useEffect(() => {
        fetchGet("cinema");
        // eslint-disable-next-line
    }, [])

    React.useEffect(() => {
        if (Optionsresult) {
            const newOptions = Optionsresult.map((option) => {
                return {
                    label: option.name,
                    value: option._id,
                };
            });
            setOptionsCinema(newOptions);
        }
        // eslint-disable-next-line
    }, [Optionsresult]);
    return (
        <Layout>

            <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
                <div className=" m-5  left-0 pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-[white]">
                    <Form
                        name="AddShowTime"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Ngày chiếu:"
                            name="Date"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ngày chiếu",
                                },
                            ]}
                        >
                            <Input type="Date" />
                        </Form.Item>

                        <Form.Item
                            label="Tỉnh"
                            name="provinceId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn tỉnh",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn tỉnh"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Cinema"
                            name="CinemaID"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn tỉnh",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn Rạp"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={optionsCinema}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Giờ chiếu:"
                            name="Time"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn giờ chiếu",
                                },
                            ]}
                        >
                            <Input type="Time" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button
                                id="AddUser"
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                                loading={isLoading}
                            >
                                Thêm xuất chiếu mới
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    );
};
