import React ,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Get, Post } from '../../utils/api';
import authService from '../../utils/auth.service';

export default function TransDashboard(){

    const username = authService.getUsername();
    const [inspectionData,setInspectionData] =useState([]);
    const [hasInspectionData, setHasInspectionData] = useState(false);

    const getInspectionRequests = async () => {

        const url = "channels/mychannel/chaincodes/fabcar?args=["+JSON.stringify("")+"]&fcn=queryAllInspectionRequests";
        console.log(url);
        const data = await Get(url);
        console.log(data);
        return data;
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
    }, []);

    return(
        <div className='text-center'>
             <h1 className="title">Scrapping Dashboard</h1>
            <h1 className="sub-title">Welcome {username}</h1>
            <Link to="/">
                <button className="primary-button" onClick={authService.logout}>Log out</button>
            </Link>
            <h2>Requests recieved for vehicle Inspection</h2>
            {/* Display vehicleData */}
            {hasInspectionData && (
        <div className="outer-sale">
          {inspectionData.map((vehicle) => {
            return (
              <div className="card-main" key={vehicle.key}>
                <div className="container-main">
                  <h3>{vehicle.value.make}</h3>
                  <h3>{vehicle.value.model}</h3>
                  <p>{vehicle.value.color}</p>
                  <p>{vehicle.value.status}</p>
                  {/* <button className='secondary-button' onClick={() => handleScrap(vehicle.key)}>
                    Scrap vehicle
                  </button> */}
    
                </div>
              </div>
            );
          })}
        </div>
      )}
            <h2>Requests recieved for vehicle registration verification</h2>
            <h2>Requests recieved for insurance verification</h2>
        </div>
    )
}