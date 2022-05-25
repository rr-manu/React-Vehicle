import React,{useState,useReducer} from 'react'
import { Link } from 'react-router-dom';
import { Post } from '../../utils/api';
import authService from "../../utils/auth.service";
import './VehicleForm.css'


export default function VehicleForm() {

    const username = authService.getUsername();

    let makes = [
        { label: "Ford", value: "Ford" },
        { label: "Honda", value: "Honda" },
        { label: "Toyota", value: "Toyota" },
        { label: "Hyundai", value: "Hyundai" },
        { label: "Nissan", value: "Nissan" },
        { label: "Isuzu", value: "Isuzu" },
        { label: "Jeep", value: "Jeep" },
        { label: "Kia", value: "Kia" },
        { label: "MG", value: "MG" },
        { label: "Mahindra", value: "Mahindra" },
        { label: "Maruti", value: "Maruti" },
        { label: "Renault", value: "Renault" },
        { label: "Skoda", value: "Skoda" },
        { label: "Tata", value: "Tata" },
        { label: "Volkswagen", value: "Volkswagen" },

    ]

    let models = [
        { label: "Altroz", value: "Altroz" },
        { label: "Amaze", value: "Amaze" },
        { label: "Aspire", value: "Aspire" },
        { label: "Baleno", value: "Baleno" },
        { label: "Bolero", value: "Bolero" },
        { label: "Celerio", value: "Celerio" },
        { label: "Ciaz", value: "Ciaz" },
        { label: "City", value: "City" },
        { label: "Civic", value: "Civic" },
        { label: "Compass", value: "Compass" },
        { label: "Creta", value: "Creta" },
        { label: "D-max", value: "D-max" },
        { label: "Duster", value: "Duster" },
        { label: "Dzire LXI", value: "Dzire LXI" },
        { label: "Dzire VXI", value: "Dzire VXI" }, 
        { label: "Dzire ZXI", value: "Dzire ZXI" },
        { label: "EcoSport", value: "EcoSport" },
        { label: "Eeco", value: "Eeco" },
        { label: "Elantra", value: "Elantra" },
        { label: "Ertiga", value: "Ertiga" },
        { label: "Figo", value: "Figo" },
        { label: "Freestyle", value: "Freestyle" },
        { label: "GO", value: "GO" },
        { label: "Glanza", value: "Glanza" },
        { label: "Grand", value: "Grand" },
        { label: "Harrier", value: "Harrier" },
        { label: "Hector", value: "Hector" },
        { label: "Ignis", value: "Ignis" },
        { label: "Innova", value: "Innova" },
        { label: "Jazz", value: "Jazz" },
        { label: "KUV", value: "KUV" },
        { label: "KUV100", value: "KUV100" },
        { label: "KWID", value: "KWID" },
        { label: "Kicks", value: "Kicks" },
        { label: "Marazzo", value: "Marazzo" },
        { label: "Nexon", value: "Nexon" },
        { label: "Polo", value: "Polo" },
        { label: "Rapid", value: "Rapid" },
        { label: "RediGO", value: "RediGO" },
        { label: "S-Presso", value: "S-Presso" },
        { label: "Safari", value: "Safari" },
        { label: "Santro", value: "Santro" },
        { label: "Scorpio", value: "Scorpio" },
        { label: "Seltos", value: "Seltos" },
        { label: "Swift", value: "Swift" },
        { label: "Swift Dzire", value: "Swift Dzire" },
        { label: "Thar", value: "Thar" },
        { label: "Tiago", value: "Tiago" },
        { label: "Tigor", value: "Tigor" },
        { label: "Triber", value: "Triber" },
        { label: "Tucson", value: "Tucson" },
        { label: "Vento", value: "Vento" },
        { label: "Venue", value: "Venue" },
        { label: "Verna", value: "Verna" },
        { label: "Vitara", value: "Vitara" },
        { label: "WR-V", value: "WR-V" },
        { label: "Wagon R", value: "Wagon R" },
        { label: "XL6", value: "XL6" },
        { label: "XUV300", value: "XUV300" },
        { label: "XUV500", value: "XUV500" },
        { label: "Yaris", value: "Yaris" },
        { label: "i10", value: "i10" },
        { label: "i20", value: "i20" },
        { label: "redi-GO", value: "redi-GO" },

    ]

    let fuelTypes = [
        { label: "Petrol", value: "Petrol" },
        { label: "Diesel", value: "Diesel" },
    ]

    let transmissionTypes = [
        { label: "Automatic", value: "Automatic" },
        { label: "Manual", value: "Manual" },
    ]

    const formReducer = (state, event) => {
        return {
          ...state,
          [event.name]: event.value
        }
       }

       const handleChange = event => {
        setFormData({
          name: event.target.name,
          value: event.target.value,
        });
      }
       

    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);

    //handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({
            name: "owner",
            value: username,
        });

        setFormData({
            name: "status",
            value: "Vehicle-Manufactured",
        });
        console.log("You are submiting the form");
        setSubmitting(true);
        
        //print contents of formData
        console.log(formData);
        const jsonStr = JSON.stringify(formData);
        console.log(jsonStr);
        console.log(JSON.parse(jsonStr));
        //send post request to server
        const post_url = "channels/mychannel/chaincodes/fabcar";
        const post_data = {
            fcn: "createCar",
            chaincodeName: "fabcar",
            channelName: "mychannel",
            args: [jsonStr]
        };
        console.log(post_data);
        const data = Post(post_url, post_data);
        console.log(data);

        setTimeout(() => {
            setSubmitting(false);
        }, 6000)

        console.log("You have submitted the form");
    };

  return (
    <div className='text-center'>
        <h1>Vehicle Form</h1>
        <Link to='/owner-dashboard'>
           <button className='primary-button'>Owner Dashboard</button>
        </Link>
        <Link to='/manuf-dashboard'>
            <button className='primary-button'>Manuf Dashboard</button>
        </Link>
        {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
       </div>
      }
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
            {/* Create a from to take vehicle_name , make, mileage,color, fuelType, transmissionType, seats, maxPower,engine,avg_cost_price */}
            <div className="form-group">
                <label htmlFor="vehicle_chassesNo">Vehicle Chasses No</label>
                <input required type="text" className="form-control" name="carNumber" placeholder="Enter Vehicle Chasses Number" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_model">Vehicle Model</label>
                <select required className="form-control" name="model" placeholder="Select Vehicle Model" onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {models.map((model) => <option value={model.value}>{model.label}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_make">Vehicle Make</label>
                <select required className="form-control" name="make" placeholder="Select Vehicle Make" onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {makes.map((make) => <option value={make.value}>{make.label}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_color">Vehicle Color</label>
                <input required type="text" className="form-control" name="color" placeholder="Enter Vehicle Color" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_seats">Vehicle Seats</label>
                <input required type="number" className="form-control" name="seats" placeholder="Enter Vehicle Seats" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_fuelType">Vehicle Fuel Type</label>
                <select required className="form-control" name="fuelType" placeholder="Select Vehicle Fuel Type" onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {fuelTypes.map((fuelType) => <option value={fuelType.value}>{fuelType.label}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_transmissionType">Vehicle Transmission Type</label>
                <select required  className="form-control" name="transmissionType" placeholder="Select Vehicle Transmission Type" onChange={handleChange}>
                <option value="">--Please choose an option--</option>
                {transmissionTypes.map((transmissionType) => <option value={transmissionType.value}>{transmissionType.label}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_engine">Vehicle Engine</label>
                <input required type="number" className="form-control" name="engine" placeholder="Enter Vehicle Engine" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_maxPower">Vehicle Max Power</label>
                <input required type="number" className="form-control" name="maxPower" placeholder="Enter Vehicle Max Power" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_mileage">Vehicle Mileage</label>
                <input required type="number" className="form-control" name="mileage" placeholder="Enter Vehicle Mileage" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_kmDriven">Kilo Meter Driven</label>
                <input required type="number" className="form-control" name="kmDriven" placeholder="Enter Kilo Meter Driven" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_year">Vehicle Year of Manufacture</label>
                <input required type="number" className="form-control" name="year" placeholder="Enter Year of Manufacture" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_avg_cost_price">Vehicle Avg Cost Price</label>
                <input required type="number" className="form-control" name="avg_cost_price" placeholder="Enter Vehicle Avg Cost Price" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_owner">Vehicle Owner</label>
                <input required disabled type="text" className="form-control" name="owner" placeholder="Enter Year of Manufacture"  value ={username} onChange={handleChange }/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_ownerLevel">Vehicle Owner Level</label>
                <input required type="number" className="form-control" name="ownerLevel" placeholder="Enter Owner Level"  onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Registration Date</label>
                <input required type="text" className="form-control" name="registrationDate" placeholder="Enter Vehicle registration date" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Registration Verified</label>
                <input disabled type="text" className="form-control" name="isRegistrationVerified" placeholder="Is vehicle Registration verified"  value ="false" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle InsuranceID</label>
                <input required type="text" className="form-control" name="insuranceID" placeholder="InsuranceID"   onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Insurance Expiry Date</label>
                <input required type="text" className="form-control" name="insuranceExpiry" placeholder="Insurance Expiry Date"  onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Raise Claim</label>
                <input disabled type="text" className="form-control" name="raiseClaim" placeholder="Raise Claim"  value ="false" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Insurance Verified</label>
                <input disabled type="text" className="form-control" name="isInsuranceVerified" placeholder="Is vehicle Insurance verified"  value ="false" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Inspection Request</label>
                <input disabled type="text" className="form-control" name="requestForInspection"  value ="false" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Health Status</label>
                <input required type="text" className="form-control" name="healthStatus" placeholder="good/poor" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="vehicle_registrationDate">Vehicle Status</label>
                <input disabled type="text" className="form-control" name="status"   value ="Vehicle-Manufactured" onChange={handleChange}/>
            </div>
            <button type="submit" className='secondary-button'>Submit</button>
        </form>
        </div>

    </div>
  )
}

