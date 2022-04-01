import React from "react";
import Inputmask from "inputmask";

export default class FormInput extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: this.props.defaultValue ?? ""
        };
    }

    componentDidMount() {
        if (this.props.mask) {
            Inputmask(this.props.mask).mask(this.props.inputId);
        }
    }

    render() {
        return (
            <div className={this.getContainerClasses()}>
                <label
                    className={this.getLabelClasses()}
                    htmlFor={this.props.inputId}
                >
                    <span>
                        {this.props.label}
                    </span>

                    {(() => {
                        if (this.props.labelOptional) {
                            return (
                                <span className="ml-auto label-optional">
                                    {this.props.labelOptional}
                                </span>
                            );
                        }
                    })()}
                </label>
                <input
                    id={this.props.inputId}
                    type={this.props.inputType}
                    inputMode={this.props.inputMode}
                    className={this.getInputClasses()}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    autoComplete={this.props.autocomplete ? "on" : "new-password"}
                    onInput={this.onInput}
                    onFocus={() => {
                        this.props.onFocusChanged && this.props.onFocusChanged(
                            true
                        );
                    }}
                    onBlur={() => {
                        this.props.onFocusChanged && this.props.onFocusChanged(
                            false
                        );
                    }}
                />

                {this.props.dropdownItems && this.props.dropdownItems.length && (
                    <ul className="form__dropdown">
                        {
                            this.props.dropdownItems.map((item, index) => (
                                <li
                                    className="form__dropdown-item"
                                    key={item}
                                    onClick={() => {
                                        this.props.onSelectedDropdownItem
                                            && this.props.onSelectedDropdownItem(index);
                                    }}
                                >
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                )}
                
                {this.props.error && (
                    <div className="error-message">
                        {this.props.errorMessage}
                    </div>
                )}
            </div>
        );
    }

    public getValue = () => {
        return this.state.value;
    }

    public setValue = (value: string) => {
        this.setState({
            value
        });
    }

    private getContainerClasses = () => {
        return [
            "form__group",
            "form__group_input",
            this.props.mb0 ? "mb-0" : "",
            this.props.mb16 ? "mb-16" : ""
        ].join(" ");
    }

    private getLabelClasses = () => {
        return [
            "form__label",
            this.props.error ? "form__label_error" : ""
        ].join(" ");
    }

    private getInputClasses = () => {
        return [
            "form__input",
            this.props.dropdownItemsVisible ? "open-dropdown" : ""
        ].join(" ");
    }

    private onInput = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        this.setState({
            value
        });
        const valueWithNoMask = (() => {
            if (this.props.mask) {
                var result = String(value);
                const symbolsToRemove = this.props.mask
                    .replace(/9/g, "")
                    .split("")
                    .concat(["_", " "]);
                symbolsToRemove.forEach(symbol => {
                    result = result.replace(
                        new RegExp(`[${symbol}]`, "g"),
                        ""
                    );
                });
                return result;
            } else {
                return value;
            }
        })();
        this.props.onInput && this.props.onInput(
            value,
            valueWithNoMask
        );
    }
}

interface Props {
    label: string,
    labelOptional?: string,
    inputId: string,
    inputType?: "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week",
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search",
    placeholder: string,
    defaultValue?: string,
    mask?: string,
    autocomplete?: boolean,
    mb0?: boolean,
    mb16?: boolean,
    dropdownItems?: string[],
    dropdownItemsVisible?: boolean,
    error?: boolean,
    errorMessage?: string,
    onInput?: (value: string, noMask: string) => void,
    onFocusChanged?: (isActive: boolean) => void,
    onSelectedDropdownItem?: (index: number) => void
}

interface State {
    value: string
}
