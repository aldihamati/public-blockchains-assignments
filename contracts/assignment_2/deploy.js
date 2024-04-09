// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
//const path = require("path");
//const ethers = require("ethers");
const readline = require("readline");
async function getUserInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
async function main() {
    // const hardhatSigners = await hre.ethers.getSigners();
    // const hhSigner = hardhatSigners[0];
    // console.log("HH Signer address:", hhSigner.address);

    // const contractName="MyQuiz";
    // const contractAddress="0x57BcE7314275bc435b2dAB9191f5777bb2C4F7a9";

    // const MyQuiz = await hre.ethers.getContractAt(contractName,
    //     contractAddress,
    //     hhSigner); 

 const questions= [
    "Is Naruto the 7th Hokage of the Hidden Leaf Village?",
    "Is Gojo the strongest because he is Gojo?",
    "Should one believe in the hearts of the cards?",
    "Did Eren really have no choice?",
    "Is Iskandar stronger than Gilgamesh in Fate?"
 ]

 const answers=[true,true,true,true,false]
 const MyQuiz = await hre.ethers.getContractFactory("MyQuiz");
 const myQuiz = await MyQuiz.deploy(questions, answers);
 //await myQuiz.deployed();
 await myQuiz.waitForDeployment();
 console.log("MyQuiz deployed to:", myQuiz.target);

 let storedQuestion;
 let storedAnswerIsYes;
 myQuiz.on("QuestionAsked", (user,question,answerIsYes) => {
    storedQuestion=question;
    storedAnswerIsYes=answerIsYes;
 });

 let storedQuestion2;
 let storedUserAnswer;
 myQuiz.on("AnswerStored", (user,question,userAnswer) => {
    storedQuestion2=question;
    storedUserAnswer=userAnswer;
 });

 const tx= await myQuiz.askQuestion();

 const receipt=await tx.wait();
 //console.log("Transaction receipt:", receipt);
 //const questionEvent = receipt.events.find((event) => event.event === "QuestionAsked");
 //const question = questionEvent.args.question;
 //const anwserIsYes = questionEvent.args.anwserIsYes;
 //console.log("Question asked:", question, "  the answerisyes param:", anwserIsYes);
  
 console.log("Question asked from questionasked event: ", storedQuestion);
 console.log("AnswerIsYes parameter from QuestionAsked event", storedAnswerIsYes);
 let userAnswer = await getUserInput("Your answer (type 'true' or 'false'): ");
 let normalizedUserAnswer = userAnswer.toLowerCase();
 if(normalizedUserAnswer=="true"){
    normalizedUserAnswer=true;
 }else normalizedUserAnswer=false;
 
 let answ=await myQuiz.answerQuestion(storedQuestion,normalizedUserAnswer);
 const rec2=await answ.wait();

 //const answEvent=receipt.events.find((event) => event.event === "AnswerStored");
 //const q=answEvent.args.question;
 //const uansw=answEvent.args.userAnswer;

 console.log("The question from the answer function: ", storedQuestion, " the user answer: ", storedUserAnswer);
 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
