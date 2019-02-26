import React from 'react'

export const PointerHelper = ({
    center: [x, y],
    offset: [offsetX, offsetY] = [0, 0],
    children
}) => {
    return (
        <div
            style={{
                transform: `translateX(${x + offsetX}px) translateY(${y + offsetY}px)`,
                position: "absolute",
                pointerEvents: "none",
                top: 0,
                left: 0
            }}
        >
            <div
                style={{
                    transform: "translateX(-50%) translateY(-50%)",
                    position: "absolute",
                    left: "50%",
                    top: "50%"
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default PointerHelper
