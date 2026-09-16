export const generateUsername = (firstName, lastName) => {
    const first = firstName.toLowerCase().replace(/[^a-z]/g, "");
    const last = lastName.toLowerCase().replace(/[^a-z]/g, "");

    const randomNumber = Math.floor(10 + Math.random() * 90);

    return `${first}${last}${randomNumber}`;
};