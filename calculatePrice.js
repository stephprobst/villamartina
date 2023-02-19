function calculatePrice() {
  // Get the start and end dates from the form
  const startDate = document.getElementById("start").valueAsDate;
  const endDate = document.getElementById("end").valueAsDate;

  // Check if both start and end dates are set
  if (!startDate || !endDate) {
    document.getElementById("ExpectedPrice").innerHTML = "";
    return;
  }

  // Check if start and end dates are more than 356 days apart
  const oneYear = 356 * 24 * 60 * 60 * 1000; // in milliseconds
  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  if (endDate.getTime() - startDate.getTime() > oneYear) {
    document.getElementById("ExpectedPrice").innerHTML =
      "Stay must be no longer than 356 days";
    return;
  }

  // Read the prices from the JSON file
  fetch("config/prices.json")
    .then((response) => response.json())
    .then((prices) => {
      // Check if there are any gaps in the date range
      let currentDate = new Date(startDate);
      while (currentDate.getTime() <= endDate.getTime() - oneDay) {
        let foundPrice = false;
        for (let i = 0; i < prices.length; i++) {
          const price = prices[i];
          const priceStartDate = new Date(price.startDate);
          const priceEndDate = new Date(price.endDate);
          console.log(currentDate);
          if (currentDate >= priceStartDate && currentDate <= priceEndDate) {
            foundPrice = true;
            break;
          }
        }
        if (!foundPrice) {
          document.getElementById("ExpectedPrice").innerHTML =
            "No price information available for selected date range";
          return;
        }
        currentDate.setDate(currentDate.getTime() + oneDay);
      }

      // Calculate the total price based on the date range and price per night
      let totalPrice = 0;
      let numberOfNights = 0;
      currentDate = new Date(startDate);

      while (currentDate.getTime() <= endDate.getTime() - oneDay) {
        let currentPricePerNight = 0;

        for (let i = 0; i < prices.length; i++) {
          const price = prices[i];
          const priceStartDate = new Date(price.startDate);
          const priceEndDate = new Date(price.endDate);

          if (currentDate >= priceStartDate && currentDate <= priceEndDate) {
            currentPricePerNight = price.pricePerNight;
            break;
          }
        }

        totalPrice += currentPricePerNight;
        numberOfNights += 1;
        currentDate.setDate(currentDate.getDate() + 1);
      }

      totalPrice = totalPrice.toFixed(2);
      const averagePricePerNight = (totalPrice / numberOfNights).toFixed(2);
      const VAT = (totalPrice * 0.21).toFixed(2);
      const cleaningFee = (95).toFixed(2);
      const poolHeating = (numberOfNights * 15).toFixed(2)
      // Display the total price in the paragraph element
      document.getElementById(
        "ExpectedPrice"
      ).innerHTML = `<u>Estimated Price:</u><br />${totalPrice}€ for ${numberOfNights} nights (${averagePricePerNight}€ per night)<br />+ ${VAT}€ VAT<br />+ ${cleaningFee}€ cleaning fee<br />+ ${poolHeating}€ pool heating (optional)`;
    })
    .catch((error) => {
      console.error(error);
    });
}
