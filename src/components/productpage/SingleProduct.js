/** @format */

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { rootName, APILIST } from "../../constent";
import Loading from "../loading/Loading";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import cogoToast from "cogo-toast";

function SingleProduct() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState([]);
  const [loading, setloading] = useState(true);

  const getCocktail = async () => {
    setloading(true);
    try {
      const response = await fetch(
        `${rootName}${APILIST.SINGLEPRODUCT}/${_id}`
      );
      const data = await response.json();
      console.log("data", data);
      if (data) {
        setProductData(data);
        setloading(false);
      } else {
        setProductData(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCocktail();
  }, [_id]);

  const deletProductFunction = async () => {
    let result = await fetch(`${rootName}${APILIST.DELETEPRODUCT}/${_id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result?.deletedCount > 0) {
      navigate("/productlist");
      cogoToast.success("Product Deleted sucessfully...");
    } else cogoToast.error("Something went worng!");
  };

  const updateProductFunction = async (_id) => {
    // console.log("_id", _id);
    getCocktail(_id);
  };

  const submit = (_id) => {
    confirmAlert({
      title: "Confirm to Delete Product",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deletProductFunction(_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  if (loading) {
    return <Loading />;
  } else {
    const { title, image, category, info, glass, description, price, _id } =
      productData;
    return (
      <section className="section cocktail-section">
        <Link to="/productlist" className="btn btn-dark btn-lg btn-details">
          back home
        </Link>
        <>
          <h2 className="section-title">{title}</h2>
          <div className="drink">
            <img src={image} alt={title}></img>
            <div className="drink-info">
              <p>
                <span className="drink-data">Name :</span> {title}
              </p>
              <p>
                <span className="drink-data">Price :</span> {`${price} $`}
              </p>
              <p>
                <span className="drink-data">Category :</span> {category}
              </p>
              <p>
                <span className="drink-data">Info :</span> {info}
              </p>
              <p>
                <span className="drink-data">Glass :</span> {glass}
              </p>
              <p>
                <span className="drink-data">Instructons :</span>
                {description}
              </p>

              <button
                style={{ marginRight: "40px" }}
                className="btn btn-dark download-button"
                type="submit"
                onClick={() => submit(_id)}
              >
                Delete
              </button>

              <Link to={`/update/${_id}`}>
                <button
                  className="btn btn-dark download-button"
                  type="submit"
                  onClick={() => updateProductFunction(_id)}
                >
                  Update
                </button>
              </Link>
            </div>
          </div>
        </>
      </section>
    );
  }
}

export default SingleProduct;
