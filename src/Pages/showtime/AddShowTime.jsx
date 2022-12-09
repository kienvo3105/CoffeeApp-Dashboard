import React from "react";
import { Button, Form, Input, notification, Select, DatePicker, TimePicker } from "antd";

import { usePost, useGet } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddShowTime = () => {
    const dateFormat = "DD/MM/YYYY";

    const { fetchGet, result: Optionsresult } = useGet();
    const { fetchGet: fetchgetProvince, result: OptionsresultCinema } = useGet();
    const { fetchGet: fetchgetMovie, result: OptionsresultMovie } = useGet();
    const { fetchGet: fetchgetRoom, result: OptionsresultRoom } = useGet();
    const [options, setOptions] = React.useState(undefined);
    const [optionsCinema, setOptionsCinema] = React.useState(undefined);
    const [optionsMovie, setOptionsMovie] = React.useState(undefined);
    const [optionsRoom, setOptionsRoom] = React.useState(undefined);
    const { fetchPost, isLoading, result } = usePost();
    const openNotificationWithIcon = (type, message = "", des = "") => {
        notification[type]({
            message: message,
            description: des,
        });
    };
    const onFinish = (values) => {
        //console.log(values.Date._d.toISOString());
        console.log(values.Time._d.getHours() + ":" + values.Time._d.getMinutes());
        console.log({
            ...values,
            date: values.Date._d.toISOString(),
            time: values.Time._d.getHours() + ":" + values.Time._d.getMinutes()
        });
        fetchPost("showtime", {
            ...values,
            date: values.Date._d.toISOString(),
            time: values.Time._d.getHours() + ":" + values.Time._d.getMinutes()
        });
    };

    React.useEffect(() => {
        openNotificationWithIcon("success", "Thêm xuất chiếu mới thành công");
    }, [result]);

    React.useEffect(() => {
        fetchgetMovie("movie");
        // eslint-disable-next-line
    }, [])
    React.useEffect(() => {
        if (OptionsresultMovie) {
            const newOptions = OptionsresultMovie?.map((option) => {
                return {
                    label: option.name,
                    value: option._id,

                };
            });
            setOptionsMovie(newOptions);


        }
        // eslint-disable-next-line
    }, [OptionsresultMovie]);


    React.useEffect(() => {
        fetchGet("province");
        // eslint-disable-next-line
    }, [])
    React.useEffect(() => {
        if (Optionsresult) {
            const newOptions = Optionsresult?.map((option) => {
                return {
                    label: option.name,
                    value: option._id,

                };
            });
            setOptions(newOptions);


        }
        // eslint-disable-next-line
    }, [Optionsresult]);

    const fetchProvince = (id) => {
        fetchgetProvince("province/" + id)
    }

    React.useEffect(() => {
        if (OptionsresultCinema) {

            //cinema
            const cinema = OptionsresultCinema?.cinemas?.map((option) => {
                return {
                    label: option.name,
                    value: option._id,
                };
            });

            setOptionsCinema(cinema);
        }
        // eslint-disable-next-line
    }, [OptionsresultCinema]);


    const fetchRoom = (id) => {
        fetchgetRoom("cinema/" + id);
    }


    React.useEffect(() => {
        if (OptionsresultRoom) {

            //cinema
            const room = OptionsresultRoom?.rooms?.map((option) => {
                return {
                    label: option.name,
                    value: option._id,
                };
            });
            console.log((room));
            console.log(OptionsresultRoom.rooms);
            setOptionsRoom(room);
        }
        // eslint-disable-next-line
    }, [OptionsresultRoom]);

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
                            label="Phim"
                            name="movieId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn tên phim",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn tên phim"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                                options={optionsMovie}
                            />
                        </Form.Item>

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
                            <DatePicker format={dateFormat} />
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
                                onChange={(e) => {
                                    fetchProvince(e);

                                }}
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Cinema"
                            name="CinemaID"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn Rạp",
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
                                onChange={(e) => {
                                    console.log(e);
                                    fetchRoom(e);


                                }}
                                options={optionsCinema}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phòng"
                            name="roomId"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn phòng",
                                },
                            ]}
                        >
                            <Select
                                placeholder="Chọn Phòng"
                                filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }

                                options={optionsRoom}
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
                            <TimePicker format="HH:mm"></TimePicker>
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
