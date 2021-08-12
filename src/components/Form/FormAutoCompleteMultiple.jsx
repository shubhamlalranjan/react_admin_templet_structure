import React, { useContext } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormContext from './FormContext';

export default function FormAutoCompleteMultiple({
	name,
	label,
	items,
	variant = 'outlined',
	onChange = () => {},
	onSelect = (event, newValue, FormBag) => {
		if (newValue) {
			console.log(newValue);
			if (Array.isArray(newValue)) {
				newValue.forEach((item) => {
					FormBag.setFieldValue(name, item.value);
				});
			} else {
				FormBag.setFieldValue(name, newValue.value);
			}
			onChange(newValue, FormBag.setFieldValue);
		}
	},
	getOptionSelected = (option, FormBag) => {
		return option.value === FormBag.values[name];
	},
	getOptionLabel = (option, items, FormBag) => {
		if (option.label) {
			return option.label;
		} else {
			const value = FormBag.values[name];
			let Label = value;
			items.forEach((item) => {
				if (String(item.value).toLowerCase() === String(value).toLowerCase()) {
					Label = item.label;
					return Label;
				}
			});
			return Label;
		}
	},
	...other
}) {
	const FormBag = useContext(FormContext);
	const { values, setFieldTouched } = FormBag;
	return (
		<Autocomplete
			multiple
			id="tags-outlined"
			options={items}
			getOptionLabel={(option) => getOptionLabel(option, items, FormBag)}
			value={Array.isArray(values[name]) ? [...values[name]] : values[name]}
			filterSelectedOptions
			{...other}
			onChange={(event, newValue) => onSelect(event, newValue, FormBag)}
			renderInput={(params) => (
				<TextField
					{...params}
					variant={variant}
					label={label}
					placeholder={label}
				/>
			)}
		/>
	);
}
