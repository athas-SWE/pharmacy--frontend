import React from "react";
import "./add-product.scss";
import { TextField, Button } from "@mui/material";
import { IDrug } from "../../types/global.typing";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/url.constant";

const AddProduct: React.FC = () => {
  const [product, setProduct] = React.useState<Partial<IProduct>>({
    Name: "",
    Drugs: "",
  });
  const redirect = useNavigate();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveBtnClick = () => {
    if (product.Name === "" || product.Drugs === "") {
      alert("Enter Values");
      return;
    }

    const data: Partial<IProduct> = {
      Drugs: product.Drugs,
      Name: product.Name,
    };
    axios
      .post(baseUrl, data)
      .then((resposne) =>
        redirect("/products", {
          state: { message: "Product Created Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };

  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <TextField
        autoComplete="off"
        label="Drugs"
        variant="outlined"
        name="brand"
        value={product.Drugs}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Name"
        variant="outlined"
        name="title"
        value={product.Name}
        onChange={changeHandler}
      />
      <div>
        <Button variant="outlined" color="primary" onClick={handleSaveBtnClick}>
          Save
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

export default AddProduct;
