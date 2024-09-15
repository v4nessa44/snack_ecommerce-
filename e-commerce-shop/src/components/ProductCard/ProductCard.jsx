import React from "react";
import { Card } from "antd";
const { Meta } = Card;
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 400,
        }}
        className="product-card"
        cover={
          <img
            alt="example"
            src={product.image}
          />
        }
      >
        <Meta title={product.name} description={product.desc}/>
        <p className="pricing">Only ${product.price}</p>
        <br />
        <button>Buy Now</button>
      </Card>
    </div>
  );
};

export default ProductCard;
