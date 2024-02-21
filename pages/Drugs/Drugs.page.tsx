import { useState, useEffect } from "react";
import "./products.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constant";
import { IProduct } from "../../types/global.typing";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Drugs: React.FC = () => {
  const [drugs, setDrugs] = useState<IProduct[]>([]);
  const location = useLocation();
  const redirect = useNavigate();

  console.log(location);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get<IDrugs[]>(baseUrl);
      setDrugs(response.data);
      if (location?.state) {
        Swal.fire({
          icon: "success",
          title: location?.state?.message,
        });
        redirect(location.pathname, { replace: true });
      }
    } catch (error) {
      alert("An Error Happend");
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  //    console.log(products);

  const redirectToEditPage = (id: string) => {
    redirect(`/drugs/edit/${id}`);
  };

  const redirectToDeletePage = (id: string) => {
    redirect(`/drugs/delete/${id}`);
  };

  return (
    <div className="products">
      <h1>Drugs List</h1>
      {drugs.length === 0 ? (
        <h1>No Drugs</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Creation Time</th>
                <th>Update Time</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {drugs.map((drug) => (
                <tr key={drug.id}>
                  <td>{drug.name}</td>
                  <td>{drug.Drugs}</td>
                  <td>{moment(drug.createdAt).fromNow()}</td>
                  <td>{moment(drug.updatedAt).fromNow()}</td>
                  <td>
                    <Button
                      variant="outlined"
                      color="warning"
                      sx={{ mx: 3 }}
                      onClick={() => redirectToEditPage(drug.id)}
                    >
                      <Edit />
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => redirectToDeletePage(drug.id)}
                    >
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Drugs;
