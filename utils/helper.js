function conuntAlphanumeric (retailer)  {
    return retailer.split('').filter(char =>  /^[a-zA-Z0-9]+$/.test(char)).length;
  }
  
function isRoundDollarAmount (amount) {
return amount.split('.')[1] === '00';
}

function validateReceipt(receipt) {
    const alphanumericPattern = /^[\w\s\-&]+$/;
    const pricePattern = /^\d+\.\d{2}$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!receipt) return false;

    const { retailer, purchaseDate, purchaseTime, items, total } = receipt;

    if (!retailer || !alphanumericPattern.test(retailer)) return false
    if (!purchaseDate || !datePattern.test(purchaseDate)) return false
    if (!purchaseTime || !timePattern.test(purchaseTime)) return false
    if (!items || !Array.isArray(items) || items.length < 1) return false
    for (const item of items) {
        if (!item.shortDescription || !alphanumericPattern.test(item.shortDescription)) return false
        if (!item.price || !pricePattern.test(item.price)) return false
    }
    if (!total || !pricePattern.test(total)) return false
    return true;
}
  

export default function calculatePoints (receipt) {

    try {

        if (!validateReceipt(receipt)) return -1
        console.log("validated the receipt");
        const {retailer, purchaseDate, purchaseTime, total, items} = receipt;
        let points = 0;
        points += conuntAlphanumeric(retailer);
        if (isRoundDollarAmount(total)) points += 50;
        if (parseFloat(total)*100 % 25 === 0) points += 25;
        points += Math.floor(items.length / 2) * 5;
        for (let i=0; i<items.length; i++) {
            if (items[i].shortDescription.trim().length % 3 ===0) {
                points += Math.ceil(parseFloat(items[i].price) * 0.2)
            }
        }
        const date = new Date(purchaseDate).getDate();
        if (date%2 === 1) points += 6;
        const [hour, minute] = purchaseTime.split(":");
        if (Number(hour)*60 + Number(minute) >= 14*60 && Number(hour)*60 + Number(minute) < 16*60) points += 10;

        return points;
    }
    catch (error) {
        console.error('Error calculating points:', error);
        return -1;
    }
}