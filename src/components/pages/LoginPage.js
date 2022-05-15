import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../App.css";
import { Post } from "../../utils/api";
import authService from "../../utils/auth.service";

export default function SignInPage() {
  const [first_name, setFirstName] = useState();
  const [Organization, setOrganization] = useState();


  useEffect(() => {
    console.log(Organization);
  }, [Organization]);

  const navigate = useNavigate();


  const login = async () => {
    const data = await Post("users/login", {
      username: first_name,
      orgName: Organization,
    });
    console.log(data);
    localStorage.setItem("token", data.data.token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await  authService.login(first_name, Organization).then(
        (response) => {
          console.log(response);
          if(Organization === "Owner"){
            navigate("/owner-dashboard");
          }else{
            navigate("/home");
          }
     
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form action="/home">
        <p>
          <label>Username </label>
          <br />
          <input
            type="text"
            name="first_name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </p>
        <p>
          <label for="Organization">Organization: </label>
          <select
            name="Organization"
            id="Organization"
            onChange={(e) => setOrganization(e.target.value)}
            required
          >
            <option value="blank">Select one</option>
            <option value="Trans">Transport Authority</option>
            <option value="Manuf">Manufacturer</option>
            <option value="Insur">
              Insurance organization
            </option>
            <option value="Owner">Owner</option>
            <option value="Scrap">
              Scrapping organization
            </option>
          </select>
        </p>
        <p>
          <button id="sub_btn" onClick={handleLogin} type="submit">
            Login
          </button>
        </p>
      </form>
      <footer>
        <p>
          First time? <Link to="/register">Create an account</Link>.
        </p>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
