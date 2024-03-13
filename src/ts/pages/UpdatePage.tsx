import "../../scss/UpdatePage.scss";

const UpdatePage = () => {
  return (
    <>
      <div className="upload-image shadow">Image container.</div>
      <div className="main-container shadow">
        <div className="item-title">Item folder</div>
        <div className="item-name">Enter Item Name</div>
        <div className="item-details">
          <div className="items-top">
            <div className="quantity-container">
              <label className="quantity-label">quantity</label>
              <input type="number" min="0" id="quantity" />
            </div>
            <div className="min-level-container">
              <label className="min-level">min level</label>
              <input type="number" min="0" id="min-level" />
            </div>
          </div>
          <div className="items-bot">
            <div className="price-container">
              <label className="price">price</label>
              <input type="number" min="0" id="price" />
            </div>
            <div className="total-container">
              <label className="total">total</label>
              <input type="number" min="0" id="total" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
