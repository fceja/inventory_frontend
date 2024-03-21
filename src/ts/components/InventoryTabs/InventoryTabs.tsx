import { useEffect, useState } from "react";
import Login from "../../components/Login";

import { ProductsApi } from "../../../api/ProductsApi";

const InventoryTabs = () => {
  const [content, setContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        const response = await ProductsApi.get();
        if (response && response.status === 200 && response.data.success) {
          setContent(response.data.products);
        }
      };
      fetchData();
    } else console.log("Must be logged in.");
  }, [isLoggedIn]);

  const handleClick = (number: string) => {
    setIsLoggedIn(true);
    console.log(`number -> ${number}`);
    console.log(`content -> ${content}`);
    console.log(content);
  };

  return (
    <>
      <div className="tabs-container">
        <button
          className="tablinks"
          onClick={() => {
            handleClick("1");
          }}
        >
          Placeholder 1
        </button>
        <button
          className="tablinks"
          onClick={() => {
            handleClick("2");
          }}
        >
          Placeholder 2
        </button>
        <button
          className="tablinks"
          onClick={() => {
            handleClick("3");
          }}
        >
          Placeholder 3
        </button>
      </div>

      <div id="main" className="tabcontent">
        <h3>Main content</h3>
        <p>Main lorem epsum.</p>
      </div>

      <div id="London" className="tabcontent">
        <h3>London</h3>
        <p>London is the capital city of England.</p>
      </div>

      <div id="Paris" className="tabcontent">
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div id="Tokyo" className="tabcontent">
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
      <Login />
    </>
  );
};

export default InventoryTabs;
