const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const full_name = "john_doe";
const dob = "17091999"; 
const email = "john@xyz.com";
const roll_number = "ABCD123";

/*adding any random number */
function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecialChar(str) {
  return !isNumber(str) && !isAlphabet(str);
}



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
