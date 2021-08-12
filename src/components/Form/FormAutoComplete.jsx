import React, { useContext } from 'react';
import FormContext from './FormContext';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FormAutoComplete({
	name,
	label,
	items,
	variant = 'outlined',
	onChange = () => {},
	onSelect = (event, newValue, FormBag) => {
		if (newValue) {
			console.log(newValue);
			FormBag.setFieldValue(name, newValue.value);
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
	if (!Array.isArray(items)) {
		throw new Error('Invalid Items Passed in FormSelect');
	}
	const FormBag = useContext(FormContext);
	const { values, setFieldTouched } = FormBag;
	return (
		<Autocomplete
			id={name}
			variant={variant}
			size="small"
			fullWidth={true}
			options={items}
			value={values[name]}
			getOptionLabel={(o) => getOptionLabel(o, items, FormBag)}
			getOptionSelected={(o) => getOptionSelected(o, FormBag)}
			onBlur={() => setFieldTouched(name, true)}
			onChange={(event, newValue) => onSelect(event, newValue, FormBag)}
			{...other}
			renderInput={(params) => (
				<TextField {...params} label={label} variant="outlined" />
			)}
		/>
	);
}
