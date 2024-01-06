import React from 'react';
import './Modal.css';

const Modal = ({ tender,onClose }) => {
    console.log(tender)
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{tender.year}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="modal-content">
          <p><strong>Created At:</strong> {tender.createdAt}</p>
          <p><strong>Description:</strong> {tender.description}</p>
          <p><strong>Other Subtype:</strong> {tender.otherSubType}</p>
          {/* <p><strong>PPRA Screenshot:</strong> {tender.ppraScreenshot}</p> */}
          <p><strong>Published Date:</strong> {tender.publishedDate}</p>
          <p><strong>Published In:</strong> {tender.publishedIn}</p>
          {/* <p><strong>RFP:</strong> {tender.rfp}</p> */}
          <p><strong>Subtype:</strong> {tender.subtype}</p>
          <p><strong>Tender No:</strong> {tender.tenderNo}</p>
          <p><strong>Type:</strong> {tender.type}</p>
          <p><strong>Updated At:</strong> {tender.updatedAt}</p>
          <p><strong>Year:</strong> {tender.year}</p>
          <table>
            <tr>
                <td> <p><strong>Advertisement:</strong></p></td>
                <td> <p><strong>PPRA Screenshot:</strong></p> </td>
                <td> <p><strong>RFP:</strong></p> </td>
            </tr>
            <tr>
                <td style={{background:tender.advertisement === "" && "#DEC158"}}>{tender.advertisement === "" ?  <div><p><strong>No file Added</strong></p></div> :<img style={{height:"15em",width:"15em"}} src={`http://localhost:5000/images/${tender.advertisement}`} />}</td>
                <td style={{background:tender.ppraScreenshot === "" && "#DEC158"}}>{tender.ppraScreenshot === "" ?  <div><p><strong>No file Added</strong></p></div> :<img style={{height:"15em",width:"15em"}} src={`http://localhost:5000/images/${tender.ppraScreenshot}`} />}</td>
                <td style={{background:tender.rfp === "" && "#DEC158"}} >{tender.rfp === "" ?  <div><p><strong>No file Added</strong></p></div> : <img style={{height:"15em",width:"15em"}} src={`http://localhost:5000/images/${tender.rfp}`} />}</td>
            </tr>
          </table>
          {/* <p>{tender.year}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
