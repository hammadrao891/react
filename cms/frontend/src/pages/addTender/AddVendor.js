import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import VendorForm from "../../components/tender/vendorForm/VendorForm";

const initialState = {
  firmName: "",
  type: "",
  vendorNo: "",
  NTNNo: "",
  salesTaxNo: "",
  IBAN: "",
  contactNo: "",
  email: "",
  postalAddress: "",
  cnic: "",
  representative: "",
};

const AddVendor = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(initialState);

  // const isLoading = useSelector(selectIsLoading);

  const { firmName, type, vendorNo, NTNNo, salesTaxNo, IBAN, contactNo, email, postalAddress, cnic, representative} = vendor;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  const saveVendor = async (e) => {
    e.preventDefault();
    const vendorData={
      firmName,
      type,
      vendorNo,
      NTNNo,
      salesTaxNo,
      IBAN,
      contactNo,
      email,
      postalAddress,
      cnic,
      representative
    }
    

    console.log("Vendor data in AddVendor.js: ")
    console.log(vendorData);

    // const data = await createVendor(vendorData)
    console.log("Created vendor (AddVendor.js)")
    // console.log(data);

    navigate("/dashboard");
  };

  return (
    <div>
      {/* {isLoading && <Loader />} */}
      <h3 className="--mt">Add New Vendor</h3>
      <VendorForm
        vendor={vendor}
        handleInputChange={handleInputChange}
        saveVendor={saveVendor}
      />
    </div>
  );
};

export default AddVendor;
