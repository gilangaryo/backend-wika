const convertToGMT7 = (date) => {
    const gmt7Offset = 7 * 60 * 60 * 1000; // GMT+7 offset in milliseconds
    return new Date(date.getTime() + gmt7Offset);
};

module.exports = {
    convertToGMT7
};