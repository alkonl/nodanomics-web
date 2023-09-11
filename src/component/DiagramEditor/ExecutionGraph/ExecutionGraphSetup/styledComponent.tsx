import React from "react";
import {
    ElementParameterContainer,
    ParameterCheckboxForm,
    ParameterInput,
    ParameterInputForm,
    ParametersContainer, ParameterAutocomplete, ParameterAutocompleteForm
} from "../../../base";
import {ParameterCheckbox} from "../../../base/Input/ParameterCheckbox";

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
    Input: ParameterInputForm,
    Checkbox: ParameterCheckboxForm,
    Autocomplete: ParameterAutocompleteForm,
}
