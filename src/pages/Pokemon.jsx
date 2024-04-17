import axios from "axios";
// import React, { useEffect, useState } from 'react'
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

const Pokemon = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    var url = "https://pokeapi.co/api/v2/pokemon/" + id;
    axios
      .get(url)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let imageId = id.toString();
  var x = imageId.length;
  while (x < 3) {
    imageId = "0" + imageId;
    x++;
  }
  var url =
    "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" +
    imageId +
    ".png";
  //var url=`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${imageId}.png`;
  const options = useMemo(() => {
    var options = {
      color: "yellow",
      series: [
        {
          data: [],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      xaxis: {
        categories: [],
        max: 150,
      },
    };
    data?.stats?.map((stat) => {
      options.series[0].data.push(stat.base_stat);
      options.xaxis.categories.push(stat.stat.name);
    });
    return options;
  }, [data]);
  return (
    <div className="flex flex-col justify-center items-center">
    <p className="text-2xl font-bold text-black-500 leading-7 tracking-tight mt-10">
        {data?.name?.toUpperCase()}
      </p>
      <img className="w-1/4 h-1/4" src={url} alt="Pokemon" />
      <div className="flex flex-row gap-20">
      <p className="text-xl font-medium text-black-500 leading-7 tracking-tight ">
        Weight {data?.weight}kg
      </p>
      <p className="text-xl font-medium text-black-500 leading-7 tracking-tight">
        Height {data?.height}m
      </p>
      </div>
      <div className="flex flex-row justify-center items-center">
        {data &&
          Object.values(data?.sprites).map(
            (sprit) =>
              sprit?.length && (
                <img
                  key={sprit}
                  className="w-30 h-30"
                  src={sprit}
                  alt="Pokemon"
                />
              )
          )}
      </div>
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={350}
        width={500}
      />
    </div>
  );
};

export default Pokemon;
