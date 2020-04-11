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
      fibonacci(data[0])
    } 
  })
  .parse(process.argv)


function fibonacci(generation){
	var fibArray = []; 
	for (i = 0; i < generation; i++) {
	  if(i <= 1){
	    fibArray[i] = 1;
	    console.log(fibArray[i]);
	  }else{ 
	    fibArray[i] = fibArray[i - 2] + fibArray[i - 1];
	    console.log(fibArray[i]);
	  }
	}
}

var fibArray = []; 
function fibonacci(number){
	if(number <= 1) return 1
	else return fibArray.push(fibonacci(i - 1) + fibonacci(i - 2))
}

console.log(fibArray);