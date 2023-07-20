import React from "react";
import config from "../config";

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 h-70 flex row item-center pl-4 pr-4 bg-gold index-4">
            <h1 className="m-0 text size-20 flex grow-1">{config.app_name}</h1>
        </div>
    )
}

export default Header;