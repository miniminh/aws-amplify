/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StakeCreateFormInputValues = {
    name?: string;
    price?: number;
};
export declare type StakeCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StakeCreateFormOverridesProps = {
    StakeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StakeCreateFormProps = React.PropsWithChildren<{
    overrides?: StakeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StakeCreateFormInputValues) => StakeCreateFormInputValues;
    onSuccess?: (fields: StakeCreateFormInputValues) => void;
    onError?: (fields: StakeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StakeCreateFormInputValues) => StakeCreateFormInputValues;
    onValidate?: StakeCreateFormValidationValues;
} & React.CSSProperties>;
export default function StakeCreateForm(props: StakeCreateFormProps): React.ReactElement;
