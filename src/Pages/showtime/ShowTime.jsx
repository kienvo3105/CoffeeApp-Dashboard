
import { useNavigate } from "react-router-dom";
import { Layout } from "../../Layout/Layout";

import React from "react";
import { Button, Form, Input, notification, Select, Breadcrumb } from "antd";

import { useGet } from "../../api";
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

  let getIdCity = 1;
  let getIdDate = 1;

  const [ShowTime, setShowTime] = React.useState([
    {
      name: "Hà Nội 1",
      id: 1,
      idCity: 1,
      idDate: 1,
      time: ["9h30 AM", "10h AM", "11h30 AM", "1h PM"],
    },
    {
      name: "Hà Nội 2",
      id: 4,
      idCity: 1,
      idDate: 1,
      time: ["9h30 AM", "10h AM", "11h30 AM", "1h PM"],
    },
  ]);

  const [date, setDate] = React.useState(Dates[0].date);



  const [clickedCity, getclickedCity] = React.useState(1);
  const getShowtime = (id) => {
    getIdCity = id;
    getclickedCity(id);
    console.log("getShowTime " + id);

  };


  const { fetchGet, result: Optionsresult } = useGet();
  const { fetchGet: fetchgetProvince, result: OptionsresultCinema } = useGet();
  const { fetchGet: fetchGetShowtime, result: showtimeResult } = useGet();
  const [optionsCinema, setOptionsCinema] = React.useState(undefined);





  React.useEffect(() => {
    fetchGet("province");
    // eslint-disable-next-line
  }, [])

  const fetchProvince = (id) => {
    fetchgetProvince("province/" + id)
  }
  const fetchShowtime = (id) => {
    fetchGetShowtime("showtime/")
  }

  React.useEffect(() => {
    if (OptionsresultCinema) {

      //cinema
      const cinema = OptionsresultCinema?.cinemas

      setOptionsCinema(cinema);
    }
    // eslint-disable-next-line
  }, [OptionsresultCinema]);






  React.useEffect(() => {
    if (showtimeResult) {
      console.log(showtimeResult)
    }
    // eslint-disable-next-line
  }, [showtimeResult]);


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
          <div className="border-y-4 border-black py-5">
            {Dates.map((item) => (
              <button
                onClick={() => setDate(item.date)}
                type="button"
                key={item.id}
                className="ml-5 border bg-sky-700 hover:bg-sky-300 text-white h-[50px] w-[100px] rounded-xl"

              >
                {item.time}
              </button>
            ))}
          </div>

          <div className="py-5">
            {Optionsresult && Optionsresult.map((item) => (
              <button
                onClick={() => fetchProvince(item._id)}
                type="button"
                key={item._id}
                className="ml-5 border hover:bg-sky-300  text-white h-[50px] w-[100px] rounded-xl"
                style={{
                  backgroundColor: clickedCity === item._id ? "#0288D1" : "gray",
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div>
            {optionsCinema && optionsCinema.map((item) => (
              <div className="border-t-2 border-slate-600 py-5 mx-[50px]">
                <div onClick={() => {
                  fetchShowtime()
                }} className="text-[30px] mb-[20px]">{item.name}</div>
                {/* {item.time.map((temp, index) => (
                  <button
                    
                    type="button"
                    key={index}
                    className="ml-5 border bg-gray-700 hover:bg-sky-300 text-white h-[50px] w-[100px]"
                  >
                    {temp}
                  </button>
                ))} */}
              </div>
            ))}
          </div>
        </div>
      </div>


    </Layout>
  );
};
