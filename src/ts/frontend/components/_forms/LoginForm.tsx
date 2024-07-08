import { useState } from "react";

import "@scss/components/_forms/LoginForm.scss"
import SystemAuthApi from "@api/SystemAuthApi";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await SystemAuthApi().systemLogin(formData);
    if (response && response.status === 200 && response.data.success) {
      console.log("Login successful.");
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
