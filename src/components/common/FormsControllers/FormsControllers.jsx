import React from 'react';
import { Field } from 'redux-form';
import styles from "./FormsControllers.module.css";

const FormControl = ({input, meta: {error, touched}, children}) => {
    const hasError = error && touched;

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder, name, validators, component, props={}, text="") => (
    <div>
        <Field placeholder={placeholder} name={name} component={component}
            validate={validators} {...props}/> {text}
    </div>
)