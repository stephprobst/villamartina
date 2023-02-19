function calculatePrice() {
  // Get the start and end dates from the form
  const startDate = document.getElementById("start").value;
  const endDate = document.getElementById("end").value;

  // Check if both start and end dates are set
  if (!startDate || !endDate) {
    document.getElementById("ExpectedPrice").innerHTML = "";
    return;
  }

  // Convert the dates to Date objects
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Check if start and end dates are more than 356 days apart
  const oneYear = 356 * 24 * 60 * 60 * 1000; // in milliseconds
  if (endDateObj.getTime() - startDateObj.getTime() > oneYear) {
    document.getElementById("ExpectedPrice").innerHTML = "Stay must be no longer than 356 days";
    return;
  }

  // Read the prices from the JSON file
  fetch("config/prices.json")
    .then(response => response.json())
    .then(prices => {
      // Check if there are any gaps in the date range
      let currentDate = new Date(startDateObj);
      while (currentDate < endDateObj) {
        let foundPrice = false;
        for (let i = 0; i < prices.length; i++) {
          const price = prices[i];
          const priceStartDate = new Date(price.startDate);
          const priceEndDate = new Date(price.endDate);
          if (currentDate >= priceStartDate && currentDate <= priceEndDate) {
            foundPrice = true;
            break;
          }
        }
        if (!foundPrice) {
          document.getElementById("ExpectedPrice").innerHTML = "No price information available for selected date range";
          return;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Calculate the total price based on the date range and price per night
      let totalPrice = 0;
      let numberOfNights = 0;
      currentDate = new Date(startDateObj);

      while (currentDate <= endDateObj) {
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
        numberOfNights += 1
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const averagePricePerNight = (totalPrice/numberOfNights).toFixed(0)
      // Display the total price in the paragraph element
      document.getElementById("ExpectedPrice").innerHTML = `Estimated Price: ${totalPrice}€ for ${numberOfNights} nights (${averagePricePerNight}€ per night) + 80€ cleaning fee.`;
    })
    .catch(error => {
      console.error(error);
    });
}
