import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useToggle} from "../../../../../hooks";
import {INodeData, isINodeHistory, isShowInExecutionGraphNode} from "../../../../../interface";
import {VariableStatisticsParameter} from "../parameter/VariableStatisticsParameter";
import {NodeIsShowInExecutionGraph} from "../parameter/generic";
import {Parameter} from "../../../../base";

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
                <Parameter.Container columns={9} gap={1}>
                    <>
                        {isShowInExecutionGraphNode(nodeData) && <NodeIsShowInExecutionGraph nodeData={nodeData}/>}
                    </>
                </Parameter.Container>
            </BaseSection>}
        </>
    );
};
