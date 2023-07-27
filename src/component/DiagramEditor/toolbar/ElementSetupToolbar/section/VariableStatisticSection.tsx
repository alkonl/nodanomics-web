import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useCurrentEditElement, useToggle} from "../../../../../hooks";
import {EDiagramNode} from "../../../../../interface";
import {VariableStatisticsParameter} from "../parameter/VariableStatisticsParameter";

export const VariableStatisticSection = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const accardionController = useToggle()

    useEffect(() => {
        accardionController.open()
    }, [selectedElementData])

    if (selectedElementData?.type !== EDiagramNode.Variable) {
        throw new Error('VariableStatisticSection can be used only for Variable')
    }
    return (
        <BaseSection
            isOpen={accardionController.isOpened}
            toggle={accardionController.toggle}
            title="Statistic"
                    >
            <VariableStatisticsParameter
                max={selectedElementData.maxResources}
                min={selectedElementData.minResources}
                resourcesCountHistory={selectedElementData.resourcesCountHistory}
            />
        </BaseSection>
    );
};
