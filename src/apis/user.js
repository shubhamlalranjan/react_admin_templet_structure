import https from './https';
export const AddUserApi = async (userDetails) => {
	return await https.post('/appuser/adduser', userDetails);
};

export const GetUserDetails = async (userId) => {
	return await https.get(`/appuser/userdetails/${userId}`);
};

export const GetResentUser = async (options) => {
	return await https.get(`/appuser/resentadded`, options);
};

export const GetUsersByFilter = async (options) => {
	return await https.get('/appuser/filter', options);
};

export const UploadUserImages = async (formData, options) => {
	return await https.post('/appuser/addimage', formData, options);
};

export const UpdateUserDetails = async (userId, label, data) => {
	return await https.post(`/appuser/update/${userId}`, { update: label, data });
};
