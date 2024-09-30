import React from "react";
import { Card, message } from "antd";
const { Meta } = Card;
import "./ProductCard.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import emailjs from "@emailjs/browser";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { addToWishList, removeFromWishList } from "../../redux/favoritesSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fvts = useSelector((state) => state.wishlist);

  const sendEmail = async () => {
    try {
      //   "userID": 3,

      const response = await axios.post(
        "https://66c63bc2134eb8f43497236c.mockapi.io/orders",
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          userId: user.id,
        }
      );

      if (response.status === 201) {
        console.log("user email", user);
        emailjs
          .send(
            "service_ks1ih5p",
            "template_dd0gunu",
            {
              name: user.name,
              product_name: product.name,
              product_price: product.price,
              email: user.email,
            },
            {
              publicKey: "TLHqEiEOub0pZLNv3",
            }
          )
          .then(
            () => {
              Swal.fire({
                title: "Placed!",
                text: "Your order has been deleted.",
                icon: "success",
              });
            },
            (error) => {
              console.log(error);

              Swal.fire({
                title: "Sorry!",
                text: "Something went wrong.",
                icon: "error",
              });
            }
          );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = () => {
    if (user.login) {
      // Place Order
      Swal.fire({
        title: "Are you sure to place the order?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Place it!",
      }).then((result) => {
        if (result.isConfirmed) {
          sendEmail();
        }
      });
    } else {
      // Show Error
      Swal.fire({
        title: "Sorry!",
        text: "Please Login First to place the order",
        icon: "error",
      });
    }
  };

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

      console.log(response);

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

  return (
    <Card
      hoverable
      style={{
        width: 400,
      }}
      className="product-card"
      cover={<img alt="example" src={product.image} />}
    >
      {fvts.find((item) => item.productId === product.id) ? (
        <FavoriteIcon
          style={{
            color: "red",
          }}
          className="product-fvt"
          fontSize="large"
          onClick={handleRemoveFavorites}
        />
      ) : (
        <FavoriteBorderIcon
          style={{
            color: "red",
          }}
          className="product-fvt"
          fontSize="large"
          onClick={handleAddFavorites}
        />
      )}{" "}
      <Meta title={product.name} description={product.desc} />
      <p className="pricing">Only ${product.price}</p>
      <br />
      <button onClick={handlePlaceOrder}>Order Now</button>
      <button
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
      >
        View Details
      </button>
    </Card>
  );
};

export default ProductCard;
