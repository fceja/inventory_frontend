import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@store/ConfigureStore";
import Login from "@components/Login";
import ProductsApi from "@api/ProductsApi";

const InventoryTabs = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.authState);

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (content) {
      console.log(content);
    }
  }, [content]);

  const handleTabClick = () => {
    if (!authState.isAuthd) return console.log("Must be logged in.");

    const fetchData = async () => {
      const response = await ProductsApi(dispatch, authState).get();
      if (response && response.status === 200 && response.data.success) {
        setContent(response.data.products);
      }
    };
    fetchData();
  };

  return (
    <>
      <div className="tabs-container">
        <button
          className="tablinks"
          onClick={() => {
            handleTabClick();
          }}
        >
          Placeholder 1
        </button>
        <button
          className="tablinks"
          onClick={() => {
            handleTabClick();
          }}
        >
          Placeholder 2
        </button>
        <button
          className="tablinks"
          onClick={() => {
            handleTabClick();
          }}
        >
          Placeholder 3
        </button>
      </div>

      {authState.isAuthd && (
        <div id="main-authd" className="tabcontent">
          <h3>Authorized content</h3>
          <p>Authorized lorem epsum.</p>
        </div>
      )}

      <div id="main-public" className="tabcontent">
        <h3>Public content</h3>
        <p>Public lorem epsum.</p>
      </div>

      <Login />
    </>
  );
};

export default InventoryTabs;
