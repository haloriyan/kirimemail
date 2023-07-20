import React from "react";
import styles from "./styles/Button.module.css";
import { colors } from "../config";

const Button = ({children, color = 'primary', textColor = '#fff', onClick, accent = 'primary', style, height = 50, rounded = 8, disabled = false}) => {
    return (
        <button onClick={() => {
            if (!disabled) {
                onClick();
            }
        }} className={`${styles.Button} flex row centerize gap-10 grow-1`} style={{
            borderWidth: (accent === 'primary' || accent === 'secondary') ? 1 : 0,
            borderColor: colors[color],
            background: accent === 'primary' ? colors[color] : accent === 'secondary' ? "none" : accent === 'tertiary' ? `${colors[color]}30` : `${colors[color]}30`,
            color: accent === 'primary' ? "#fff" : accent === 'secondary' ? colors[color] : accent === 'tertiary' ? colors[color] : colors[color],
            flexGrow: 1,
            height: height,
            borderRadius: rounded,
            width: '100%',
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer',
            ...style
        }}>
            {children}
        </button>
    )
}

export default Button;