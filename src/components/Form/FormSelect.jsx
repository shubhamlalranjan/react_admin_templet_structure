import {
	Select,
	MenuItem,
	FormControl,
	FormHelperText,
	makeStyles,
	InputLabel,
} from '@material-ui/core';
import React, { useContext } from 'react';
import FormContext from './FormContext';

const useStyles = makeStyles((theme) => ({
	formControl: {
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	error: {
		color: 'red',
	},
}));

export default function FormSelect({
	name,
	label,
	items,
	onChange = () => {},
}) {
	if (!Array.isArray(items)) {
		throw new Error('Invalid Items Passed in FormSelect');
	}
	const classes = useStyles();
	const { values, setFieldValue, errors, setFieldTouched, touched } =
		useContext(FormContext);
	const error = errors[name] ? (touched[name] ? true : false) : false;
	return (
		<FormControl
			variant="outlined"
			className={classes.formControl}
			size="small"
			fullWidth={true}
			error={error}
		>
			<InputLabel id={`${label}-label`}>{label}</InputLabel>
			<Select
				label={label}
				labelId={`${label}-label`}
				value={values[name]}
				onChange={(event) => {
					const value = event.target.value;
					setFieldValue(name, value);
					onChange(value, setFieldValue);
				}}
				onBlur={() => {
					setFieldTouched(name, true);
				}}
			>
				{items.map((item, i) => (
					<MenuItem key={i} value={item.value}>
						{item.label}
					</MenuItem>
				))}
			</Select>
			<FormHelperText id={`${name}-helper-text`}>
				{error ? errors[name] : ''}
			</FormHelperText>
		</FormControl>
	);
}
