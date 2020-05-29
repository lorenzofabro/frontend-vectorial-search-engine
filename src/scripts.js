const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const truncate = num => {
    return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
}

export { toBase64, truncate }