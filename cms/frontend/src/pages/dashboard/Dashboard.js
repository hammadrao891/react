import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../../services/tenderService";
import "./Table.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Modal from "../../components/Modal/Modal";

const Dashboard = () => {
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
      setLoading(false)
    } catch (error) {
      console.log(error)
      // toast.error("Error")
  }
  
  }
  if(user.userType === "AD")
    fetchTenders();
  if(user.userType === "Store Incharge")
    fetchInventory()
  if(user.userType === "Employee")
    fetchRequisitions()

}, []);
const [isModalOpen, setModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({}); // Use this state to pass props to the modal

  const handleButtonClick = (tender) => {
    // Set the modal props here before opening the modal
    const propsForModal = {
      title: 'Your Modal Title',
      content: 'Some content to show in the modal',
      // ... other props
    };

    setModalProps(tender);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      { user.userType === "AD" ? <> <h3 className="--mt">Tenders</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading tenders. Please try again later.</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Type</th>
              <th>Subtype</th>
              <th>Other Subtype</th>
              <th>Description</th>
              <th>Tender No</th>
              <th>Published Date</th>
              <th>Published In</th>
              <th>View Tender</th>
            </tr>
          </thead>
          <tbody>
            {tenders?.map((tender) => (
              <tr key={tender._id}>
                <td>{tender.year}</td>
                <td>{tender.type}</td>
                <td>{tender.subtype}</td>
                <td>{tender.otherSubType}</td>
                <td>{tender.description}</td>
                <td>{tender.tenderNo}</td>
                <td>{tender.publishedDate}</td>
                <td>{tender.publishedIn}</td>
                <td><button onClick={()=>handleButtonClick(tender)}>View Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )} 
      </>
      :
      user.userType === "Store Incharge" ?
      <> <h3 className="--mt">Inventory</h3>
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
      </>
      :
      <> <h3 className="--mt">Requistions</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading requisitions. Please try again later.</p>}
      {!loading && !error && (
        <table className="table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Item</th>
              <th>Requested Quantity</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {requisitions?.map((requistion) => (
              <tr key={requistion._id}>
                <td>{requistion.type}</td>
                <td>{requistion.item}</td>
                <td>{requistion.quantity}</td>
                <td>{requistion.status}</td>
                <td>{requistion.description?.length > 0 ?  requistion.description : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )} 
      </>

      }
      {isModalOpen && (
        <Modal
          tender={modalProps}
          content={modalProps.content}
          onClose={closeModal}
          // ... pass other modal props
        />
      )}
    </div>
  );
};

export default Dashboard;
