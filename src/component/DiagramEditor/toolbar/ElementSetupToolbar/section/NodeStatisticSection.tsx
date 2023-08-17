import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle} from "../../../../../hooks";
import {INodeData, isINodeHistory} from "../../../../../interface";
import {VariableStatisticsParameter} from "../parameter/VariableStatisticsParameter";

export const NodeStatisticSection: React.FC<{
    nodeData: INodeData
}> = ({
          nodeData
      }) => {
    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [nodeData])


    const isNodeHasHistory = isINodeHistory(nodeData)

    return (
        <>
            {isNodeHasHistory && <BaseSection
                isOpen={accordionController.isOpened}
                toggle={accordionController.toggle}
                title="Statistic"
            >

                <VariableStatisticsParameter
                    resourcesCountHistory={nodeData.history}
                />
            </BaseSection>}
        </>
    );
};
