import React from 'react'
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";

const Loader = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#293331");

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    return (
        <div style={{marginTop: "200px"}}>
            <div className="sweet-loading text-center">
                <DotLoader
                    color={color}
                    loading={loading}
                    cssOverride={override}
                    size={90}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader