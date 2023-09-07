import React, {useEffect, useState} from 'react';
import {Mention, MentionsInput} from 'react-mentions';

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

const VariableAutocomplete: React.FC<{
    variables: string[];
}> = ({variables}) => {
    const [formula, setFormula] = useState<string>('')
    const formattedVariables = variables.map((variable) => {
        return {id: variable, display: ` ${variable}`}
    })
    useEffect(() => {
        console.log(formula)
    }, [formula]);
    return (
        <MentionsInput
            value={formula}
            onChange={(event, newValue, newPlainTextValue, mentions) => {
                console.log({newValue, newPlainTextValue, mentions})
                setFormula(newPlainTextValue)
            }}

            style={mentionStyle}
            a11ySuggestionsListLabel={'Suggested mentions'}
        >
            <Mention
                trigger=""
                appendSpaceOnAdd={true}
                data={formattedVariables}
            />
        </MentionsInput>
    );
};

export default VariableAutocomplete;
