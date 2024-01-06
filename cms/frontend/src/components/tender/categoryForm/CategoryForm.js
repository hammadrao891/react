import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "../tenderForm/TenderForm.scss";

const CategoryForm = ({
  category,
  handleInputChange,
  saveCategory,
  existingSubtypes, // 2D array of existing subtypes for different types
}) => {
  const [subtype, setSubtype] = useState("");

  useEffect(() => {
    // Reset subtype when category type changes
    setSubtype("");
  }, [category?.type]);

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    console.log(selectedType)
    handleInputChange(event); // Handle the type change in the parent component

    // No need to fetch existing subtypes since they are already provided in the props
  };

  const handleSubtypeChange = (event) => {
    setSubtype(event.target.value);
    handleInputChange(event)
  };

  // Get the index of the selected type in the existingSubtypes array
  const typeIndex = existingSubtypes.findIndex(
    (subtypesForRow) => subtypesForRow[0] === category?.type
  );

  // Filter existing subtypes based on the typed letters for the selected type,
  // excluding the selected type itself
  const filteredSubtypes =
    typeIndex !== -1
      ? existingSubtypes[typeIndex]
          .slice(1) // Exclude the selected type itself
          .filter((existingSubtype) =>
            existingSubtype.toLowerCase().includes(subtype.toLowerCase())
          )
      : [];

      
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
        <form onSubmit={saveCategory}>
          <label>Type:</label>
          <select
            name="type"
            value={category?.type}
            onChange={handleTypeChange}
          >
            <option value="Forensic">Forensic</option>
            <option value="Network">Network</option>
            <option value="Stationary">Stationary</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Furniture and Fixture">Furniture and Fixture</option>
            <option value="Machinery and Equipment">Machinery and Equipment</option>
            <option value="Other Store Items">Other Store Items</option>
          </select>

          <div>
          <label>Existing Subtypes:</label>
            <div className="existingTypesBox">
              {/* Display filtered existing subtypes as options */}
              {filteredSubtypes.length > 0 ? (
                <ul>
                  {filteredSubtypes.map((filteredSubtype, index) => (
                    <li key={index}>- {filteredSubtype}</li>
                  ))}
                </ul>
              ) : (
                <ul>
                    <li>Sub-category does not exist</li>
                </ul>
              )}
            </div>

            <label>Subtype:</label>
            <input
              type="text"
              name="subtype"
              placeholder="Enter new subtype"
              value={subtype}
              onChange={handleSubtypeChange}
            />
            
          </div>

          <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
              disabled={
                // Disable the button if the subtype already exists
                filteredSubtypes.includes(subtype)
              }
            >
              Add Item
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

CategoryForm.modules = {
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
CategoryForm.formats = [
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

export default CategoryForm;
