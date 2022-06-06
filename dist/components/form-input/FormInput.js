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
                this.props.fluid ? "form__group_fluid" : "",
                this.props.mbValue ? `mb-${this.props.mbValue}` : ""
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
            const value = (() => {
                var sourceValue = event.currentTarget.value;
                if (this.props.inputMode === "numeric") {
                    return sourceValue.replace(/\D/g, "");
                }
                else {
                    return sourceValue;
                }
            })();
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
        var _a, _b;
        return (react_1.default.createElement("div", { className: this.getContainerClasses() },
            react_1.default.createElement("label", { className: this.getLabelClasses(), htmlFor: this.props.inputId },
                react_1.default.createElement("span", null, this.props.label),
                (() => {
                    if (this.props.labelOptional) {
                        return (react_1.default.createElement("span", { className: "ml-auto label-optional" }, this.props.labelOptional));
                    }
                })()),
            react_1.default.createElement("input", Object.assign({ id: this.props.inputId, type: this.props.inputType, inputMode: this.props.inputMode, disabled: (_a = this.props.disabled) !== null && _a !== void 0 ? _a : undefined, className: this.getInputClasses(), placeholder: this.props.placeholder, value: this.state.value, autoComplete: this.props.autocomplete ? "on" : "new-password", onInput: this.onInput, onPaste: this.onInput, onFocus: () => {
                    this.props.onFocusChanged && this.props.onFocusChanged(true);
                }, onBlur: () => {
                    this.props.onFocusChanged && this.props.onFocusChanged(false);
                } }, this.props.overrideInputSettings)),
            this.props.dropdownItems && this.props.dropdownItems.length && (react_1.default.createElement("ul", { className: "form__dropdown" }, this.props.dropdownItems.map((item, index) => (react_1.default.createElement("li", { className: "form__dropdown-item", key: item, onClick: () => {
                    this.props.onSelectedDropdownItem
                        && this.props.onSelectedDropdownItem(index);
                } }, item))))),
            this.props.error && ((_b = this.props.errorMessage) !== null && _b !== void 0 ? _b : "").length > 0 && (react_1.default.createElement("div", { className: "error-message" }, this.props.errorMessage))));
    }
}
exports.default = FormInput;
