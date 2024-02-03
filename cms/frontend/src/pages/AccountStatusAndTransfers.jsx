import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../components/card/Card";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./dashboard/Table.scss";



const AccountStatusAndHistory = () => {
 const currentDate = new
 
  Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2,
   
  '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  const [details,setDetails] = useState()
 
  const [transferData,setTransferData]=useState({

    
    transfer_record_time:formattedDate ,
    transfer_account_from:null,
    transfer_account_to: null,
    fee_collection:null,
    transfer_by:null,
    authorized_by:null,
    transfer_amount:null,
    reason_for_transfer:null
    
  })

  const navigate = useNavigate()
  
useEffect(()=>{
const fetchAccountTypes=async()=>{

    try
    {
        const response = await axios({
            method:"get",
        baseURL:"http://localhost:8000/api",
        url:`/expense/account_types`,
        })
        console.log(response.data) 
        setDetails(response.data)
    }
    catch{
        console.log("err")
    }

}
fetchAccountTypes();
},[])

const handleInputChange = (e) =>
{
     const {name,value} = e.target;
     console.log(name,value)
     setTransferData({ ...transferData, [name]:value });
}
const handleTransfer = async(req,res) =>
{
  if(transferData.transfer_account_from === transferData.transfer_account_to && transferData.transfer_account_from !== null)
  toast.error("Sending and Receiving Accounts cannot be the same")

  else{
  
  try{
   const res =  await axios({
      method:"post",
      baseURL:"http://localhost:8000/api",
      url:`/expense/transfers`,
      data:transferData
    })
    if(res.data.error)
    toast.error(res.data.error)
    else{
    toast.success("Transfer Successfull!")
    setTimeout(() => {
      navigate("/")
      
    }, 2000);
  }
  }
  catch(error){
    
  }
}
}
    
useEffect(()=>{

  if(transferData.transfer_account_from === transferData.transfer_account_to && transferData.transfer_account_from !== null)
  {  
    
    toast.error("Sending and Receiving Accounts cannot be the same")
  }
  
},[transferData])
  return (
    <div className="add-tender">
    <ToastContainer/>
       <table className="table">
        <thead>
          <th>Account Name</th>
          <th>Account Description</th>
          <th>Initial Balance</th>
          <th>Initial Balance Set Time</th>
          <th>Current Balance</th>
          <th>Balance Update Time</th>

        </thead>
        <tbody>
        {details && details?.map((m)=>
        
          <tr>
               <td>{m.Acct_type_name}</td>
               <td>{m.Acct_type_desc}</td>
               <td>{m.initial_val}</td>
               <td>{m.initial_Val_set_time}</td>
               <td>{m.Current_Bal}</td>
               <td>{m.Current_Bal_Date}</td>

          </tr>
          )}
        </tbody>
       </table>
       <h4>Transfer</h4>
     <table className="table">
          <tbody>
          <tr>
               <td>Transfer Record Time</td>
               <td>{formattedDate}</td>  
          </tr>
          <tr>
               <td>Transfer Account From</td>
               <td>
               <select  name="transfer_account_from" onChange={e=>handleInputChange(e)}>
               <option value={null}>--select--</option>
               {details && details.map((m)=>
               <option value={m.Acct_type_id}>{m.Acct_type_name}</option>
               )}
               </select>
               </td>  
          </tr>
          <tr>
               <td>Transfer Account To</td>
               <td>
               <select name="transfer_account_to" onChange={e=>handleInputChange(e)}>
               <option value={null}>--select--</option>
               {details && details.map((m)=>
               <option value={m.Acct_type_id}>{m.Acct_type_name}</option>
               )}
              </select></td>  
          </tr>
          <tr>
               <td>Transfer Amount</td>
               <td><input type="number" onChange={e=>handleInputChange(e)} name="transfer_amount" /></td>  
          </tr>
          <tr>
               <td>Transfer By</td>
               <td><input onChange={e=>handleInputChange(e)} name="transfer_by" /></td>  
          </tr>
          <tr>
               <td>Authorized By</td>
               <td><input onChange={e=>handleInputChange(e)} name="authorized_by" /></td>  
          </tr>
          <tr>
               <td>Reason For Transfer</td>
               <td><input onChange={e=>handleInputChange(e)}  name="reason_for_transfer" /></td>  
          </tr>       
         </tbody>
         </table>
         <button className="--btn --btn-primary" onClick={handleTransfer}>Submit</button>
      {/* </Card> */}
    </div>
  );
};

export default AccountStatusAndHistory;
