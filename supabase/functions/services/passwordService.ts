export interface PasswordCriteria {
    length: number;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumbers: boolean;
    hasSymbols: boolean;
}

export function generatePassword({ length, hasUppercase, hasLowercase, hasNumbers, hasSymbols }: PasswordCriteria): string {
    let charset = '';
    if (hasUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (hasNumbers) charset += '0123456789';
    if (hasSymbols) charset += '!@#$%^&*()_+{}:"<>?|[];\',./`~';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return password;
}