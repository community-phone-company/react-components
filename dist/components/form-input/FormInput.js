"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const inputmask_1 = __importDefault(require("inputmask"));
class FormInput extends react_1.default.Component {
    constructor(props) {
        var _a;
        super(props);
        this.getValue = () => {
            return this.state.value;
        };
        this.setValue = (value) => {
            this.setState({
                value
            });
        };
        this.getContainerClasses = () => {
            return [
                "form__group",
                "form__group_input",
                this.props.mb0 ? "mb-0" : "",
                this.props.mb16 ? "mb-16" : ""
            ].join(" ");
        };
        this.getLabelClasses = () => {
            return [
                "form__label",
                this.props.error ? "form__label_error" : ""
            ].join(" ");
        };
        this.getInputClasses = () => {
            return [
                "form__input",
                this.props.dropdownItemsVisible ? "open-dropdown" : ""
            ].join(" ");
        };
        this.onInput = (event) => {
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
                        result = result.replace(new RegExp(`[${symbol}]`, "g"), "");
                    });
                    return result;
                }
                else {
                    return value;
                }
            })();
            this.props.onInput && this.props.onInput(value, valueWithNoMask);
        };
        this.state = {
            value: (_a = this.props.defaultValue) !== null && _a !== void 0 ? _a : ""
        };
    }
    componentDidMount() {
        if (this.props.mask) {
            inputmask_1.default(this.props.mask).mask(this.props.inputId);
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: this.getContainerClasses() },
            react_1.default.createElement("label", { className: this.getLabelClasses(), htmlFor: this.props.inputId },
                react_1.default.createElement("span", null, this.props.label),
                (() => {
                    if (this.props.labelOptional) {
                        return (react_1.default.createElement("span", { className: "ml-auto label-optional" }, this.props.labelOptional));
                    }
                })()),
            react_1.default.createElement("input", { id: this.props.inputId, type: this.props.inputType, inputMode: this.props.inputMode, className: this.getInputClasses(), placeholder: this.props.placeholder, value: this.state.value, autoComplete: this.props.autocomplete ? "on" : "new-password", onInput: this.onInput, onFocus: () => {
                    this.props.onFocusChanged && this.props.onFocusChanged(true);
                }, onBlur: () => {
                    this.props.onFocusChanged && this.props.onFocusChanged(false);
                } }),
            this.props.dropdownItems && this.props.dropdownItems.length && (react_1.default.createElement("ul", { className: "form__dropdown" }, this.props.dropdownItems.map((item, index) => (react_1.default.createElement("li", { className: "form__dropdown-item", key: item, onClick: () => {
                    this.props.onSelectedDropdownItem
                        && this.props.onSelectedDropdownItem(index);
                } }, item))))),
            this.props.error && (react_1.default.createElement("div", { className: "error-message" }, this.props.errorMessage))));
    }
}
exports.default = FormInput;
