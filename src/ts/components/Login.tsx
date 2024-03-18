import { useState } from "react";
import { SystemAuthApi } from "../../api/SystemAuthApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await SystemAuthApi.login(formData);
    if (response && response.status === 200 && response.data.success) {
      console.log("Login sucessful.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
