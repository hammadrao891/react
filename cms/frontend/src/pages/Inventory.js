import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Inventory = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory,setInventory] =useState()
  const [requisitions,setRequisitons] = useState()
  const {user} = useContext(AuthContext)

  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const data = await getTenders();
        setTenders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tenders:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTenders();
    const fetchInventory = async() =>
    {
      try {
        const response = await axios({
          method:"get",
          baseURL:"http://localhost:5000/api/",
          url:"inventories/",
          
        })
        console.log(response.data)
        setInventory(response.data)
      } catch (error) {
        // toast.error("Error")
    }

  } 
  fetchInventory()

  const fetchRequisitions =async () => 
  {
    try {
      const response = await axios({
        method:"get",
        baseURL:"http://localhost:5000/api/",
        url:`requisitions/${user.pNum}`,
        
      })
      console.log(response.data)
      setRequisitons(response.data)
    } catch (error) {
      console.log(error)
      // toast.error("Error")
  }
  
  }
  fetchRequisitions()
}, []);

  return (
    <div>
      <h3 className="--mt">Inventory</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading Inventory. Please try again later.</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((inventory) => (
              <tr key={inventory._id}>
                <td>{inventory.type}</td>
                <td>{inventory.item}</td>
                <td>{inventory.quantity}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )} 
     
    </div>
  );
};

export default Inventory;
