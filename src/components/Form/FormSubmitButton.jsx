import { Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import FormContext from './FormContext';

export default function FormSubmitButton({ label = 'Submit', ...other }) {
	const { isValid } = useContext(FormContext);

	return (
		<Button
			type="submit"
			disabled={!isValid}
			variant="contained"
			color="primary"
			{...other}
		>
			{label}
		</Button>
	);
}
