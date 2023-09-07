import React from 'react';
import {Mention, MentionsInput} from 'react-mentions';
import {IFormulaNodeData} from "../../../../../../interface";
import {useGetVariables, useUpdateNode} from "../../../../../../hooks";
import {ElementParameter} from "../ElementParameter";

const mentionStyle = {
    control: {
        backgroundColor: '#fff',
        fontSize: 16,
        // fontWeight: 'normal',
    },

    '&multiLine': {
        control: {
            fontFamily: 'monospace',
            minHeight: 60,
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        },
        input: {
            padding: 9,
            border: '1px solid silver',
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        maxHeight: 200,
        overflowY: 'auto',
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 16,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
}


export const NodeFormulaExpressionParameter: React.FC<{
    nodeData: IFormulaNodeData
}> = ({nodeData}) => {

    const variables = useGetVariables()

    const {updateNodeData} = useUpdateNode<IFormulaNodeData>({
        nodeId: nodeData.id,
    })


    const onChangeExpression = (formula: string) => {
        updateNodeData({
            formula,
        })
    }


    return (
        <ElementParameter label="Expression">
            <MentionsInput
                value={nodeData.formula}
                onChange={(event, newValue, newPlainTextValue, mentions) => {
                    console.log({newValue, newPlainTextValue, mentions})
                    onChangeExpression(newPlainTextValue.trimStart())
                }}

                style={mentionStyle}
                a11ySuggestionsListLabel={'Suggested mentions'}
            >
                <Mention
                    trigger=""
                    data={variables}
                />
            </MentionsInput>

        </ElementParameter>
    )
};

