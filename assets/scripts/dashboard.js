const phoneDisplayElement = document.querySelector(".user-info__phone");
const storedUser = Storage.getItem('user');

const formatPhoneToPersian = (phoneNumber) => {
    if (!phoneNumber) return "";
    
    try {
        return "۰" + parseInt(phoneNumber).toLocaleString("fa-IR").replace(/٬/g, "");
    } catch (error) {
        return "- - - - - -";
    }
};

const formattedPhone = formatPhoneToPersian(storedUser?.phone);
phoneDisplayElement.textContent = formattedPhone;