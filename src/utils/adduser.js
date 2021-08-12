const ParseAddressForm = (values) => {
	const detailKeys = [
		'country',

		'state',

		'district',

		'city',

		'zip_code',

		'lane_1',

		'lane_2',
	];
	const address = { native: {}, working: {} };
	detailKeys.forEach((item) => {
		address.native[item] = values[`native_${item}`];
		address.working[item] = values[`working_${item}`];
	});
	return address;
};

const AddressParserForForm = ({ native, working }) => {
	const detailKeys = [
		'country',

		'state',

		'district',

		'city',

		'zip_code',

		'lane_1',

		'lane_2',
	];
	const address = {};
	detailKeys.forEach((item) => {
		address[`native_${item}`] = native[item];
		address[`working_${item}`] = working[item];
	});
	return address;
};

export { ParseAddressForm, AddressParserForForm };
