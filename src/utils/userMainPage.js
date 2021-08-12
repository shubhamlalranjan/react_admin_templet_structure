import { getAge } from "./date";
import { getHeightInFt } from "./height";
import { capitalizeFirstLetter } from "./string";
const Image = {
  male: `https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80`,
  female: `https://matrimonialimages.s3.ap-south-1.amazonaws.com/c_300_girl_avatar.jpg`,
};
const getFirstImage = (profile_pics, basic) => {
  if (!profile_pics.resized) return Image[basic.gender];
  const image = profile_pics.resized.w_300[0];
  if (image) {
    const key = image.key;
    const bucket = image.bucket ? image.bucket : "matrimonial-images";
    return `https://${bucket}.s3.ap-south-1.amazonaws.com/${key}`;
  } else {
    return "";
  }
};

const parseSingleUserBox = (data) => {
  let _id,
    phone,
    district,
    caste,
    profession,
    age,
    height,
    income,
    education,
    image;
  phone = data.contact.phone;
  district = data.address
    ? data.address.native
      ? capitalizeFirstLetter(data.address.native.district)
      : ""
    : "";
  caste = capitalizeFirstLetter(data.doctrine ? data.doctrine.caste : "");
  profession = capitalizeFirstLetter(
    data.profession ? data.profession.occupation : ""
  );
  age = data.basic ? getAge(data.basic.date_of_birth) + " yr" : "";
  height = data.appearance ? getHeightInFt(data.appearance.height) : "";
  income = data.profession ? data.profession.income : "";
  education = data.education
    ? capitalizeFirstLetter(data.education.education_level)
    : "";
  image = getFirstImage(data.profile_pics, data.basic);
  _id = data._id;

  return {
    _id,
    phone,
    district,
    caste,
    profession,
    age,
    height,
    income,
    education,
    image,
  };
};

const ParseUsersBoxData = (users) => {
  const userList = users.map((item) => parseSingleUserBox(item));
  console.log(userList);
  return userList;
};

export { ParseUsersBoxData };
