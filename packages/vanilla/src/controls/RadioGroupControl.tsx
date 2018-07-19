/*
  The MIT License

  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import * as React from 'react';
import {
    computeLabel,
    ControlElement,
    ControlState,
    formatErrorMessage,
    isDescriptionHidden,
    isPlainLabel,
    mapDispatchToControlProps,
    mapStateToControlProps,
    resolveSchema
} from '@jsonforms/core';
import { connectToJsonForms, Control } from '@jsonforms/react';
import { VanillaControlProps } from '../index';
import { addVanillaControlProps } from '../util';

export class RadioGroupControl extends Control<VanillaControlProps, ControlState> {

    render() {
        const {
            classNames,
            id,
            label,
            required,
            description,
            errors,
            data,
            uischema,
            schema,
            visible,
        } = this.props;
        const isValid = errors.length === 0;
        const divClassNames =
            `validation  ${isValid ? classNames.description : 'validation_error'}`;
        const style: { [x: string]: any } = {};
        if (!visible) {
            style.display = 'none';
        }

        const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused);

        const options = resolveSchema(schema, (uischema as ControlElement).scope).enum;

        return (
            <div
                className={classNames.wrapper}
                hidden={!visible}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            >
                <label htmlFor={id} className={classNames.label} >
                    {computeLabel(isPlainLabel(label) ? label : label.default, required)}
                </label>

                <form>
                    {
                        options.map(optionValue =>
                            (
                                <div>
                                    <input
                                        type='radio'
                                        value={optionValue}
                                        key={optionValue}
                                        id={optionValue}
                                        name={id}
                                        checked={data === optionValue}
                                        onChange={ev =>
                                            this.handleChange(ev.currentTarget.value)
                                        }
                                    />
                                    <label htmlFor={optionValue}>{optionValue}</label>
                                </div>

                            )
                        )
                    }
                </form>
                <div className={divClassNames}>
                    {!isValid ? formatErrorMessage(errors) : showDescription ? description : null}
                </div>
            </div>
        );
    }
}

export default connectToJsonForms(
    addVanillaControlProps(mapStateToControlProps), mapDispatchToControlProps)
    (RadioGroupControl);
