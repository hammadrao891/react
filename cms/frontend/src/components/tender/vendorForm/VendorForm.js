import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "../tenderForm/TenderForm.scss";

const VendorForm = ({
  vendor,
  handleInputChange,
  saveVendor,
}) => {
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
        <form onSubmit={saveVendor}>
         
          <label>Firm Name:</label>
          <input
            type="text"
            placeholder="Enter firm name"
            name="firmName"
            value={vendor?.firmName}
            onChange={handleInputChange}
          />

          <label>Type:</label>
          <select
            name="type"
            value={vendor?.type}
            onChange={handleInputChange}
          >
            <option value="Private">Private</option>
            <option value="Govt">Govt</option>
          </select>

          <label>Vendor No.:</label>
          <input
            type="text"
            placeholder="Enter Vendor No."
            name="vendorNo"
            value={vendor?.vendorNo}
            onChange={handleInputChange}
          />

          <label>CNIC:</label>
          <input
            type="text"
            placeholder="Enter CNIC"
            name="cnic"
            value={vendor?.cnic}
            onChange={handleInputChange}
          />

          <label>Contact No.:</label>
          <input
            type="text"
            placeholder="Enter Contact No."
            name="contactNo"
            value={vendor?.contactNo}
            onChange={handleInputChange}
          />

          <label>NTN No.:</label>
          <input
            type="text"
            placeholder="Enter NTN No."
            name="NTNNo"
            value={vendor?.NTNNo}
            onChange={handleInputChange}
          />

          <label>Sales Tax No.:</label>
          <input
            type="text"
            placeholder="Enter Sales Tax No."
            name="salesTaxNo"
            value={vendor?.salesTaxNo}
            onChange={handleInputChange}
          />

          <label>IBAN:</label>
          <input
            type="text"
            placeholder="Enter IBAN"
            name="IBAN"
            value={vendor?.IBAN}
            onChange={handleInputChange}
          />

          <label>Representative:</label>
          <input
            type="text"
            placeholder="Enter Representative"
            name="representative"
            value={vendor?.representative}
            onChange={handleInputChange}
          />

          <label>Email:</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={vendor?.email}
            onChange={handleInputChange}
          />

          <label>Postal Address:</label>
          <input
            type="text"
            placeholder="Enter Postal Address"
            name="postalAddress"
            value={vendor?.postalAddress}
            onChange={handleInputChange}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Vendor
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

VendorForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
VendorForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default VendorForm;
