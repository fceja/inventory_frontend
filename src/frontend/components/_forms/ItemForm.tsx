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
        <form id="item-form" onSubmit={handleSubmit}>
            <label className="item-name" htmlFor="item-name-input">Enter Item Name</label>
            <input
                type="string"
                className="item-name-input"
                id="item-name-input"
                onChange={handleChange}
                required
            />
            <div className="items-top">
                <div className="quantity-container">
                    <label className="quantity-label" htmlFor="quantity">quantity</label>
                    <input
                        type="number"
                        min="0"
                        id="quantity"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="min-level-container">
                    <label className="min-level" htmlFor="min-level">min level</label>
                    <input
                        type="number"
                        min="0"
                        id="min-level"
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="items-bot">
                <div className="price-container">
                    <label className="price" htmlFor="price">price</label>
                    <input
                        type="number"
                        min="0"
                        id="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="total-value-container">
                    <label className="total-value" htmlFor="total-value">total value</label>
                    <input
                        type="number"
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
    )
}
export default ItemForm