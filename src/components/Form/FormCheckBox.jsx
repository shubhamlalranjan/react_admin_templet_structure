import React, { useContext } from 'react';
import FormContext from './FormContext';
import { Checkbox, FormControlLabel } from '@material-ui/core';
export default function FormField({
	name,
	label,
	checked = false,
	onChange = () => {},
	autoTouch = true,
	...other
}) {
	const FormBag = useContext(FormContext);
	const { values, setFieldValue, errors, setFieldTouched, touched } = FormBag;
	if (!touched[name] && autoTouch) {
		setFieldTouched(name, true);
	}
	const error = errors[name] ? (touched[name] ? true : false) : false;
	return (
		<FormControlLabel
			control={
				<Checkbox
					error={error}
					checked={values[name]}
					onChange={(e) => {
						const value = e.target.checked;
						console.log('checked value', value);
						setFieldValue(name, value);
						setFieldTouched(name, true);
						onChange(value, FormBag);
					}}
					{...other}
				/>
			}
			label={label}
		/>
	);
}
