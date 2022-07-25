import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { rootName, APILIST } from "../../constent";
import Loading from "../loading/Loading";

function Products(props) {
  // console.log("propsiouuuuuuuuu", props);
  // const { _id } = useParams();
  // let id = props.index;
  // console.log(props._id, "id");

  const getProductorder = async () => {
    let result = await fetch(
      `${rootName}${APILIST?.PRODUCTORDER}/${props?._id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    if (result?.data) {
      window.location.href = result?.data;
    }
    // console.log("result", result);
  };

  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={props?.image} alt="" />
      </div>
      <div className="cocktail-footer">
        <h3>{props?.title}</h3>
        <h4>{props?.glass}</h4>
        <p>{props?.category}</p>
        <p>{`Price: ${props?.price} $`}</p>
        <div>
          <Link
            to={`/singleproduct/${props?._id}`}
            className="btn btn-dark  download-button "
          >
            Details
          </Link>
          <button
            style={{ marginLeft: "50px" }}
            onClick={getProductorder}
            className="btn btn-dark  download-button"
          >
            Order
          </button>
        </div>
      </div>
    </article>
  );
}

export default Products;
