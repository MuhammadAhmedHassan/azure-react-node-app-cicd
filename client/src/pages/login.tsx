import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appAxios } from "../utils/app-axios";

function Login() {
  const navigation = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name: "email" | "password", value: string) => {
    credentials[name] = value;
    setCredentials({ ...credentials });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credentials);

    try {
      await appAxios.post("/users/login", credentials);
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='row'>
      <div className='col-4 mx-auto mt-5'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-center'>Login</h1>
          <div className='mb-3'>
            <label htmlFor='login-email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              id='login-email'
              placeholder='name@example.com'
              onChange={({ target }) => handleChange("email", target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='login-password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='login-password'
              placeholder='********'
              onChange={({ target }) => handleChange("password", target.value)}
            />
          </div>

          <button type='submit' className='btn btn-primary w-100'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;