import { message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToWishList, removeFromWishList } from "../../redux/favoritesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();

  const [loading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();

  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fvts = useSelector((state) => state.wishlist);

  console.log(id);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://66c63bc2134eb8f43497236c.mockapi.io/products/" + id
        );
        setProduct(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  console.log(product);


  const handleAddFavorites = async () => {
    try {
      const response = await axios.post(
        "https://66c63bc2134eb8f43497236c.mockapi.io/favourites",
        {
          name: product.name,
          userId: user.id,
          productId: product.id,
        }
      );

      dispatch(
        addToWishList({
          id: response.data?.id || "",
          name: product.name,
          userId: user.id,
          productId: product.id,
        })
      );

      if (response.status === 201) {
        message.success("Added to Favorites");
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Something went Wrong");
    }
  };

  const handleRemoveFavorites = async () => {
    try {
      const IdToDelete = fvts.find((item) => item.productId === product.id);
      // API
      const response = await axios.delete(
        "https://66c63bc2134eb8f43497236c.mockapi.io/favourites/" +
          IdToDelete?.id
      );


      dispatch(removeFromWishList(product.id));

      if (response.status === 200) {
        message.success("Removed from Favorites");
      } else {
        message.error("Something went wrong!");
      }
    } catch (err) {
      console.log("Something went Wrong", err);
    }
  };

  if (loading) {
    return (
      <div className="product-spin">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="product-pic">
        <img src={product.image} />
      </div>

      <div className="product-content">
        <h1>
          <span>{product.name}</span>
          
          {fvts.find((item) => item.productId === id) ? (
            <FavoriteIcon
              style={{
                color: "red",
              }}
              fontSize="large"
              onClick={handleRemoveFavorites}
            />
          ) : (
            <FavoriteBorderIcon
              style={{
                color: "red",
              }}
              fontSize="large"
              onClick={handleAddFavorites}
            />
          )}{" "}
        </h1>
        <h3>${product.price}</h3>
        <p>{product.desc}</p>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default Product;
