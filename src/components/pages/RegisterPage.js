import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../App.css";
import { Post } from "../../utils/api";
import authService from "../../utils/auth.service";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState();
  const [org, setOrg] = useState();

  useEffect(() => {
    console.log(org);
  }, [org]);

  const navigate = useNavigate();

  const register = async () => {
    const data = await Post("users", {
      username: firstName,
      orgName: org,
    });

    console.log(data);
    localStorage.setItem("token", data.data.token);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await authService.register(firstName, org).then(
        (response) => {
          console.log(response);
          if(org === "Owner"){
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
      <h2>Join us</h2>
      <h5>Create your personal account</h5>
      <form>
        <p>
          <label>Username</label>
          <br />
          <input
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            name="first_name"
            required
          />
        </p>
        <p>
          <label for="Organization">Organization:</label>
          <select
            onChange={(e) => setOrg(e.target.value)}
            name="Organization"
            id="Organization"
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
          <input type="checkbox" name="checkbox" id="checkbox" required />{" "}
          <span>
            I agree all statements in{" "}
            <a
              href="https://google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              terms of service
            </a>
          </span>
          .
        </p>
        <p>
          <button id="sub_btn" onClick={handleRegister} type="button">
            Register
          </button>
        </p>
      </form>
      <footer>
        <p>
          <Link to="/">Back to Homepage</Link>.
        </p>
      </footer>
    </div>
  );
}
