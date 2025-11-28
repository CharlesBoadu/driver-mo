function formatMoney(
    amount,
    currencySymbol = "$",
    decimalCount = 2,
    decimalSeparator = ".",
    thousandsSeparator = ","
  ) {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) {
      // console.log("Invalid amount");
    }
  
    const formattedAmount = parsedAmount.toFixed(decimalCount);
    const parts = formattedAmount.split(".");
    const integerPart = parts[0].replace(
      /\B(?=(\d{3})+(?!\d))/g,
      thousandsSeparator
    );
    const decimalPart = parts[1] ? decimalSeparator + parts[1] : "";
  
  //   return currencySymbol + integerPart + decimalPart;
    return  integerPart + decimalPart || "0";
  }
  
  export default formatMoney;
  