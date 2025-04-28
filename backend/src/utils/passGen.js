function generatePassword(length = 12) {
    if (length < 8) {
        throw new Error("Password length must be at least 8 characters.");
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

    const passwordArray = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        digits[Math.floor(Math.random() * digits.length)],
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
    ];

    const allCharacters = lowercase + uppercase + digits + specialCharacters;
    for (let i = 4; i < length; i++) {
        passwordArray.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    const shuffledPassword = passwordArray.sort(() => 0.5 - Math.random()).join('');

    return shuffledPassword;
}
module.exports=generatePassword()