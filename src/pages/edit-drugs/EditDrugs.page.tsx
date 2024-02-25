import React from "react";
import { IDrugs } from "../../types/global.typing";
import "./edit-product.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const EditProduct: React.FC = () => {
  const [product, setProduct] = React.useState<Partial<IDrugs>>({
    Name: "",
    Drugs: "",
  });

  const redirect = useNavigate();
  const { id } = useParams();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    axios.get<I>(`${baseUrl}/${id}`).then((response) =>
      setProduct({
        Name: response.data.Name,
        Drugs: response.data.Drugs,
      })
    );
  }, []);

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
      .put(`${baseUrl}/${id}`, data)
      .then((resposne) =>
        redirect("/products", {
          state: { message: "Product Updated Successfully" },
        })
      )
      .catch((error) => alert("Error"));
  };

  const handleBackBtnClick = () => {
    redirect("/products");
  };

  return (
    <div className="edit-product">
      <h2>Edit Product</h2>
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

export default EditProduct;
