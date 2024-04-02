import { useState } from "react";
import { useDispatch } from "react-redux";

import SystemAuthApi from "@api/SystemAuthApi";

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await SystemAuthApi(dispatch).systemLogin(formData);
    if (response && response.status === 200 && response.data.success) {
      console.log("Login successful.");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
