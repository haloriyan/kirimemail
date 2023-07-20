import React, { useState, useEffect } from "react";

const Initial = (name) => {
    const [initial, setInitial] = useState(null);

    useEffect(() => {
        let names = name.split(" ");
        let init = names[0][0];
        if (names.length > 1) {
            init = `${init}${names[1][0]}`;
        }
        setInitial(init);
    }, [initial]);

    return initial;
    
}

export default Initial;