import React from 'react'
import "./ProductHeader.css"

const ProductHeader = () => {
    return (
        <div>
            <header>
                <div className="overlay">
                    <h1>Healthy Snacks</h1>
                    <h3>Snack_Attack</h3>
                    <p>
                        In this store, you can find your favorite healthy snacks.
                        Snacks made with real ingredients. 
                    </p>
                    <br />
                    <button>Explore</button>
                </div>
            </header>
        </div>
    )
}

export default ProductHeader;