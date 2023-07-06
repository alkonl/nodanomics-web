import React from "react";
import {Controller, UseFormReturn} from "react-hook-form";
import {AddTagsInput} from "../../base";
import {ITag} from "../../../interface";

export interface ITagsInputProps {
    name: string;
    form: UseFormReturn<any>;
    onSave: () => void
    allTags: ITag[]
}

export const FormAddTags: React.FC<ITagsInputProps> = ({form, allTags, onSave, name}) => {

    return (
        <Controller
            render={({
                         field: {onChange, value},
                     }) => (
                <AddTagsInput allTags={allTags} selectedTags={value} onSave={onSave} onChange={onChange}/>
            )}
            control={form.control}
            name={name}
        />
    );
};
