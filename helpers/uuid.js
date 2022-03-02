// JRM: This function exports a function that generates a random string of letters and numbers to use as the note ID.
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
