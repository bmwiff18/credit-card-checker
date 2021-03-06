// main.js 
// CodeAcademy - Credit Card Checker
// Author: Bridget Wiffler

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// All invalid credit card numbers as strings
const visaInvalid1 = '4716185274232905'
const visaInvalid2 = '4929313115159474'
const visaInvalid3 = '4485014291176714499'
const discoverInvalid1 = '6011906930440492'
const discoverInvalid2 = '6011640753393237'
const discoverInvalid3 = '6011418536322138322'
const stringBatch = [visaInvalid1, visaInvalid2, visaInvalid3, discoverInvalid1, discoverInvalid2, discoverInvalid3]


// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


function stringToArray (number) {
  return number.split('').map(Number);
}
console.log(stringToArray('3436'));

// Add your functions below:
function validateCred (array) {
  let sum = 0;
  // Luhn algorithm
  // move from right to left - first digit not doubled, next doubled, next not, etc...
  for (let i = array.length-1; i >= 0; i-=1) {
    // check
    if (i % 2 == 0) {
      let doubled = array[i] * 2;
      if (doubled > 9) {
        doubled -= 9;
      }
      sum += doubled;
    } else {
      sum += array[i];
    }
  }
  if (sum % 10 == 0) {
    return true;
  } else {
    return false;
  }
}

console.log(validateCred(batch[0]));

function findInvalidCards (nested) {
  let invalidCards = []; 
  for (const array in nested) {
    if (!validateCred(array)) {
      invalidCards.push(array);
    }
  }
  return invalidCards;
}

function idInvalidCardCompanies (nestedInvalid) {
  let companies = [];
  for (let i = 0; i < nestedInvalid.length; ++i) {
    let invalidDigit = nestedInvalid[i][0];
    switch (invalidDigit) {
      case 3:
        if (companies.indexOf('Amex (American Express)') === -1) {
          companies.push('Amex (American Express)');
        }
        break;
      case 4:
        if (companies.indexOf('Visa') === -1) {
          companies.push('Visa');
        }
        break;
      case 5:
        if (companies.indexOf('Mastercard') === -1) {
          companies.push('Mastercard');
        }
        break;
      case 6:
        if (companies.indexOf('Discover') === -1) {
          companies.push('Discover');
        }
        break;
      default:
        break;
    }
  }
  if (companies.length == 0) {
    return "Company not found.";
  }
  return companies;
}

function formatCardNumber (cardNumber) {
  if (typeof(cardNumber) == 'string') {
    console.log("converting string to array...");
    return stringToArray(cardNumber)
  }
  if (Array.isArray(cardNumber)) {
    return cardNumber;
  }
  console.log('Invalid format.');
  return false;
}

function testInvalidCard (card) {
  return idInvalidCardCompanies([formatCardNumber(card)]);
}

console.log(idInvalidCardCompanies([invalid1])); // Should print['visa']
console.log(idInvalidCardCompanies([invalid2])); // Should print ['mastercard']
console.log(idInvalidCardCompanies(batch)); // Find out which companies have mailed out invalid cards
console.log(testInvalidCard(visaInvalid1)); // ['Visa']
console.log(testInvalidCard(invalid1)); // ['Visa']


