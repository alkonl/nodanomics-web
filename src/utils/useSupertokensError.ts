// eslint-disable-next-line import/named
import {FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
// eslint-disable-next-line import/named
import {SerializedError} from "@reduxjs/toolkit";
import {UseFormReturn} from "react-hook-form";
import {useEffect} from "react";
import {checkSuperTokenError} from "../service/superTokens";


export const useSupertokensError = ({error, form, fields}: {
    error?:  FetchBaseQueryError | SerializedError,
    form: UseFormReturn<any>,
    fields: Record<string, unknown>
}) => {
    useEffect(() => {
        if (error && 'data' in error && checkSuperTokenError(error.data)) {
            error.data.formFields.forEach((field) => {
                if (Object.values(fields).includes(field.id)) {
                    form.setError(field.id, {
                        type: 'FIELD_ERROR',
                        message: field.error,
                    })
                }

            })
        }
    }, [error])
}