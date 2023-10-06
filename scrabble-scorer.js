// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
}

 function transform(oldPointObj) {
   let newPointObj = {};
   for (const pointValue in oldPointObj) {
      for (let index in oldPointObj[pointValue]) {
         newPointObj[oldPointObj[pointValue][index].toLowerCase()] = Number(pointValue);
      }
   }
   return newPointObj;
 };
 
let newPointStructure = transform(oldPointStructure);
 
function simpleScorer(word) {
   return Number(word.length);
 }

let vowels = "AEIOU"; // and Sometimes Y
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let score = 0;
   for (char in word) {
      if (vowels.includes(word[char])) {
         score += 3;
      } else score += 1;
   }
   return score;
}

function scrabbleScorer(word) {
   let score = 0;
   for (let index in word) {
      letter = word[index];
      score += Number(newPointStructure[letter]);
   }
   return score;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. EXCEPT you can't name the variables the same name as the function which is what the instructions lead you to believe. so you DO have to rename these variables.//

let simple = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonus = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simple, vowelBonus, scrabble];

function initialPrompt() {

   let word = input.question("Let's play some scrabble! \n\nEnter a word to score: ");
   
   return word;
};

function scorerPrompt() {
   let scoreChoice = Number(input.question("\nWhich scoring algorithm would you like to use? \n0- Simple: One point per character \n1- Vowel Bonus: Vowels are worth 3 points \n2- Scrabble: Uses scrabble point system \n\nEnter 0, 1, or 2: "));

   if (scoreChoice === 1) {
      let andSometimesY = input.question("Would you like to count Y as a vowel? ");

      if (andSometimesY.toUpperCase() === "Y") {
         vowels += "Y";
      }
   }
   
   return scoringAlgorithms[scoreChoice];
}

function runProgram() {
   let userWord = initialPrompt();
   let scoreAlgo = scorerPrompt();
   console.log(`Score for "${userWord}": ${scoreAlgo.scorerFunction(userWord)}`);
}

// runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};