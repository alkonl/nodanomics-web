import React from 'react';
import {Container, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {z} from "zod";
import {validation} from "../../../utils";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

enum EFormFields {
    searchTerm = 'searchTerm',
}

const validationSchemaEmail = z.object({
    [EFormFields.searchTerm]: validation.searchTerm,
})

type IValidationSchemaEmail = z.infer<typeof validationSchemaEmail>;
export const DiagramSearchBar = () => {

    const form = useForm<IValidationSchemaEmail>({
        resolver: zodResolver(validationSchemaEmail),
    });
    return (
        <div>
            <Controller
                render={({field: {onChange, value}}) => {
                    return (<TextField
                        id="search"
                        type="search"
                        // label="Search"
                        size="small"
                        placeholder={'Search Diagrams'}
                        value={value}
                        onChange={onChange}
                        sx={{width: 300}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )
                        }}
                    />)
                }}
                name={EFormFields.searchTerm}
                control={form.control}
            />

        </div>
    );
};
