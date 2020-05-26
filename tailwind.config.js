const addHeights = (acc, e) => {
  acc['c-' + e] = e + 'px';
  return acc
}

const customHeights = [...Array(30).keys()]
  .map(x => x + 1)
  .map(x => x * x)
  .reduce(addHeights, {})

// console.log(customHeights)

module.exports = {
  theme: {
    extend: {
      height: {
        ...customHeights
      }
    }
  },
  variants: {},
  plugins: [],
}