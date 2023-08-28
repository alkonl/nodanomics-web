import React from "react";
import {ElementParameterContainer, ParameterInput, ParametersContainer} from "../../../base";

const StyledParametersContainer: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <ParametersContainer columns={9} gap={1}>
            {children}
        </ParametersContainer>
    )
}

const StyledParameterElement: React.FC<{
    label: string,
    children: React.ReactNode
}> = ({
          children,
          label,
      }) => {
    return (
        <ElementParameterContainer
            label={label}
            firstSize={2}
            secondSize={6.5}
        >
            {children}
        </ElementParameterContainer>
    )
}


export const ParameterExecutionGraphSetup = {
    Container: StyledParametersContainer,
    Element: StyledParameterElement,
    Input: ParameterInput,
}
