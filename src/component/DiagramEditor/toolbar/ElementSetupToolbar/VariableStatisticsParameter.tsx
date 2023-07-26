import React, {useState} from "react";
import {Box} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {ApexOptions} from "apexcharts";

import {useWidthAndHeight} from "../../../../hooks";
import {EColor} from "../../../../constant";



const options: ApexOptions = {
    xaxis: {
        labels: {
            show: false,
        },
    },
    yaxis: {
        show: false,
    },
    colors: [EColor.darkRed],
    legend: {
        show: true,
        position: 'top',
    },
    tooltip: {
        enabled: false
    },
    chart: {
        zoom: {
            enabled: false
        },
        parentHeightOffset: 0,
        toolbar: {
            show: false
        },
        redrawOnParentResize: true,
    },
    stroke: {
        show: true,
        lineCap: 'butt',
        colors: undefined,
        width: 2,
        dashArray: 0,
    },
    grid: {
        column: {
            colors: [EColor.purple2],
        },
        borderColor: EColor.black,
        padding: {
            top: -29,
            right: 1,
            bottom: -13,
            left: 1,
        },
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: true
            }
        },
    }
}

export const VariableStatisticsParameter: React.FC<{
    points: number[]
}> = ({points}) => {

    const [series] = useState<ApexOptions["series"]>([{
        name: "resources",
        data: [0, 1, 5, 3, 4, 5, 2, 7, 8, 9]
    }])
    const {elementRef, elementSize} = useWidthAndHeight()

    return (
        <Box
            sx={{
                width: '100%',
                height: 120,
                overflow: 'hidden',
            }}
            ref={elementRef}
        >
            <ReactApexChart
                width={elementSize.width}
                height={elementSize.height}
                options={options}
                series={series}
                type="line"
            />
        </Box>
    )
}
