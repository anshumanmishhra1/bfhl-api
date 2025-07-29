const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Change your personal details here
const full_name = "john_doe";
const dob = "17091999"; // ddmmyyyy
const email = "john@xyz.com";
const roll_number = "ABCD123";

function isNumber(str) {
  return /^\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function isSpecialChar(str) {
  return !isNumber(str) && !isAlphabet(str);
}

function alternatingCapsReverse(str) {
  let result = '';
  let toggle = true;
  for (let i = str.length - 1; i >= 0; i--) {
    let char = str[i];
    result += toggle ? char.toUpperCase() : char.toLowerCase();
    toggle = !toggle;
  }
  return result;
}


//creating a post request api
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let lettersForConcat = "";

    data.forEach(el => {
      if (isNumber(el)) {
        let num = parseInt(el);
        if (num % 2 === 0) {
          even_numbers.push(el);
        } else {
          odd_numbers.push(el);
        }
        sum += num;
      } else if (isAlphabet(el)) {
        alphabets.push(el.toUpperCase());
        lettersForConcat += el;
      } else {
        special_characters.push(el);
      }
    });

    const response = {
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email: email,
      roll_number: roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternatingCapsReverse(lettersForConcat)
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "Internal Server Error"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
