// import React, { useState, useEffect, useContext } from "react";
// import { getTenders } from "../services/tenderService";
// import "./dashboard/Table.scss";
// import { AuthContext } from "../context/AuthContext";
// import axios from "axios";

// const ManageRequisition = () => {
//   const [tenders, setTenders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [inventory,setInventory] =useState()
//   const [requisitions,setRequisitons] = useState()
//   const [description,setDescription] = useState()
  
//   const {user} = useContext(AuthContext)


//   useEffect(() => {
    
//   const fetchRequisitions =async () => 
//   {
//     try {
//       const response = await axios({
//         method:"get",
//         baseURL:"http://localhost:5000/api/",
//         url:`requisitions/`,
        
//       })
//       console.log(response.data)
//       setLoading(false)
//       setRequisitons(response.data)
//     } catch (error) {
//       console.log(error)
//       // toast.error("Error")
//   }
  
//   }
//   fetchRequisitions()
// }, []);
//   const updateStatus =async (id,status) =>
//   {
//     console.log(status)
//     try {
//       const response = await axios({
//         method:"post",
//         baseURL:"http://localhost:5000/api/",
//         url:`requisitions/updateStatus/${id}`,
//         data:{status,description}
//       })
//       console.log(response.data)
//     } catch (error) {
//       console.log(error)
//       // toast.error("Error")
//   }
//   }
//   return (
//     <div>
//       <h3 className="--mt">Inventory</h3>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error loading Inventory. Please try again later.</p>}
//       {!loading && !error && (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Employee Name</th>
//               <th>Personal Number</th>
//               <th>Designation</th>
//               <th>Zone</th>
//               <th>Type</th>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Remarks (Optional)</th>
//               <th>Submit For Approval</th>

//             </tr>
//           </thead>
//           <tbody>
//             {requisitions?.map((requisition) => (
//                 <tr key={requisition._id}>
//                 <td>{requisition.name}</td>
//                 <td>{requisition.pNum}</td>
//                 <td>{requisition.des}</td>
//                 <td>{requisition.zone}</td>
//                 <td>{requisition.type}</td>
//                 <td>{requisition.item}</td>
//                 <td>{requisition.quantity}</td>
//                 <td>{requisition.status === "Submitted For Approval" || requisition.status === "Rejected"  && !requisition.description ? "-" : <input type="text" onChange={e=>setDescription(e.target.value)} placeholder="Add Reason (optional)" />}</td>
//                 <td>{
//                   requisition.status === "Submitted For Approval" ? "Submitted For Approval" : requisition.status === "Rejected" ? "Rejected" :<> 
//                   <button onClick={()=>updateStatus(requisition._id,"Submitted For Approval")}>Submit</button> <button onClick={()=>updateStatus(requisition._id,"Rejected")}>Reject</button>
//                   </>
//                   }</td>
                
//               </tr>
//             ))}
            
//           </tbody>
//         </table>
//       )} 
     
//     </div>
//   );
// };

// export default ManageRequisition;
import React, { useState, useEffect, useContext } from "react";
import { getTenders } from "../services/tenderService";
import "./dashboard/Table.scss";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const ManageRequisition = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState();
  const [requisitions, setRequisitions] = useState([]);
  const [requisitionData, setRequisitionData] = useState({}); // Object to store description for each requisition
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await axios({
          method: "get",
          baseURL: "http://localhost:5000/api/",
          url: `requisitions/`,
        });
        setLoading(false);
        setRequisitions(response.data);
      } catch (error) {
        console.log(error);
        // toast.error("Error")
      }
    };

    fetchRequisitions();
  }, []);

  const updateStatus = async (id, status) => {
    console.log(status);
    try {
      const response = await axios({
        method: "post",
        baseURL: "http://localhost:5000/api/",
        url: `requisitions/updateStatus/${id}`,
        data: { status, description: requisitionData[id]?.description || "" },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // toast.error("Error")
    }
  };

  // Update the requisitionData object with the latest description
  const handleDescriptionChange = (id, value) => {
    setRequisitionData((prevData) => ({
      ...prevData,
      [id]: { ...prevData[id], description: value },
    }));
  };

  return (
    <div>
      <h3 className="--mt">Inventory</h3>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading Inventory. Please try again later.</p>}
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
              <th>Remarks (Optional)</th>
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
                <td>
                  {requisition.status === "Submitted For Approval" || requisition.status === "Rejected" && !requisition.description ? (
                    "-"
                  ) : (
                    <input
                      type="text"
                      onChange={(e) => handleDescriptionChange(requisition._id, e.target.value)}
                      placeholder="Add Reason (optional)"
                    />
                  )}
                </td>
                <td>
                  {requisition.status === "Submitted For Approval" ? (
                    "Submitted For Approval"
                  ) : requisition.status === "Rejected" ? (
                    "Rejected"
                  ) : (
                    <>
                      <button onClick={() => updateStatus(requisition._id, "Submitted For Approval")}>Submit</button>{" "}
                      <button onClick={() => updateStatus(requisition._id, "Rejected")}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageRequisition;
