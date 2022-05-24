import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Get, Post } from '../../utils/api';
import authService from '../../utils/auth.service';
import Vehicles from './Vehicle';

export default function ScrapDashboard(){

    const username = authService.getUsername();
    const [vehiclesData, setVehiclesData] = useState([]);
    const [hasVehicles, setHasVehicles] = useState(false);

    //make a get request to get vehicle list
    const getVehicles = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryAllScrapRequests";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
    };

    const handleScrap = async (id) => {
        console.log(id);
        const url = "channels/mychannel/chaincodes/fabcar";
        const resale_data = {
            fcn: "deleteCar",
            chaincodeName:"fabcar",
            channelName: "mychannel",
            args: [id]
        }
        console.log(resale_data);

        const postResponse = await Post(url, resale_data);
        console.log(postResponse);
    }

    useEffect(() => {
        const data = getVehicles().then(data => {
            console.log(data.data.result.length)
            if(data.data.result.length > 0){
                setHasVehicles(true);
            }

            console.log(data.data.result)
            setVehiclesData(data.data.result);

        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    return(
        <div className='text-center'>
             <h1 className="title">Scrapping Dashboard</h1>
            <h1 className="sub-title">Welcome {username}</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <h2>Requests recieved for scrapping</h2>
            {/* Display vehicleData */}
            {hasVehicles && (
        <div className="outer-sale">
          {vehiclesData.map((vehicle) => {
            return (
              <div className="card-main" key={vehicle.key}>
                <div className="container-main">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  <button className='secondary-button' onClick={() => handleScrap(vehicle.key)}>
                    Scrap vehicle
                  </button>
    
                </div>
              </div>
            );
          })}
        </div>
      )}

        </div>
    )
}