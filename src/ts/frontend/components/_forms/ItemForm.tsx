import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import ItemsApi, { ItemsModelI } from "@api/ItemsApi";

const DEFAULT_NODE_TYPE = 'item'

const convertToIntIfNumber = (name: string, value: string) => {
    if (["quantity", "price", "cost", "minLevel"].includes(name)) {
        return parseInt(value, 10);
    }
    return value;
};

const ItemForm = () => {
    const { folderId } = useSelector((state: RootState) => state.folderState);

    const [formData, setFormData] = useState<ItemsModelI>({
        cost: null,
        minLevel: null,
        name: "",
        nodeType: DEFAULT_NODE_TYPE,
        parentFolderId: folderId,
        quantity: 0,
        price: null,
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: convertToIntIfNumber(name, value)
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await ItemsApi().createItem(formData);
        if (response && response.status === 200 && response.data.success) {
            console.log("Item created.");
        }
    };

    return (
        <form id="add-item-form" onSubmit={handleSubmit}>
            <label className="add-item-name" htmlFor="item-name-input">Enter Item Name</label>
            <input
                type="string"
                name="name"
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
                        name="quantity"
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
                        name="minLevel"
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
                        name="price"
                        onChange={handleChange}
                    />
                </div>
                <div className="add-items-total-value-container">
                    <label className="cost" htmlFor="cost">cost</label>
                    <input
                        type="number"
                        min="0"
                        id="cost"
                        name="cost"
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