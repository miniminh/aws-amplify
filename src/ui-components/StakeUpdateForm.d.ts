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
export declare type StakeUpdateFormInputValues = {
    name?: string;
    price?: number;
};
export declare type StakeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StakeUpdateFormOverridesProps = {
    StakeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StakeUpdateFormProps = React.PropsWithChildren<{
    overrides?: StakeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    stake?: any;
    onSubmit?: (fields: StakeUpdateFormInputValues) => StakeUpdateFormInputValues;
    onSuccess?: (fields: StakeUpdateFormInputValues) => void;
    onError?: (fields: StakeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StakeUpdateFormInputValues) => StakeUpdateFormInputValues;
    onValidate?: StakeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StakeUpdateForm(props: StakeUpdateFormProps): React.ReactElement;
