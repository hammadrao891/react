import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import "../tenderForm/TenderForm.scss";

const AddInventory = ({
  category,
  handleInputChange,
  saveCategory,
  existingSubtypes, // 2D array of existing subtypes for different types
}) => {
  const [subtype, setSubtype] = useState("");
  const [type,setType]=useState("")
  const [data,setData]=useState()
  const [subtypeItem,setSubtypeItem] = useState()
  const[newItem,setNewItem]= useState()
  const [quantity, setQuantity] = useState()
  const [subTypeArray,setSubtypeArray]=useState()
  const [selectedItem,setSelectedItem] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    // Reset subtype when category type changes
    setSubtype("");
  }, []);

//   const handleTypeChange = (event) => {
//     const selectedType = event.target.value;
//     console.log(selectedType)
//     handleInputChange(event); // Handle the type change in the parent component

//     // No need to fetch existing subtypes since they are already provided in the props
//   };

//   const handleSubtypeChange = (event) => {
//     setSubtype(event.target.value);
//     handleInputChange(event)
//   };

  // Get the index of the selected type in the existingSubtypes array
//   const typeIndex = existingSubtypes.findIndex(
//     (subtypesForRow) => subtypesForRow[0] === category?.type
//   );

  // Filter existing subtypes based on the typed letters for the selected type,
  // excluding the selected type itself
//   const filteredSubtypes =
//     typeIndex !== -1
//       ? existingSubtypes[typeIndex]
//           .slice(1) // Exclude the selected type itself
//           .filter((existingSubtype) =>
//             existingSubtype.toLowerCase().includes(subtype.toLowerCase())
//           )
//       : [];


const uniqueTypes = Array.from(new Set(data?.map(item => item.type)));

const [selectedType, setSelectedType] = useState('');
const [filteredSubtypes, setFilteredSubtypes] = useState([]);

const handleTypeChange = (type) => {
  setSelectedType(type);
  const subtypes = data
    .filter(item => item.type === type)
    .map(item => item.subtype)
    .filter(subtype => subtype !== '');
  setFilteredSubtypes(subtypes);
};

    const handleItemSave =async(e)=>
    {
      e.preventDefault()
      console.log(selectedType)
      console.log(selectedItem)
      // console.log(newItem)
      try {
        const response = await axios({
          method:"post",
          baseURL:"http://localhost:5000/api/",
          url:"inventories/add",
          data:{
            type:selectedType,
            item:selectedItem,
            quantity:quantity
          }
        })
        toast("Success")
        navigate("/dashboard")
                
      } catch (error) {
        toast.error("Error")
      }

    }
    
      useEffect(()=>{
        const getItems=async()=>{
        try {
            const response = await axios({
              method:"get",
              baseURL:"http://localhost:5000/api/",
              url:"categories/",
            })
            // if (response.statusText === "OK") {
            //   console.log("Back in authService.js. Login successful.")
            //   toast.success("Login Successful...");
            // }
            setData(response.data);
          } catch (error) {
            
          }}
        getItems()
      },[])
      useEffect(()=>{
        console.log(data)
        // if(data && type.startsWith(type))
        // setSubtypeArray(...subTypeArray,[data.subType])

        // setSubtype(data[type]?.subtype)
        

      },[data])
      const handleSubtypeItem = (e)=>
      {
        e.preventDefault()
alert(e.target.value)
        
      }
      const handleItem = (e)=>{
        setSelectedItem(e.value)
      }
  return (
    <div className="add-tender">
      <Card cardClass={"card"}>
  <ToastContainer/>
        <form>
        <label>Select Type:</label>
      <select onChange={(e) => handleTypeChange(e.target.value)}>
        <option value="">Select</option>
        {uniqueTypes.map(type => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      {selectedType && (
        <div>
          <label>Select Item:</label>
          <select onChange={e=>handleItem(e.target)}>
            <option value="">Select</option>
            {filteredSubtypes.map(subtype => (
              <option key={subtype._id} value={subtype}>
                {subtype}
              </option>
            ))}
          </select>
        </div>
      )}
      <label>Quantity:</label>
            <input
              type="number"
              name="subtype"
              min={0}
              placeholder="Enter Quantity"
            //   value={subtype}
              onChange={e=>setQuantity(e.target.value)}
            />
            


      <div className="--my">
            <button
              type="submit"
              className="--btn --btn-primary"
            //   disabled={
            //     // Disable the button if the subtype already exists
            //     filteredSubtypes.includes(subtype)
            //   }
            onClick={handleItemSave}
            >
              Add Item
            </button>
</div>
      </form>
      </Card>
    </div>
  );
};

AddInventory.modules = {
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
AddInventory.formats = [
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

export default AddInventory;
