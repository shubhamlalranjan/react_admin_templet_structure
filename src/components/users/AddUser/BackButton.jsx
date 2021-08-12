import { Button } from '@material-ui/core';
import React from 'react';

export default function BackButton({ label = 'Back', onClick }) {
	return <Button onClick={onClick}>{label}</Button>;
}
