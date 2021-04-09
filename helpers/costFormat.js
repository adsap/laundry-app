const costFormat = (cost) => {
  return cost.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}

module.exports = costFormat