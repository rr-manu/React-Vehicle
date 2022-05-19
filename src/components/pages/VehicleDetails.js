import React, { useState, useEffect } from "react";
import { Get,GetPrediction } from "../../utils/api";
import { Link } from "react-router-dom";
import "./VehicleDetails.css";

export default function VehicleDetails() {
  //get carid from url
  const carid = window.location.pathname.split("/")[2];
  //const carid = "CAR1";
  console.log(carid);

  //make a get request to get vehicle details
  const getVehicle = async () => {
    const url =
      "channels/mychannel/chaincodes/fabcar?args=[" +
      JSON.stringify(carid) +
      "]&fcn=queryCar";
    console.log(url);
    const data = await Get(url);
    console.log(data);
    return data;
  };
  const getVehicleHistory = async () => {
    const history_url =
      "channels/mychannel/chaincodes/fabcar?args=[" +
      JSON.stringify(carid) +
      "]&fcn=getAssetHistory";
    console.log(history_url);
    const history_data = await Get(history_url);
    console.log(history_data);
    return history_data;
  };

  //make a get request to get predicted price of vehicle
    const getPredictedPrice = async () => {
        const prediction_url = "predict?carID="+JSON.stringify(carid);
        console.log(prediction_url);
        const prediction_data = await GetPrediction(prediction_url);
        console.log(prediction_data);
        return prediction_data;
    };

  const [vehicleData, setVehicleData] = useState();
  const [hasVehicleData, setHasVehicleData] = useState(false);
  const [historyData, setHistoryData] = useState();
  const [hasHistoryData, setHasHistoryData] = useState(false);
    const [predictedPrice, setPredictedPrice] = useState();
    const [hasPredictedPrice, setHasPredictedPrice] = useState(false);

  useEffect(() => {
    const data = getVehicle()
      .then((data) => {
        console.log(data.data.result);
        setVehicleData(data.data.result);
        setHasVehicleData(true);
      })

      .catch((err) => {
        console.log(err);
      });

    const history_data = getVehicleHistory()
      .then((history_data) => {
        console.log(history_data.data.result);
        setHistoryData(history_data.data.result);
        setHasHistoryData(true);
      })
      .catch((err) => {
        console.log(err);
      });

    const predicted_price = getPredictedPrice()
        .then((predicted_price) => {
            console.log(predicted_price.data);
            setPredictedPrice(predicted_price.data);
            setHasPredictedPrice(true);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        );
  }, []);

  return (
    <div className="text-center">
      <Link to="/owner-dashboard">
        <button className="primary-button">Dashboard</button>
      </Link>
      <h1 className="main-title home-page-title">Vehicle Details</h1>
      <h2>These are the details of {carid}</h2>
      {/* display vehicle data */}
      {hasVehicleData && (
        <div className="innertable">
          <div className="vehicle-details" style={{ alignContent: "center" }}>
            <table>
              <tbody>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>Model</td>
                  <td>{vehicleData.model}</td>
                </tr>
                <tr>
                  <td>Manufacturer</td>
                  <td>{vehicleData.make}</td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>{vehicleData.color}</td>
                </tr>
                <tr>
                  <td>Fuel Type</td>
                  <td>{vehicleData.fuelType}</td>
                </tr>
                <tr>
                  <td>InsuranceID</td>
                  <td>{vehicleData.insuranceID}</td>
                </tr>
                <tr>
                  <td>Insurance Expiry</td>
                  <td>{vehicleData.insuranceExpiry}</td>
                </tr>
                <tr>
                  <td>Max Power</td>
                  <td>{vehicleData.maxPower}</td>
                </tr>
                <tr>
                  <td>Mileage</td>
                  <td>{vehicleData.mileage}</td>
                </tr>
                <tr>
                  <td>Seats</td>
                  <td>{vehicleData.seats}</td>
                </tr>
                <tr>
                  <td>Transmission</td>
                  <td>{vehicleData.transmissionType}</td>
                </tr>
                <tr>
                  <td>Year</td>
                  <td>{vehicleData.year}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{vehicleData.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <h2>History of {carid}</h2>
      <div className="outer">
        {/* display vehicle history */}
        {hasHistoryData && (
          <div className="inner">
            {historyData.map((historyData) => {
              return (
                <div className="card" key={historyData.Timestamp.seconds}>
                  <div className="container">
                    <h3>{historyData.Value.status}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <h2>Predicted Price of {carid}</h2>
      {hasPredictedPrice &&
          <h3>{predictedPrice} lakhs</h3>}
      {!hasPredictedPrice && <h3>Loading...</h3>}
    </div>
  );
}
