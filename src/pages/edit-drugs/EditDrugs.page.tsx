import React from "react";
import { IDrugs } from "../../types/global.typing";
import "./edit-product.scss";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";

const EditProduct: React.FC = () => {
  const [drug, setDrugs] = React.useState<Partial<IDrugs>>({
    Name: "",
    Drugs: "",
  });

  const redirect = useNavigate();
  const { id } = useParams();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDrugs({
      ...drugs,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    axios.get<IDrugs>(`${baseUrl}/${id}`).then((response) =>
      setDrugs({
        Name: response.data.Name,
        Drugs: response.data.Drugs,
      })
    );
  }, []);

  const handleSaveBtnClick = () => {
    if (drugs.Name === "" || drugs.Drugs === "") {
      alert("Enter Values");
      return;
    }
    const data: Partial<IDrugs> = {
      Drugs: drug.Drugs,
      Name: drug.Name,
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
      <h2>Edit Drugs</h2>
      <TextField
        autoComplete="off"
        label="Drugs"
        variant="outlined"
        name="brand"
        value={drug.Drugs}
        onChange={changeHandler}
      />
      <TextField
        autoComplete="off"
        label="Name"
        variant="outlined"
        name="title"
        value={drug.Name}
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
