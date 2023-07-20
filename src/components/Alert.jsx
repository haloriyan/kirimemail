import React, { useEffect, useState } from "react";
import styles from "./styles/Alert.module.css";
import { colors } from "../config";

const Alert = ({message, setMessage, type = 'success'}) => {
    const [theColor, setTheColor] = useState(null)
    useEffect(() => {
        if (type === 'success') {
            setTheColor(colors.green);
        } else if (type === 'error') {
            setTheColor(colors.red);
        } else {
            setTheColor(colors.grey);
        }
        if (message !== null) {
            let hiding = setTimeout(() => {
                setMessage(null);
            }, 3250);

            return () => clearTimeout(hiding);
        }
    }, [message, theColor]);

    return message === null ? null :
        <div className={styles.Alert} style={{
            backgroundColor: theColor
        }}>
            {message}
        </div>
}

export default Alert;