import { useState } from "react";
import { useDispatch } from "react-redux";

import SystemAuthApi from "@api/SystemAuthApi";
import FolderTree from "@components/folder/FolderTree"

const FOLDERS = [
  {
    "folderId": 0,
    "name": "Root Folder",
    "parentFolderId": null,
    "level": 0
  },
  {
    "folderId": 1,
    "name": "Folder 1 - Web Store",
    "parentFolderId": 0,
    "level": 1
  },
  {
    "folderId": 2,
    "name": "Folder 2 - Warehouse",
    "parentFolderId": 0,
    "level": 1
  },
  {
    "folderId": 3,
    "name": "Folder 3 - Merch ",
    "parentFolderId": 1,
    "level": 2
  },
  {
    "folderId": 6,
    "name": "Folder 6 - Isle A",
    "parentFolderId": 2,
    "level": 2
  },
  {
    "folderId": 4,
    "name": "Folder 4 - Shirts",
    "parentFolderId": 3,
    "level": 3
  },
  {
    "folderId": 5,
    "name": "Folder 5 - Sweatshirt",
    "parentFolderId": 3,
    "level": 3
  }
]
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
      <FolderTree folders={FOLDERS} upToFolderId={4} />
    </>
  );
};

export default LoginForm;
