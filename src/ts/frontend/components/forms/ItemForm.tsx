import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import ProductsApi from "@api/ProductsApi";

const ItemForm = () => {
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
        <form id="add-item-form" onSubmit={handleSubmit}>
            <label className="add-item-name" htmlFor="item-name-input">Enter Item Name</label>
            <input
                type="string"
                className="add-item-name-input"
                id="add-item-name-input"
                onChange={handleChange}
                required
            />
            <div className="add-items-top">
                <div className="add-items-quantity-container">
                    <label className="quantity-label" htmlFor="quantity">quantity</label>
                    <input
                        type="number"
                        min="0"
                        id="quantity"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="add-items-min-level-container">
                    <label className="min-level" htmlFor="min-level">min level</label>
                    <input
                        type="number"
                        min="0"
                        id="min-level"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="add-items-bot">
                <div className="add-items-price-container">
                    <label className="price" htmlFor="price">price</label>
                    <input
                        type="number"
                        min="0"
                        id="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="add-items-total-value-container">
                    <label className="total-value" htmlFor="total-value">total value</label>
                    <input
                        type="number"
                        min="0"
                        id="total-value"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="add-items-btn-container">
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}
export default ItemForm