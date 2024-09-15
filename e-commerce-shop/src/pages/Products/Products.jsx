import React from "react";
import ProductHeader from "../../components/ProductHeader/ProductHeader";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./products.css";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import EmptyScreen from "../../components/EmptyScreen/EmptyScreen";
import { useEffect } from "react";
import axios from "axios";
import ProductsSkeleton from "./Skeleton";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://66c63bc2134eb8f43497236c.mockapi.io/products", 
        );
        setProducts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts(); 
  }, []); 

  const isEmpty = products.length === 0;

  return (
    <div className="products-container">
      <ProductHeader />
      <h1>All Items</h1>

      <div className="searchFilters">
        <input type="text" placeholder="Search..." value={searchText} onChange={(e)=>setSearchText(e.target.value)}/>
        <button>Search</button>
      </div>

      <div className="all-products">

        {isLoading ? ( <ProductsSkeleton noOfCards={8} />
        ) : isEmpty ? (
        
          <EmptyScreen heading={"No Data Found"}
            text={
              searchText === ""
                ? "Products are out of stock"
                : "Please try resetting your filters"
            } />
        ) : (
          <>
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
        </>
  )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
