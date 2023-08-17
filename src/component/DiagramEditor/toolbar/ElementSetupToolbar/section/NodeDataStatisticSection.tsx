import React, {useEffect} from 'react';
import {BaseSection} from "./BaseSection";
import {useCurrentEditElement, useToggle} from "../../../../../hooks";
import {EElementType, isINodeHistory} from "../../../../../interface";
import {VariableStatisticsParameter} from "../parameter/VariableStatisticsParameter";

export const NodeDataStatisticSection = () => {
    const selectedElementData = useCurrentEditElement()?.data
    const accordionController = useToggle()

    useEffect(() => {
        accordionController.open()
    }, [selectedElementData])


    const isNodeHasHistory = selectedElementData?.elementType === EElementType.Node &&  isINodeHistory(selectedElementData)

    return (
      <>
          {isNodeHasHistory && <BaseSection
              isOpen={accordionController.isOpened}
              toggle={accordionController.toggle}
              title="Statistic"
          >

              <VariableStatisticsParameter
                  resourcesCountHistory={selectedElementData.history}
              />
          </BaseSection>}
      </>
    );
};
