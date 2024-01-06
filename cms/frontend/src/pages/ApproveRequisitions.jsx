
import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ApproveRequisitions = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState();
  const [requisitions, setRequisitions] = useState([]);
  const [requisitionData, setRequisitionData] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await axios({
          method: "get",
          baseURL: "http://localhost:5000/api/",
          url: `requisitions/filtered/pending`,
        });
        setLoading(false);
        setRequisitions(response.data);
      } catch (error) {
        console.log(error);
        // toast.error("Error")
      }
    };
    const fetchInventory = async() =>
    {
      try {
        const response = await axios({
          method:"get",
          baseURL:"http://localhost:5000/api/",
          url:"inventories/",
          
        })
        console.log(response.data)
        setLoading(false)
        setInventory(response.data)
      } catch (error) {
        // toast.error("Error")
    }

  } 
    fetchInventory()  
    fetchRequisitions();
  }, []);

  const updateStatus = async (id, quantity, status,item) => {
    if (quantity === "Rejected") {
      alert("ss");
    }
    try {
      const response = await axios({
        method: "post",
        baseURL: "http://localhost:5000/api/",
        url: `requisitions/updateRequisition/${id}`,
        data: { quantity, description: requisitionData[id]?.description || "",status ,item},
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // toast.error("Error")
    }
  };

  const handleApprovedQuantityChange = (id, value) => {
    setRequisitionData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], approvedQuantity: value },
    }));
  };

  const handleDescriptionChange = (id, value) => {
    setRequisitionData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], description: value },
    }));
  };

  return (
    <div>
      <h3 className="--mt">Requisition</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading Requisition. Please try again later.</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Personal Number</th>
              <th>Designation</th>
              <th>Zone</th>
              <th>Type</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Stock In Inventory</th>
              <th>Approved Quantity</th>
              <th>Remarks</th>
              <th>Submit For Approval</th>
            </tr>
          </thead>
          <tbody>
            {requisitions?.map((requisition) => (
              <tr key={requisition._id}>
                <td>{requisition.name}</td>
                <td>{requisition.pNum}</td>
                <td>{requisition.des}</td>
                <td>{requisition.zone}</td>
                <td>{requisition.type}</td>
                <td>{requisition.item}</td>
                <td>{requisition.quantity}</td>
                {inventory.map((m)=>m.item === requisition.item && <td>{m.quantity}</td>)}     
          
                <td>
                  <input
                    type="number"
                    min={0}
                    max={requisition.quantity}
                    onChange={(e) => handleApprovedQuantityChange(requisition._id, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => handleDescriptionChange(requisition._id, e.target.value)}
                    placeholder="Add Remarks (optional)"
                  />
                </td>
                <td>
                  <button onClick={() => updateStatus(requisition._id, requisitionData[requisition._id]?.approvedQuantity, "Approved",requisition.item)}>
                    Submit
                  </button>{" "}
                  <button onClick={() => updateStatus(requisition._id, requisitionData[requisition._id]?.approvedQuantity, "Rejected",requisition.item)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApproveRequisitions;
