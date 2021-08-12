import { Grid, Typography } from '@material-ui/core';
import React from 'react';

export default function FormHeader({ children, ...other }) {
	return (
		<Grid xs={12}>
			<Typography variant="h6" style={{ margin: '10px' }} {...other}>
				{children}
			</Typography>
		</Grid>
	);
}
