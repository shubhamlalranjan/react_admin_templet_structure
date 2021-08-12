import 'date-fns';
import React, { useContext } from 'react';
import FormContext from './FormContext';

import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import utils from '@date-io/date-fns';

// import DateFnsUtils from '@date-io/date-fns';
// import {
// 	MuiPickersUtilsProvider,
// 	KeyboardDatePicker,
// } from '@material-ui/pickers';
export default function FormDatePicker({ name, label }) {
	const { values, setFieldValue, errors, setFieldTouched, touched } =
		useContext(FormContext);
	const handleChange = (date) => {
		setFieldValue(name, date);
	};

	return (
		<MuiPickersUtilsProvider utils={utils}>
			<KeyboardDatePicker
				name={name}
				autoOk
				variant="inline"
				size="small"
				fullWidth={true}
				inputVariant="outlined"
				label={label}
				format="dd/MM/yyyy"
				InputAdornmentProps={{ position: 'end' }}
				value={values[name]}
				error={errors[name] ? true : false}
				helperText={errors[name] ? errors[name] : null}
				onChange={handleChange}
			/>
		</MuiPickersUtilsProvider>
	);
}
