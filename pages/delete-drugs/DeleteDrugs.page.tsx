import React from "react";
import "./delete-product.scss";

import { IMedicalDrugs } from "../../types/global.typing";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const DeleteDrugs = () => {
  const redirect = useNavigate();
  const { id } = useParams();

  const handleDeleteBtnClick = () => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then((resposne) =>
        redirect("/products", {
          state: { message: " Deleted Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };

  const handleBackBtnClick = () => {
    redirect("/medicaldrugs");
  };

  return (
    <div className="delete-drug">
      <h2>Delete</h2>
      <h4>Are You Sure You want to delete this product?</h4>

      <div>
        <Button variant="outlined" color="error" onClick={handleDeleteBtnClick}>
          Yes Delete It
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleBackBtnClick}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default DeleteDrugs;
