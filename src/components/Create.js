import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [userErr, setUserErr] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isNumValid, setIsNumValid] = useState(true);
  const navigate = useNavigate();
  const handlerSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/users", {
        name: name,
        email: email,
        number: number,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //--------------------------Validation-----------------------
  function userHandler(e) {
    let item = e.target.value;
    if (item.length < 3) {
      setUserErr(true);
    } else {
      setUserErr(false);
    }
    setName(item);
  }
  
  function userEmail(e) {
    let emailInput = e.target.value;
    setEmail(emailInput);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(emailInput));
  }

  function userContact(e){
    let phoneNumberInput=e.target.value;
    setNumber(phoneNumberInput)
    const phoneRegex = /^\+(?:[0-9] ?){6,11}[0-9]$/;
    setIsNumValid(phoneRegex.test(phoneNumberInput));
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div>
            <Link to="/">
              <button className="btn btn-success my-3">Read Data</button>
            </Link>
          </div>
          <h1>Create Data</h1>
          <form onSubmit={handlerSubmit}>
            <div className="form-group ">
              <label>Enter Name: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                onChange={userHandler}
              />
              <div>
                {userErr ? (
                  <span className="text-danger">
                    Name must be atleast 3 characters !
                  </span>
                ) : null}
              </div>
            </div>
            <div className="form-group">
              <label>Enter Email: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                onChange={userEmail}
              />
              {!isValid && (
                <p style={{ color: "red" }}>Please enter a valid email</p>
              )}
            </div>
            <div className="form-group">
              <label>Enter No: </label>
              <input
                className="form-control"
                type="text"
                placeholder="Number"
                onChange={userContact}
              />
              {!isNumValid && (
                <p style={{ color: "red" }}>Number must starts with +91</p>
              )}
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Create;
