import React from "react";
export default class FormInput extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
    getValue: () => string;
    setValue: (value: string) => void;
    private getContainerClasses;
    private getLabelClasses;
    private getInputClasses;
    private onInput;
}
interface Props {
    label: string;
    labelOptional?: string;
    inputId: string;
    inputType?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week";
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
    disabled?: boolean;
    placeholder: string;
    defaultValue?: string;
    mask?: string;
    autocomplete?: boolean;
    mbValue?: number | string;
    fluid?: boolean;
    maxLength?: number;
    dropdownItems?: string[];
    dropdownItemsVisible?: boolean;
    error?: boolean;
    errorMessage?: string;
    onInput?: (value: string, noMask: string) => void;
    onFocusChanged?: (isActive: boolean) => void;
    onSelectedDropdownItem?: (index: number) => void;
    overrideInputSettings?: React.HTMLAttributes<HTMLInputElement>;
}
interface State {
    value: string;
}
export {};
