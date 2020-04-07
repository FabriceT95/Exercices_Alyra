function estPalindrome(str) {
var joinedString = str.split(' ').join('').toLowerCase();
var reversedString = str.split('').reverse().join('').split(' ').join('').toLowerCase();

if(joinedString === ""){
	console.log("Veuillez saisir un mot avant d'appuyer sur 'Enter'")
}else if(joinedString === reversedString){
	console.log(str+" est bien un palindrome !");
}else{
	console.log(str+ " n'est pas un palindrome !");
}
}



function palindrome(str) {
  var re = /[\W_]/g; 
  
  var lowRegStr = str.toLowerCase().replace(' ', '');
 
  var reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr; 
}
 
palindrome("A man, a plan, a canal. Panama");