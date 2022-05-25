import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Get, Post } from '../../utils/api';
import authService from '../../utils/auth.service';

export default function TransDashboard(){

    const username = authService.getUsername();
    const [inspectionData,setInspectionData] =useState([]);
    const [hasInspectionData, setHasInspectionData] = useState(false);
    const [registrationData,setRegistrationData] =useState([]);
    const [hasRegistrationData, setHasRegistrationData] = useState(false);
    const [insuranceData,setInsuranceData] =useState([]);
    const [hasInsuranceData, setHasInsuranceData] = useState(false);
    const post_url = "channels/mychannel/chaincodes/fabcar"

    const getInspectionRequests = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryAllInspectionRequests";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const getRegistrationRequests = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryRegistrationsNotVerified";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const getInsuranceRequests = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryInsuranceNotVerified";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const handleInspection = async (carid) => {

      console.log("Welcome to inspection");
      const inspection_data = {
        fcn: "inspectCar",
        chaincodeName:"fabcar",
        channelName: "mychannel",
        args: [carid]
    }
    console.log(inspection_data);

    const postResponse = await Post(post_url,inspectionData);
    console.log(postResponse);
    };

    const handleRegistration = async (carid) => {

      console.log("Welcome to registration");
      const registration_data = {
        fcn: "verifyRegistration",
        chaincodeName:"fabcar",
        channelName: "mychannel",
        args: [carid]
    }
    console.log(registration_data);

    const postResponse = await Post(post_url,registrationData);
    console.log(postResponse);
    };

   const handleInsurance = async (carid) => {

      console.log("Welcome to insurance");
      const insurance_data = {
        fcn: "verifyInsurance",
        chaincodeName:"fabcar",
        channelName: "mychannel",
        args: [carid]
    }
    console.log(insurance_data);

    const postResponse = await Post(post_url,insuranceData);
    console.log(postResponse);
    };


    useEffect(() => {
        const data = getInspectionRequests().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasInspectionData(true);
            }

            console.log(data.data.result)
            setInspectionData(data.data.result);

        })
        .catch(err => {
            console.log(err);
        });

        const data2 = getRegistrationRequests().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasRegistrationData(true);
            }
            console.log(data.data.result)
            setRegistrationData(data.data.result);

        }
        ).catch(err => {
            console.log(err);
        }
        );

        const data3 = getInsuranceRequests().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasInsuranceData(true);
            }
            console.log(data.data.result)
            setInsuranceData(data.data.result);

        }
        ).catch(err => {
            console.log(err);
        }
        );

    }, []);



    return(
        <div className='text-center'>
             <h1 className="title">Scrapping Dashboard</h1>
            <h1 className="sub-title">Welcome {username}</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <h2>Requests recieved for vehicle Inspection</h2>
            {/* Display inspectionData */}
            {hasInspectionData && (
        <div className="outer-main">
          {inspectionData.map((vehicle) => {
            return (
              <div className="card-main" key={vehicle.key}>
                <div className="container-main">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  <button className='secondary-button' onClick={() => handleInspection(vehicle.key)}> Inspect Vehicle </button>
    
                </div>
              </div>
            );
          })}
        </div>
      )}
            <h2>Requests recieved for vehicle registration verification</h2>
            {/* Display registrationData */}
            {hasRegistrationData && (
        <div className="outer-main">
          {registrationData.map((vehicle) => {
            return (
              <div className="card-main" key={vehicle.key}>
                <div className="container-main">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  <button className='secondary-button' onClick={() => handleRegistration(vehicle.key)}> Verify Registration </button>
                  </div>
              </div>
            );
          })}
        </div>
      )}


            <h2>Requests recieved for insurance verification</h2>
            {/* Display insuranceData */}
            {hasInsuranceData && (
        <div className="outer-main">
          {insuranceData.map((vehicle) => {
            return (
              <div className="card-main" key={vehicle.key}>
                <div className="container-main">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  <button className='secondary-button' onClick={() => handleInsurance(vehicle.key)}> Verify Insurance </button>
                  </div>
              </div>
            );
          })}
        </div>
      )}
        </div>
    )
}