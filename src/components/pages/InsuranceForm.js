import React,{useState,useReducer} from 'react'
import { Post } from '../../utils/api';
import authService from "../../utils/auth.service";


export default function InsuranceForm() {

    const username = authService.getUsername();

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

        const handleSubmit = event => {
            event.preventDefault();
            setFormData({
                name: "agency",
                value: username,
            });
            console.log("You are submiting the form");
            setSubmitting(true);

            console.log(formData);
            const jsonStr= JSON.stringify(formData);
            console.log(jsonStr);
            const post_url = "channels/mychannel/chaincodes/fabcar";
            const post_data = {
                fcn: "createInsurance",
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
        <h1>Insurance Form</h1>
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
        <div className='form-group'>
                <label htmlFor='name'>Insurance ID</label>
                <input type='text' name='insuranceID' id='insuranceID' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='name'>Insurance Name</label>
                <input type='text' name='name' id='name' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='cost'>Insurance Cost</label>
                <input type='number' name='cost' id='cost' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='coverage'>Insurance Coverage</label>
                <input type='text' name='coverage' id='coverage' onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='agency'>Insurance Agency</label>
                <input disabled type='text' name='agency' id='agency' value={username} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label htmlFor='company'>Insurance Validity</label>
                <input type='number' name='validity' id='validity' onChange={handleChange}/>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>

        </form>
        </div>

    </div>
  )
}

