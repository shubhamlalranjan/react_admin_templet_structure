function capitalizeFirstLetter(string) {
	const str = String(string);
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalizeFirstLetter };
