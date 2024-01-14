import React from 'react';
import "./NewCard.scss"
import { FaMoneyBillAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
const NewCard = ({ number, text,color }) => {
  return (
    <div className="card" style={{background:`#fefefe`}}>
      <div className="card-body">
      <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
     {text ==="Students" ? <CgProfile style={{marginTop:"1em"}}  size={40} color="#5632f0"/>
     :text ==="Expense this month" ? <FaMoneyBillAlt style={{marginTop:"1em"}}  size={40} color="#5632f0"/>
     :text === "Fee Paid Students"? <CgProfile style={{marginTop:"1em"}}  size={40} color="#5632f0"/> :
     text === "Total Amount Collected" ? <FaMoneyBillAlt style={{marginTop:"1em"}}  size={40} color="#5632f0"/>:
     text ===  "Fee Unpaid Students" && <CgProfile style={{marginTop:"1em"}}  size={40} color="#5632f0"/>
     }
      <div>
        <p style={{color:"#63606f"}}>{text}</p>
        <h4 style={{color:"#5632f0"}}>{number}</h4>
        </div> 
        </div> 
      </div>
    </div>
  );
};


export default NewCard;
