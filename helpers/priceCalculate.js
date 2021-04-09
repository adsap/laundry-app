const priceCalculate = (laundry_type, weight) => {
    if (laundry_type === "dry cleaning") {
        return weight * 5000
      } else {
        return weight * 7000
      }
}

module.exports = priceCalculate