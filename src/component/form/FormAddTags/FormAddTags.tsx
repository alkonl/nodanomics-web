import React from "react";
import {Controller} from "react-hook-form";
import {ITagsInputProps, AddTagsInput} from "../../input";

export const FormAddTags: React.FC<ITagsInputProps> = ({form, onSave, name}) => {

    return (
        <Controller
            render={({
                         field: {onChange, value},
                     }) => (
                <AddTagsInput values={value} onSave={onSave} onChange={onChange}/>
            )}
            control={form.control}
            name={name}
        />
    );
};
