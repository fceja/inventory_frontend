import { useState } from "react";

import "../../scss/UpdatePage.scss";
import Login from "../components/Login";
import { ProductApi } from "../../api/ProductApi";

const UpdatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    minLevel: "",
    price: "",
    totalValue: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("inside handle submit.");
    console.log(formData);
  };

  return (
    <>
      <div className="upload-image shadow">Image container.</div>
      <div className="main-container shadow">
        <form onSubmit={handleSubmit}>
          <div className="parent-folder">Parent folder</div>
          <div className="item-name">Enter Item Name</div>
          <input
            type="string"
            name="name"
            className="item-name-input"
            onChange={handleChange}
          />
          <div className="items-top">
            <div className="quantity-container">
              <label className="quantity-label">quantity</label>
              <input
                type="number"
                name="quantity"
                min="0"
                id="quantity"
                onChange={handleChange}
              />
            </div>
            <div className="min-level-container">
              <label className="min-level">min level</label>
              <input
                type="number"
                name="minLevel"
                min="0"
                id="min-level"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="items-bot">
            <div className="price-container">
              <label className="price">price</label>
              <input
                type="number"
                name="price"
                min="0"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div className="total-value-container">
              <label className="total-value">total value</label>
              <input
                type="number"
                name="totalValue"
                min="0"
                id="total-value"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="btn-container">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Login />
    </>
  );
};

export default UpdatePage;
