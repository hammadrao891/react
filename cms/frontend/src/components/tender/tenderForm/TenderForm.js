import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./TenderForm.scss";

const TenderForm = ({
  tender,
  //tenderImage,
  advertisementPreview,
  //imagePreview,
  RFPPreview,
  PPRAScreenshotPreview,
  //description,
  //setDescription,
  handleInputChange,
  handleAdvertisementChange,
  handleRFPChange,
  handlePPRAScreenshotChange,
  //handleImageChange,
  saveTender,
}) => {
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
        <form onSubmit={saveTender}>
         
          <label>Year:</label>
          <input
            type="text"
            placeholder="Enter year"
            name="year"
            value={tender?.year}
            onChange={handleInputChange}
          />

          <label>Type:</label>
          <select
            name="type"
            value={tender?.type}
            onChange={handleInputChange}
          >
            <option value="Regular">Regular</option>
            <option value="Project">Project</option>
            <option value="Budget ID">Budget ID</option>
          </select>

          {tender?.type === "Project" && (
            <>
              <label>Sub-type:</label>
              <select
                name="subtype"
                value={tender?.subtype}
                onChange={handleInputChange}
              >
                <option value="NR3C Phase-I">NR3C Phase-I</option>
                <option value="NR3C Phase-II">NR3C Phase-II</option>
                <option value="NR3C Phase-III">NR3C Phase-III</option>
                <option value="Revamping of CCW (RCCW)">Revamping of CCW (RCCW)</option>
                <option value="Other">Other</option>
              </select>

              {tender?.subtype === "Other" && (
                <>
                  <label>Other Sub-type:</label>
                  <input
                    type="text"
                    placeholder="Enter Other Sub-type"
                    name="otherSubType"
                    value={tender?.otherSubType}
                    onChange={handleInputChange}
                  />
                </>
              )}
            </>
          )}

          <label>Tender Description:</label>
          <input
            type="text"
            placeholder="Enter tender description"
            name="description"
            value={tender?.description}
            onChange={handleInputChange}
          />

          <label>Tender No.:</label>
          <input
            type="text"
            placeholder="Enter tender no."
            name="tenderNo"
            value={tender?.tenderNo}
            onChange={handleInputChange}
          />

          

          <label>Published Date:</label>
          <input
            type="date"
            // placeholder="Tender Quantity"
            name="publishedDate"
            value={tender?.publishedDate}
            onChange={handleInputChange}
          />

          <label>Published In:</label>
          <input
            type="text"
            placeholder="Enter Newspapers"
            name="publishedIn"
            value={tender?.publishedIn}
            onChange={handleInputChange}
          />
         <Card cardClass={"group"}>
            <label>Advertisement:</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="advertisement"
              onChange={(e) => handleAdvertisementChange(e)}
            />

            {advertisementPreview != null ? (
              <div className="image-preview">
                <img src={advertisementPreview} alt="advertisement" />
              </div>
            ) : (
              <p>No image set.</p>
            )}
          </Card>
          <Card cardClass={"group"}>
            <label>RFP:</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="rfp"
              onChange={(e) => handleRFPChange(e)}
            />

            {RFPPreview != null ? (
              <div className="image-preview">
                <img src={RFPPreview} alt="RFP" />
              </div>
            ) : (
              <p>No image set.</p>
            )}
          </Card>
          <Card cardClass={"group"}>
            <label>PPRA Screenshot:</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="ppraScreenshot"
              onChange={(e) => handlePPRAScreenshotChange(e)}
            />

            {PPRAScreenshotPreview != null ? (
              <div className="image-preview">
                <img src={PPRAScreenshotPreview} alt="PPRA Screenshot" />
              </div>
            ) : (
              <p>No image set.</p>
            )}
          </Card>
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Tender
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

TenderForm.modules = {
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
TenderForm.formats = [
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

export default TenderForm;
