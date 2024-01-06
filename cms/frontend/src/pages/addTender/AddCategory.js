import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CategoryForm from "../../components/tender/categoryForm/CategoryForm";
import { createCategory, getCategories } from "../../services/categoryService";

const initialState = {
  type: "",
  subtype: "",
};

const AddCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);

      try {
        const fetchedCategories = await getCategories();
        console.log(fetchedCategories)
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        // Handle error as needed
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const { type, subtype } = category; // Destructure type and subtype from category
  
    const categoryData = {
      type,
      subtype,
    };
  
    console.log("Category data in AddCategory.js: ");
    console.log(categoryData);
  
    try {
      const data = await createCategory(categoryData);
      console.log("Created category (AddCategory.js)");
      console.log(data);
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating category:", error.message);
      // Handle error as needed
    }
  };

  // Organize categories into the desired format
  const organizeCategories = () => {
    const organizedSubtypes = {};

    categories.forEach((cat) => {
      const { type, subtype } = cat;
      if (!organizedSubtypes[type]) {
        organizedSubtypes[type] = [type];
      }

      organizedSubtypes[type].push(subtype);
    });

    const organizedSubtypesArray = Object.values(organizedSubtypes);
    return organizedSubtypesArray;
  };

  const existingSubtypes = organizeCategories();

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Category</h3>
      <CategoryForm
        category={category}
        handleInputChange={handleInputChange}
        saveCategory={saveCategory}
        existingSubtypes={existingSubtypes}
      />
    </div>
  );
};

export default AddCategory;
