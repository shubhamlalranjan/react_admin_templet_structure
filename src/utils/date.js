const getAge = (DOB) => {
	const currentYear = new Date().getFullYear();
	const dobFullYear = new Date(DOB).getFullYear();
	return currentYear - dobFullYear;
};

export { getAge };
