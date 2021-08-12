export const getInitialValues = (schema, values, DefaultValue = {}) => {
	if (!values) return {};
	const initialValues = {};
	Object.keys(schema).forEach((item) => {
		initialValues[item] = values[item]
			? values[item]
			: DefaultValue[item]
			? DefaultValue[item]
			: '';
	});
	return initialValues;
};
