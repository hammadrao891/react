import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TenderForm from "../../components/tender/tenderForm/TenderForm";
import {
  getTender,
  getTenders,
  selectIsLoading,
  selectTender,
  updateTender,
} from "../../redux/features/tender/tenderSlice";

const EditTender = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const tenderEdit = useSelector(selectTender);

  const [tender, setTender] = useState(tenderEdit);
  const [tenderImage, setTenderImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getTender(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTender(tenderEdit);

    setImagePreview(
      tenderEdit && tenderEdit.image ? `${tenderEdit.image.filePath}` : null
    );

    setDescription(
      tenderEdit && tenderEdit.description ? tenderEdit.description : ""
    );
  }, [tenderEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTender({ ...tender, [name]: value });
  };

  const handleImageChange = (e) => {
    setTenderImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveTender = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", tender?.name);

    formData.append("category", tender?.category);
    formData.append("quantity", tender?.quantity);
    formData.append("price", tender?.price);
    formData.append("description", description);
    if (tenderImage) {
      formData.append("image", tenderImage);
    }

    console.log(...formData);

    await dispatch(updateTender({ id, formData }));
    await dispatch(getTenders());
    navigate("/dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Tender</h3>
      <TenderForm
        tender={tender}
        tenderImage={tenderImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveTender={saveTender}
      />
    </div>
  );
};

export default EditTender;
