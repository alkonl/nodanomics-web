import React from "react";
import {Box} from "@mui/material";
import NodeHierarchyPNG from "../../../../../assets/image/NodeHierarchy.png";

export const PreviewNodeHierarchy = () => {
    return (<Box sx={{
        maxWidth: '100%',
        height: '100%',
    }}><img
        style={{
            width: '100%', /* or any custom size */
            height: '100%',
            objectFit: 'contain',
        }}
        src={NodeHierarchyPNG}
        alt="NodeHierarchy"
    /></Box>)
}
