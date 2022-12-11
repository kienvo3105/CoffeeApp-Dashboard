import { useNavigate } from "react-router-dom";
import { Layout } from "../../Layout/Layout";

import React from "react";
import { Button, Space, Breadcrumb, Modal, Select } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useGet, useDelete } from "../../api";
const Dates = [];
for (let i = 0; i <= 6; i++) {
  const toDate = new Date();
  const temp = new Date();
  temp.setDate(toDate.getDate() + i);
  const temp2 =
    (temp.getDay() !== 0 ? "T" + (1 + temp.getDay()) : "CN") +
    ", " +
    temp.getDate() +
    "/" +
    (temp.getMonth() + 1);
  temp.setHours(7);
  temp.setMinutes(0);
  temp.setSeconds(1)
  Dates.push({
    time: temp2,
    id: i + 1,
    date: temp.toISOString()
  });
}


export const ShowTime = () => {
  let navigate = useNavigate();
  const { confirm } = Modal;
  const { fetchDelete } = useDelete();



  const [date, setDate] = React.useState(Dates[0].date);

  const [provinceId, setProvinceId] = React.useState("638f61dceae6921efd78e7b4");
  const [movieId, setMovieId] = React.useState("");

  const { fetchGet, result: Optionsresult } = useGet();
  const { fetchGet: fetchGetShowtime, result: showtimeResult } = useGet();
  const { fetchGet: fetchgetMovie, result: OptionsresultMovie } = useGet();
  const [optionsMovie, setOptionsMovie] = React.useState(undefined);



  const showConfirm = (id) => {
    confirm({
      title: "Do you Want to delete this movie?",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await fetchDelete("showtime/" + id);
        fetchGetShowtime(`showtime/${movieId}/${provinceId}/${date}`)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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

      const allMovie = {
        label: "Tất cả phim",
        value: "null"
      }
      newOptions.unshift(allMovie);
      setOptionsMovie(newOptions);


    }
    // eslint-disable-next-line
  }, [OptionsresultMovie]);




  React.useEffect(() => {
    fetchGet("province");
    // eslint-disable-next-line
  }, [])


  React.useEffect(() => {
    fetchGetShowtime(`showtime/${movieId}/${provinceId}/${date}`)
    // eslint-disable-next-line
  }, [provinceId, date, movieId]);


  React.useEffect(() => {
    if (showtimeResult) {
      console.log(showtimeResult)
    }
    // eslint-disable-next-line
  }, [showtimeResult]);

  const DateClicked = (date) => {
    setDate(date);
    //setProvinceId("638f61dceae6921efd78e7b4");
  }

  return (
    <Layout>
      <Breadcrumb style={{ marginLeft: "16px" }}>
        <Breadcrumb.Item>ShowTime</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-[24px] min-h-[360px] bg-white m-[24px]">
        <Button onClick={() => navigate("/showtime/add")} type="primary" danger>
          Add ShowTime
        </Button>
        <div className="p-[24px] min-h-[360px] bg-white my-[50px] mx-[200px]">
          <div className=" mb-6">
            <Select
              className=" w-[500px]"
              placeholder="Chọn tên phim"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())

              }
              options={optionsMovie}
              onChange={(value) => setMovieId(value)}
            />
          </div>
          <div className="border-y-4 border-black py-5">
            {Dates.map((item) => (
              <button
                onClick={() => DateClicked(item.date)}
                type="button"
                key={item.id}
                className={`ml-5 border ${item.date === date ? "bg-sky-600" : " bg-gray-400"}  hover:bg-sky-300 text-white h-[50px] w-[100px] rounded-xl`}

              >
                {item.time}
              </button>
            ))}
          </div>

          <div className="py-5">
            {Optionsresult && Optionsresult.map((item) => (
              <button
                onClick={() => setProvinceId(item._id)}
                type="button"
                key={item._id}
                className={`ml-5 border ${item._id === provinceId ? "bg-sky-600" : " bg-gray-400"} hover:bg-sky-300  text-white h-[50px] w-[100px] rounded-xl`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div>
            {showtimeResult && showtimeResult.map((item) => (
              <div className="border-t-2 border-slate-600 py-5 mx-[50px]">
                <div className="text-[30px] mb-[20px]">{item?.cinema?.name}</div>
                <Space wrap>
                  {item.showtimes.map((temp, index) => (
                    <div

                      key={index}
                      className="ml-5 border bg-gray-700 hover:bg-sky-300 text-white h-[50px] w-[100px] text-center pt-3 relative"
                    >
                      {temp.time}
                      <div onClick={() => showConfirm(temp._id)} className="cursor-pointer w-[20px] h-[20px] bg-red-500 rounded-full absolute top-[-10px] right-[-10px] text-center">x</div>
                    </div>
                  ))}
                </Space>
              </div>
            ))}
          </div>
        </div>
      </div>


    </Layout>
  );
};
