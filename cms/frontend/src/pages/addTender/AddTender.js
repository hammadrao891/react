import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TenderForm from "../../components/tender/tenderForm/TenderForm";
import { createTender } from "../../services/tenderService";
import {
  selectIsLoading,
} from "../../redux/features/tender/tenderSlice";
import axios from "axios";

const initialState = {
  year: "",
  type: "",
  subtype: "",
  otherSubType: "",
  description: "",
  tenderNo: "",
  publishedDate: "",
  publishedIn: "",
};

const AddTender = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tender, setTender] = useState(initialState);
  const [advertisement, setTenderAdvertisement] = useState("");
  const [rfp, setTenderRFP] = useState("");
  const [ppraScreenshot, setTenderPPRAScreenshot] = useState("");
  const [advertisementPreview, setAdvertisementPreview] = useState(null);
  const [RFPPreview, setRFPPreview] = useState(null);
  const [PPRAScreenshotPreview, setPPRAScreenshotPreview] = useState(null);
  // const [description, setDescription] = useState("");
  // const [file, setFile] = useState(null);

  const isLoading = useSelector(selectIsLoading);

  const { year, type, subtype, otherSubType, description, tenderNo, publishedDate, publishedIn} = tender;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTender({ ...tender, [name]: value });
  };

  const handleAdvertisementChange = (e) => {
    setTenderAdvertisement(e.target.files[0]);
    setAdvertisementPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleRFPChange = (e) => {
    setTenderRFP(e.target.files[0]);
    setRFPPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handlePPRAScreenshotChange = (e) => {
    setTenderPPRAScreenshot(e.target.files[0]);
    setPPRAScreenshotPreview(URL.createObjectURL(e.target.files[0]));
  };

  // const generateKSKU = (category) => {
  //   const letter = category.slice(0, 3).toUpperCase();
  //   const number = Date.now();
  //   const sku = letter + "-" + number;
  //   return sku;
  // };

  const saveTender = async (e) => {
    e.preventDefault();
    const tenderData={
      year,
      type,
      subtype,
      otherSubType,
      description,
      tenderNo,
      publishedDate,
      publishedIn,
  }
  if (advertisement) {
    const data = new FormData();
    const fileName =   advertisement.name;
    data.append("name", fileName);
    data.append("file", advertisement);
    tenderData.advertisement = fileName;
    console.log(tenderData);
    try {
      await axios({
        method:"post",
        baseURL:"http://localhost:5000/api/",
        url:"/upload",
        data
      });
      alert("ll")
    } catch (err) {}
  }

  if (ppraScreenshot) {
    const data = new FormData();
    const fileName =   ppraScreenshot.name;
    data.append("name", fileName);
    data.append("file", ppraScreenshot);
    tenderData.ppraScreenshot = fileName;
    console.log(tenderData);
    try {
      await axios({
        method:"post",
        baseURL:"http://localhost:5000/api/",
        url:"/upload",
        data
      });
      alert("ll")
    } catch (err) {}
  }
  if (rfp) {
    const data = new FormData();
    const fileName =   rfp.name;
    data.append("name", fileName);
    data.append("file", rfp);
    tenderData.rfp = fileName;
    console.log(tenderData);
    try {
      await axios({
        method:"post",
        baseURL:"http://localhost:5000/api/",
        url:"/upload",
        data
      });
      alert("ll")
    } catch (err) {}
  }

    console.log("Tender data in AddTender.js: ")
    console.log(tenderData);

    const data = await createTender(tenderData)
    console.log("Created tender (AddTender.js)")
    console.log(data);
    //await dispatch(createTender(tenderData));

    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Tender</h3>
      <TenderForm
        tender={tender}
        //tenderImage={tenderImage}
        advertisementPreview={advertisementPreview}
        RFPPreview={RFPPreview}
        PPRAScreenshotPreview={PPRAScreenshotPreview}
        //description={description}
        //setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleAdvertisementChange={handleAdvertisementChange}
        handleRFPChange={handleRFPChange}
        handlePPRAScreenshotChange={handlePPRAScreenshotChange}
        saveTender={saveTender}
      />
    </div>
  );
};

export default AddTender;
