import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./Products.css";

const ProductsSkeleton = ({ noOfCards = 3 }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: noOfCards }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <Skeleton variant="rectangular" width={350} height={300} />
          <div className="skeleton-content">
            <Skeleton variant="text" width={200} height={30}  />
            <Skeleton variant="text" width={250} height={20} />
            <Skeleton variant="rectangular"  width={120} height={30}  />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;
