import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import "./map.css"
const containerStyle = {
  width: "200px",
  height: "200px",
  //   margin:'auto'
};

export const Map = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const getData = () => {
    axios.get("http://localhost:8080/restaurants").then((res) => {
      setData(res.data);
      {data[0] && data.filter((val) => {
        if (search == "") {
          return val;
        } else if (
          val.restaurentName.toLowerCase().includes(search.toLowerCase())
        ) {
          setData(val);
        }
      })

    }});
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Search for restaurants"
        onChange={handleChange}
      />
      
      <div className="display">
        {data[0] && data.map((el, key) => {
          return (
            <div key={key}>
              <LoadScript googleMapsApiKey="AIzaSyAOjypqm9RPy6YoYLZIhOnndIknzyg1YtY">
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={`lat:${el.latitude},lng:${el.longitude}`}
                  zoom={10}
                ></GoogleMap>
                {/* <Marker onLoad={onLoad} position={position} /> */}
              </LoadScript>
              <h1>{el.restaurant_name}</h1>
            </div>
          );
        })}
        </div>
    </>
  );
};
