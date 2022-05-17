import { StyleSheet, Text, View } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../../utils/auth.service";
import { Get } from "../../utils/api";
import React from "react";

export default function CarsForSale() {


  //handlePurchase
    const handlePurchase = async (carid) => {
        console.log(carid);
        //post api to change car owner
        const changeOwner_url= "http://localhost:4000/channels/mychannel/chaincodes/fabcar"
        
    }  
  //make a get request to get cars for sale
  const getCarsForSale = async () => {
    const sale_url =
      "channels/mychannel/chaincodes/fabcar?args=[" +
      JSON.stringify("") +
      "]&fcn=queryCarForSale";
    console.log(sale_url);
    const data = await Get(sale_url);
    console.log(data);
    return data;
  };

  const [carsForSaleData, setCarsForSaleData] = useState([]);
  const [hasCarsForSale, setHasCarsForSale] = useState(false);

  //make a get request to get cars for resale
  const getCarsForResale = async () => {
    const resale_url =
      "channels/mychannel/chaincodes/fabcar?args=[" +
      JSON.stringify("") +
      "]&fcn=queryCarForResale";
    console.log(resale_url);
    const data = await Get(resale_url);
    console.log(data);
    return data;
  };

  const [carsForResaleData, setCarsForResaleData] = useState([]);
  const [hasCarsForResale, setHasCarsForResale] = useState(false);

  useEffect(() => {
    const data = getCarsForSale()
      .then((data) => {
        console.log(data.data.result.length);
        if (data.data.result.length > 0) {
          setHasCarsForSale(true);
        }

        console.log(data.data.result);
        setCarsForSaleData(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });

    const data2 = getCarsForResale()
      .then((data) => {
        console.log(data.data.result.length);
        if (data.data.result.length > 0) {
          setHasCarsForResale(true);
        }

        console.log(data.data.result);
        setCarsForResaleData(data.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Cars For Sale</h1>
      {hasCarsForSale && (
        <div className="outer">
          {carsForSaleData.map((vehicle) => {
            return (
              <div className="card" key={vehicle.key}>
                <div className="container">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  <button onClick={() => handlePurchase(vehicle.key)}>Purchase</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
        <h1>Cars For Resale</h1>
        {hasCarsForResale && (
            <div className="outer">
                {carsForResaleData.map((vehicle) => {
                    return (
                        <div className="card" key={vehicle.key}>
                            <div className="container">
                                <h3>{vehicle.value.make}</h3>
                                <h3>{vehicle.value.model}</h3>
                                <p>{vehicle.value.color}</p>
                                <p>{vehicle.value.status}</p>
                                <button onClick={() => handlePurchase(vehicle.key)}>Purchase</button>
                            </div>
                        </div>
                    );
                })}
        </div>
  )};
    </div>
    );
}
