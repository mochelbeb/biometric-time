const timeCalculation = (startDate, endDate) => {
    const timeDefference = endDate - startDate;

    const hours = Math.floor(timeDefference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDefference % (1000 * 60 * 60)) / (1000*60));

    return `${hours}h ${minutes}min`;
}

module.exports = timeCalculation;