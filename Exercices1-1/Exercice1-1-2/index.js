const program = require("commander")
const { description, version, name } = require('./package.json') 

program
  //Load cosmetic settings from package.json
  .version(version)
  .name(name)
  .description(description)
  .arguments('[data...] ')
  .action(function (data) {
    if (data) {
      console.log("rechercheParOrdi : " + data[0]);
      rechercheParOrdi(0,100, data[0])
    } 
  })
  .parse(process.argv)



function rechercheParOrdi(min,max, numberToFind){
  let guess = Math.round((min+max)/2);
  if(guess > numberToFind){
    max = guess;
    console.log("Ma proprosition est : " + guess)
    rechercheParOrdi(min,max,numberToFind);
    
  }else if(guess < numberToFind){
    min = guess;
    console.log("Ma proprosition est : " + guess)
    rechercheParOrdi(min,max,numberToFind);
  }else{
    console.log("La réponse était " + guess);
  }
}