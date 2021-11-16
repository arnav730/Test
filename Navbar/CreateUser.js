import { React, useState, useEffect } from "react";
import { isEmpty, isEmail } from "validator";

export default function CreateUser(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  // const [userCreatedTime, setUserCreatedTime] = useState("");
  // const [loginTime, setLoginTime] = useState("");
  // const [lastLogOffTime, setLastLogOffTime] = useState("");
  const [rolesToUser, setRolesToUser] = useState([]);

  // const [rolesToUser, setRolesToUser] = useState("");

  const [passIcon, setPassIcon] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    isEmpty: false,
  });
  const [error, setError] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    userName: "",
    password: "",
    rolesToUser: "",
  });

  const handleCheckBox = (event) => {

    console.log(event.target.checked);
    let isChecked = event.target.checked;
    let selectedRole = event.target.value;

    if (isChecked) {
      setRolesToUser((prevState) => [...prevState, { roleName: selectedRole }]);

    } else {
      let newRoles = rolesToUser.filter(
        (role) => role.roleName != selectedRole
      );
      setRolesToUser(newRoles);
    }
    console.log(selectedRole);
  };
  const handleCloseBtn = () => {
    // setIsError(false);
    // setIsEmpty(false);
    setErrors({
      isError: false,
      isEmpty: false,
    });
  };

  const validateInputs = () => {
    let formError = false;
    

    if (!isEmpty(firstName)) { 
      setInputErrors((prevState) => {
        return { ...prevState, firstName: "" };
      })
    } else {
      setInputErrors((prevState) => {
        return { ...prevState, firstName: "Enter FirstName" };
      });
      console.log("Enter firstName");
      formError = true;
    }

    if (!isEmpty(lastName)) {
      setInputErrors((prevState) => {
        return { ...prevState, lastName: "" };
      })
    } else {
      setInputErrors((prevState) => {
        return { ...prevState, lastName: "Enter LastName" };
      });
      console.log("Enter lastName");
      formError = true;
    }

    if (!isEmpty(emailId)) {
      setInputErrors((prevState) => {
        return { ...prevState, emailId: "" };
      })
      if (isEmail(emailId)) {
        setInputErrors((prevState) => {
          return { ...prevState, emailId: "" };
        })
      } else {
        setInputErrors((prevState) => {
          return { ...prevState, emailId: "Enter a valid EmailId" };
        });
        console.log("Enter Valid emailID");
        formError = true;
      }
    } else {
      setInputErrors((prevState) => {
        return { ...prevState, emailId: "Enter EmailId" };
      });
      console.log("enter emailId");
      formError = true;
    }

    if (!isEmpty(userName)) {
      setInputErrors((prevState) => {
        return { ...prevState, userName: "" };
      })
      if (userName.match(/^[a-zA-Z]+[!@#$%*]?[0-9]+$/)) {
        setInputErrors((prevState) => {
          return { ...prevState, userName: "" };
        })
      } else {
        setInputErrors((prevState) => {
          return { ...prevState, userName: "Check UserName Policy" };
        });
        console.log("Check username policy");
        formError = true;
      }
    } else {
      setInputErrors((prevState) => {
        return { ...prevState, userName: "Enter UserName" };
      });
      console.log("Enter username");
      formError = true;
    }

    if (!isEmpty(password)) {
      setInputErrors(prevState=>{return {...prevState, password : ""}});
      
      if (password.match(/^[A-Z]{1,2}[a-z]+[%+_!~-]{1,2}[0-9]+$/)) {
        setInputErrors(prevState=>{return {...prevState, password : ""}});
        
      } else {
        setInputErrors(prevState=>{return {...prevState, password : "Check Password Policy"}});
        console.log("check password policy");
        formError = true;
      }
    } else {
      setInputErrors(prevState=>{return {...prevState, password : "Enter Password"}});
      console.log("enter password");
      formError = true;
    }

    if(rolesToUser.length===0){
      setInputErrors(prevState=>{return {...prevState, rolesToUser : "Please Select roles"}});
    }
    else{
      setInputErrors(prevState=>{return {...prevState, rolesToUser : ""}});
    }
    return formError;
  };

  const handleSubmit = async (event) => {
    validateInputs();
    console.log("errorrrrrrrrrrr");
    event.preventDefault();
    // setIsEmpty(false);
    // setIsError(false);
    console.log(rolesToUser);
    console.log(password);

    setErrors({
      isError: false,
      isEmpty: false,
    });
    

    if (!validateInputs()) {
      let credentials = {
        firstName,
        lastName,
        emailId,
        city,
        state,
        country,
        userName,
        password,
        rolesToUser,
      };

      // var formBody = [];

      // for (var property in credentials) {
      //   var encodedKey = encodeURIComponent(property);
      //   var encodedValue = encodeURIComponent(credentials[property]);
      //   formBody.push(encodedKey + "=" + encodedValue);
      // }
      // formBody = formBody.join("&");
      try {
        const data = await fetch(
          "http://localhost:9001/api/v1/auth/user/save",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW5kaGEwODkyIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJpc3MiOiJBVVRIX1NFUlZJQ0UiLCJleHAiOjE2MzcwNjUwMzQsImlhdCI6MTYzNzA2MTQzNH0.StZgSsI-H1m6xt7OPFsvUOsa8HccqAMwEChr8P_sq9w",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        console.log(data);
        const result = await data.json();
        console.log("Success:", result);
        if (
          data.status === 200 &&
          result.hasOwnProperty("access_token") &&
          result.hasOwnProperty("refresh_token")
        ) {
          props.history.push({ pathname: "/" });
        } else if (
          data.status === 400 &&
          result.errorMessage === "bad credentials"
        ) {
          //setIsError(true);
          setErrors((prevState) => {
            return { ...prevState, isError: true };
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // setIsError(true);
      // setIsEmpty(true);
      setError(true);
      setErrors({
        isError: true,
        isEmpty: true,
      });
    }
  };

  useEffect(() => {
    let clearIntervalId;
    if (errors.isError) {
      clearIntervalId = setTimeout(handleCloseBtn, 4000);
    }
    return () => clearInterval(clearIntervalId);
  }, [errors.isError]);

  return (
    <div>
      <div>
        <form>
          <p>Register</p>
          <div>
            <input
              type="text"
              name="FirstName"
              value={firstName}
              placeholder="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            {error && <p>{inputErrors.firstName}</p> }
            <input
              type="text"
              name="LastName"
              value={lastName}
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            {error && <p>{inputErrors.lastName}</p> }
            <input
              type="email"
              name="EmailId"
              value={emailId}
              placeholder="emailid"
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
            {error && <p>{inputErrors.emailId}</p> }
            <input
              type="text"
              name="City"
              value={city}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <input
              type="text"
              name="State"
              value={state}
              placeholder="state"
              onChange={(e) => setState(e.target.value)}
            ></input>
            <input
              type="text"
              name="country"
              value={country}
              placeholder="country"
              onChange={(e) => setCountry(e.target.value)}
            ></input><br></br>
            <input
              type="text"
              name="UserName"
              value={userName}
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            {error && <p>{inputErrors.userName}</p> }
            <input
              type={!passIcon ? "password" : "text"}
              name="Password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error && <p>{inputErrors.password}</p>}
            {password.length > 0 && (
              <i onClick={() => setPassIcon((prevState) => !prevState)}></i>
            )}
            
            <br></br>
            <input
              type="checkbox"
              name="ROLE_ADMIN"
              id="admin"
              value="admin"
              // placeholder="username"
              //onChange={(e) => setRoles(e.target.value)}
              onClick={handleCheckBox}
            ></input>
            Admin
            <input
              type="checkbox"
              name="ROLE_USER"
              id="user"
              value="user"
              // placeholder="username"
              //onChange={(e) => setRoles(e.target.value)}
              onClick={handleCheckBox}
            ></input>
            User
            {error && <p>{inputErrors.rolesToUser}</p>}
            <input type="submit" onClick={handleSubmit}></input>
          </div>
        </form>
        
      </div>
    </div>
  );
}
