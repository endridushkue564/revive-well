// filename: sophisticated_code.js

// This code is a sophisticated and elaborate solution to finding the prime factors of a given number

// Function to check if a number is a prime
const isPrime = (num) => {
  if (num === 2) return true;
  if (num <= 1 || num % 2 === 0) return false;
  
  const sqrt = Math.sqrt(num);
  
  for (let i = 3; i <= sqrt; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
};

// Function to find the prime factors of a number
const findPrimeFactors = (num) => {
  let factors = [];
  
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }
  
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  
  if (num > 2) {
    factors.push(num);
  }
  
  return factors;
};

const number = 987654321;

console.log(`Finding the prime factors of ${number}:`);
console.log(findPrimeFactors(number));