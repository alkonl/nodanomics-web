import React, {useEffect, useState} from 'react';
import {UseFormReturn} from "react-hook-form";
import {Combobox} from "@headlessui/react";
import {Button, Chip} from "@mui/material";
import {ITag} from "../../../interface";

export interface ITagsInputProps {
    name: string;
    form: UseFormReturn<any>;
    onSave: () => void
}




export const AddTagsInput: React.FC<{
    onChange: (data: ITag[]) => void,
    values: ITag[],
    onSave: () => void
}> = ({values, onChange, onSave}) => {
    const [selectedPersons, setSelectedPersons] = useState<ITag[]>([])
    const [query, setQuery] = useState('')

    const filteredTags =
        query === ''
            ? values
            : values.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })

    useEffect(() => {
        onChange(selectedPersons)
    }, [selectedPersons])

    const onChangeQueryChange = (data: ITag[]) => {
        const newItem = data[data.length - 1]
        const canAdd = selectedPersons.every(selected => {
            return selected.name !== newItem.name
        })
        if (canAdd) {
            setSelectedPersons(data)
        }
    }

    return (
        <div style={{
            width: '400px'
        }}>
            <Combobox multiple nullable value={selectedPersons} onChange={onChangeQueryChange}>
                <>
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        displayValue={(tag: ITag) => {
                                return tag.name
                        }}
                    />

                    <div>
                        <Combobox.Options as='div' static>
                            {query.length > 0 && (
                                <Combobox.Option value={{id: null, name: query}} as="div">
                                    <Button>
                                        create
                                    </Button>
                                    {query}
                                </Combobox.Option>
                            )}
                            {filteredTags.map((person) => (

                                <Combobox.Option key={person.name} value={person} as='span'>
                                    <Chip
                                        key={person.name}
                                        label={person.name}
                                        variant="outlined"
                                    />
                                </Combobox.Option>

                            ))}
                        </Combobox.Options>
                    </div>

                    <div>
                        Slected:
                        {selectedPersons.length > 0 && (
                            <div>
                                {selectedPersons.map((person) => (
                                    <Chip
                                        key={person.name}
                                        label={person.name}
                                        variant="filled"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
                <div>
                    <Button onClick={onSave}>
                        Save
                    </Button>
                </div>
            </Combobox>
        </div>
    );
}

