export default function formatCurrency(amount, currency = 'INR') {
  let numberAmount
  if (typeof amount === 'string') {
    numberAmount = parseFloat(amount)
  } else {
    numberAmount = amount
  }

  return new Intl.NumberFormat('en-US', { style: 'currency', currency })
    .format(numberAmount)
    .replace(/(\.|,)00$/g, '')
    .replace(/,/g, '')
}
