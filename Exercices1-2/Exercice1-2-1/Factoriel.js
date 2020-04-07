function factoriel(nbr){
	var i, f = 1;

	for(i = 1; i <= nbr; i++){
		f = f * i;
	}

	return f;
}

console.log(factoriel(5));