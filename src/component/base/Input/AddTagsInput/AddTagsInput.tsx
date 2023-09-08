import React, {useMemo, useState} from 'react';
import {Combobox} from "@headlessui/react";
import {Button, Chip} from "@mui/material";
import {ITag} from "../../../../interface";


export const AddTagsInput: React.FC<{
    onChange: (data: ITag[]) => void,
    selectedTags?: ITag[],
    allTags: ITag[],
    onSave: () => void
}> = ({allTags, onChange, onSave, selectedTags = []}) => {
    const [query, setQuery] = useState('')

    const filteredTags = useMemo(() => {

        if (query === '') {
            return allTags.filter(tag => {
                return selectedTags.every(selected => {
                    return selected.name !== tag.name
                })
            })
        } else {
            return allTags.filter((tag) => {
                return tag.name.toLowerCase().includes(query.toLowerCase())
            }).filter(tag => {
                return selectedTags.every(selected => {
                    return selected.name !== tag.name
                })
            })
        }
    }, [query, allTags])


    const onChangeQueryChange = (data: ITag[]) => {
        const newItem = data[data.length - 1]
        const canAdd = selectedTags.every(selected => {
            return selected.name !== newItem.name
        })
        if (canAdd) {
            onChange(data)
        }
    }

    const onDelete = (tag: Omit<ITag, 'id'>) => {
        onChange(selectedTags.filter(selected => {
            return selected.name !== tag.name
        }))
    }

    return (
        <div style={{
            width: '400px'
        }}>
            <Combobox multiple nullable value={selectedTags} onChange={onChangeQueryChange}>
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(tag: ITag) => {
                        return tag.name
                    }}
                />

                <div>
                    <Combobox.Options as='div' static>
                        {query.length > 0 && (
                            <Combobox.Option value={{name: query}} as="div">
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
                    <Button onClick={onSave}>
                        Save
                    </Button>
                </div>
            </Combobox>
        </div>
    );
}

