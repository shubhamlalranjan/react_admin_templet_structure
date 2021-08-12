import { getAge } from './date';
import { getHeightInFt } from './height';
import { capitalizeFirstLetter } from './string';
import { format } from 'date-fns';

export const ParserUserDetails = (userDetails) => {
	const {
		basic,
		doctrine,
		appearance,
		profession,
		education,
		lifestyle,
		family,
		contact,
		address: { native, working },
	} = userDetails;
	return {
		name:
			capitalizeFirstLetter(basic.first_name) +
			' ' +
			capitalizeFirstLetter(basic.last_name),
		age: getAge(basic.date_of_birth),
		DOB: format(new Date(basic.date_of_birth), 'dd-MM-yyyy'),
		gender: basic.gender,
		status: basic.marital_status,
		// apperence
		height: getHeightInFt(appearance.height),
		complexion: capitalizeFirstLetter(appearance.complexion),
		body_type: capitalizeFirstLetter(appearance.body_type),
		// profession
		occupation: profession.occupation
			? capitalizeFirstLetter(profession.occupation)
			: 'N/A',
		working_with: profession.working_with
			? capitalizeFirstLetter(profession.working_with)
			: 'N/A',
		organization: profession.organization
			? capitalizeFirstLetter(profession.organization)
			: 'N/A',
		income: profession.income ? profession.income : 'N/A',
		//doctrine
		religion: doctrine.religion,
		caste: doctrine.caste,
		mother_tongue: doctrine.mother_tongue,
		gotra: doctrine.gotra ? doctrine.gotra : 'N/A',
		dosh: doctrine.dosh ? doctrine.dosh : 'N/A',
		// Education
		education: education.education
			? capitalizeFirstLetter(education.education)
			: 'N/A',
		education_level: education.education_level
			? capitalizeFirstLetter(education.education_level)
			: 'N/A',
		education_stream: education.education_stream
			? capitalizeFirstLetter(education.education_stream)
			: 'N/A',
		education_alias: education.education_alias
			? capitalizeFirstLetter(education.education_alias)
			: 'N/A',
		education_field: education.education_field
			? capitalizeFirstLetter(education.education_field)
			: 'N/A',
		college: education.college
			? capitalizeFirstLetter(education.college)
			: 'N/A',
		dite: lifestyle.dite ? capitalizeFirstLetter(lifestyle.dite) : 'NA',
		drinking: lifestyle.drinking
			? capitalizeFirstLetter(lifestyle.drinking)
			: 'NA',
		smokeing: lifestyle.smokeing
			? capitalizeFirstLetter(lifestyle.smokeing)
			: 'NA',
		brothers: family.brothers,
		brothers_married: family.brothers_married,
		father_name: family.father_name
			? capitalizeFirstLetter(family.father_name)
			: 'NA',
		father_profession: family.father_profession
			? capitalizeFirstLetter(family.father_profession)
			: 'NA',

		mother_name: family.mother_name
			? capitalizeFirstLetter(family.mother_name)
			: 'NA',
		mother_profession: family.mother_profession
			? capitalizeFirstLetter(family.mother_profession)
			: 'NA',
		no_of_kids: family.no_of_kids,
		sisters: family.sisters,
		sisters_married: family.sisters_married,
		phone: `+${contact.country_code} ${contact.phone}`,
		email: contact.email,
		phone_verified: contact.phone_verified,
		email_verified: contact.email_verified,

		native_country: native.country
			? capitalizeFirstLetter(native.country)
			: 'NA',
		native_state: native.state ? capitalizeFirstLetter(native.state) : 'NA',
		native_district: native.district
			? capitalizeFirstLetter(native.district)
			: 'NA',
		native_city: native.city ? capitalizeFirstLetter(native.city) : 'NA',
		native_zip_code: native.zip_code
			? capitalizeFirstLetter(native.zip_code)
			: 'NA',
		native_lane_1: native.lane_1 ? capitalizeFirstLetter(native.lane_1) : 'NA',
		native_lane_2: native.lane_2 ? capitalizeFirstLetter(native.lane_2) : 'NA',

		// Working
		working_country: working.country
			? capitalizeFirstLetter(working.country)
			: 'NA',
		working_state: working.state ? capitalizeFirstLetter(working.state) : 'NA',
		working_district: working.district
			? capitalizeFirstLetter(working.district)
			: 'NA',
		working_city: working.city ? capitalizeFirstLetter(working.city) : 'NA',
		working_zip_code: working.zip_code
			? capitalizeFirstLetter(working.zip_code)
			: 'NA',
		working_lane_1: working.lane_1
			? capitalizeFirstLetter(working.lane_1)
			: 'NA',
		working_lane_2: working.lane_2
			? capitalizeFirstLetter(working.lane_2)
			: 'NA',
	};
};
