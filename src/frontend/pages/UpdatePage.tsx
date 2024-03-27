import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "@scss/UpdatePage.scss";
import { RootState } from "@store/ConfigureStore";
import Login from "@components/Login";
import ProductsApi from "@api/ProductsApi";

const UpdatePage = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.authState);

  const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await ProductsApi(dispatch, authState).create(formData);
    if (response && response.status === 200 && response.data.success) {
      console.log("Product created.");
    }
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
            required
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
                required
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
