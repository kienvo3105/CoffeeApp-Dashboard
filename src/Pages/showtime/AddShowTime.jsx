import React from "react";
import {
  Button,
  Form,
  notification,
  Select,
  DatePicker,
  TimePicker,
  Space,
  Modal,
} from "antd";

import { usePost, useGet, useDelete } from "../../api";
import { Layout } from "../../Layout/Layout";

export const AddShowTime = () => {
  const dateFormat = "DD/MM/YYYY";
  const { confirm } = Modal;
  const { fetchGet, result: Optionsresult } = useGet();
  const { fetchGet: fetchgetProvince, result: OptionsresultCinema } = useGet();
  const { fetchGet: fetchgetMovie, result: OptionsresultMovie } = useGet();
  const { fetchGet: fetchgetRoom, result: OptionsresultRoom } = useGet();
  const { fetchGet: fetchgetShowTime, result: OptionsresultShowTime } =
    useGet();
  const [options, setOptions] = React.useState(undefined);
  const [optionsCinema, setOptionsCinema] = React.useState(undefined);
  const [optionsMovie, setOptionsMovie] = React.useState(undefined);
  const [optionsRoom, setOptionsRoom] = React.useState(undefined);
  const [optionsShowTime, setOptionsShowTime] = React.useState(undefined);
  const [date, setDate] = React.useState("");
  const [cinema, setCinema] = React.useState("");
  const [provinceId, setProvinceId] = React.useState("");
  const { fetchPost, isLoading, result } = usePost();
  const { fetchDelete } = useDelete();
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
      date: values.Date._d.toLocaleDateString("en-CA"),
      time: values.Time._d.getHours() + ":" + values.Time._d.getMinutes(),
    });
    fetchPost("showtime", {
      ...values,
      date: values.Date._d.toLocaleDateString("en-CA"),
      time: values.Time._d.getHours() + ":" + values.Time._d.getMinutes(),
    });
  };

  React.useEffect(() => {
    openNotificationWithIcon("success", "Thêm xuất chiếu mới thành công");
    fetchShowtime();
    // eslint-disable-next-line
  }, [result]);

  React.useEffect(() => {
    fetchgetMovie("movie");
    // eslint-disable-next-line
  }, []);
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
  }, []);
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
    setProvinceId(id);
    fetchgetProvince("province/" + id);
  };

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
    setCinema(id);
    fetchgetRoom("cinema/" + id);
  };

  React.useEffect(() => {
    if (OptionsresultRoom) {
      //cinema
      const room = OptionsresultRoom?.rooms?.map((option) => {
        return {
          label: option.name,
          value: option._id,
        };
      });
      console.log(room);
      console.log(OptionsresultRoom.rooms);
      setOptionsRoom(room);
    }
    // eslint-disable-next-line
  }, [OptionsresultRoom]);

  const fetchShowtime = () => {
    // fetchgetShowTime("showtime");
    fetchgetShowTime(`showtime/null/${provinceId}/${date}`);
  };
  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this movie?",
      onOk: async () => {
        await fetchDelete("showtime/" + id);
        fetchShowtime();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  React.useEffect(() => {
    if (OptionsresultShowTime) {
      //cinema
      const getCinema = OptionsresultShowTime.filter((option) => {
        return option.cinema._id === cinema;
      });
      // console.log(getCinema);
      const showtime = getCinema[0].showtimes;
      console.log(showtime);
      const showtimeRoom = optionsRoom?.map((room) => {
        const getShowtimeForRoom = showtime.filter((option) => {
          //console.log(option.roomId._id);
          return option.roomId._id === room.value;
        });
        const time = getShowtimeForRoom.map((option) => {
          return {
            time: option.time + " -> " + option.time_end,
            id: option._id,
          };
        });
        return {
          label: room.label,
          value: room.value,
          time: time,
        };
      });
      console.log(showtimeRoom);
      // console.log(showtime);
      // console.log(OptionsresultShowTime);
      setOptionsShowTime(showtimeRoom);
    }
    // eslint-disable-next-line
  }, [OptionsresultShowTime]);

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
              <DatePicker
                format={dateFormat}
                onChange={(date) => {
                  const temp = new Date(date);
                  temp.setHours(7);
                  temp.setMinutes(0);
                  temp.setSeconds(1);
                  setDate(temp.toLocaleDateString("en-CA"));
                  fetchShowtime();
                }}
              />
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
                  // fetchShowtime();
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
                  fetchShowtime();
                }}
                options={optionsCinema}
              />
            </Form.Item>
            <Form.Item>
              <div>
                {optionsShowTime &&
                  optionsShowTime.map((room) => {
                    return (
                      <div className="border-t-2 border-slate-600 py-2 ml-[30%] mr-0">
                        <div className="text-[15px] mb-[5px]">
                          Room {room.label}
                        </div>
                        <Space wrap>
                          {room.time.map((showtime, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() => showConfirm(showtime.id)}
                                className="ml-1 border bg-gray-700 hover:bg-sky-300 text-white h-[30px] w-[80px] text-center relative pt-[5px] text-[12px]"
                              >
                                {showtime.time}
                              </div>
                            );
                          })}
                        </Space>
                      </div>
                    );
                  })}
              </div>
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
