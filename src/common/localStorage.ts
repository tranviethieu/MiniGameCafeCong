export function getItemStorage(key: string) {
    const value = localStorage.getItem(key)!;
    if (value !== 'undefined') {
        return JSON.parse(value);
    } else {
        return null;
    }
}

export function setItemStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function deleteItemStorage(...keys: Array<any>) {
    keys.forEach((key) => {
        localStorage.removeItem(key);
    });
}
