import React, {useEffect} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {z} from "zod";
import {validation} from "../../../utils";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAppDispatch} from "../../../redux";
import {dashboardViewsActions} from "../../../redux/store";

enum EFormFields {
    searchTerm = 'searchTerm',
}

const validationSchemaEmail = z.object({
    [EFormFields.searchTerm]: validation.searchTerm,
})

type IValidationSchemaEmail = z.infer<typeof validationSchemaEmail>;
export const DiagramSearchBar = () => {
    const dispatch = useAppDispatch()

    const form = useForm<IValidationSchemaEmail>({
        resolver: zodResolver(validationSchemaEmail),
        defaultValues: {
            [EFormFields.searchTerm]: ''
        }
    });
    const data = form.watch()
    useEffect(() => {
        dispatch(dashboardViewsActions.updateSearchQuery(data.searchTerm))
    }, [data])

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
