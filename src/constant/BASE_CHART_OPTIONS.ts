import {EColor} from "./color";
import {ApexOptions} from "apexcharts";

export const BASE_CHART_OPTIONS = {
    colors: [EColor.darkRed],
    legend: {
        show: true,
        position: 'right',
    },
    tooltip: {
        enabled: true
    },
    xaxis: {
        title: {
            offsetX: 0,
            text: 'Step',
        }
    },
    chart: {
        background: EColor.grey,
        zoom: {
            enabled: true
        },
        parentHeightOffset: 0,
        toolbar: {
            show: true
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
        borderColor: `${EColor.black}`,
        xaxis: {

            lines: {
                offsetX: 1,
                offsetY: 1,
                show: true
            }
        },
    }
} satisfies ApexOptions
