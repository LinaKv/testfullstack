import { Nullable } from 'primereact/ts-helpers';

export function isValidEmail(email: Nullable<string>) {
    return /\S+@\S+\.\S+/.test(email || '');
}
export function isValidPhoneNumber(phoneNumber: Nullable<string>) {
    if (!phoneNumber) {
        return true;
    } else {
        return /^\d{2}-\d{2}-\d{2}$/.test(phoneNumber);
    }
}
