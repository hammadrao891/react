import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getTender } from "../../../redux/features/tender/tenderSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./TenderDetail.scss";
import DOMPurify from "dompurify";

const TenderDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { tender, isLoading, isError, message } = useSelector(
    (state) => state.tender
  );

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out Of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTender(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="tender-detail">
      <h3 className="--mt">Tender Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {tender && (
          <div className="detail">
            <Card cardClass="group">
              {tender?.image ? (
                <img
                  src={tender.image.filePath}
                  alt={tender.image.fileName}
                />
              ) : (
                <p>No image set for this tender</p>
              )}
            </Card>
            <h4>Tender Availability: {stockStatus(tender.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {tender.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {tender.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {tender.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {tender.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {tender.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {tender.price * tender.quantity}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(tender.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {tender.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {tender.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TenderDetail;
