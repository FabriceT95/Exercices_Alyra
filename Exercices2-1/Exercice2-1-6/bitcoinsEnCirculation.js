function bitcoinsEnCirculation(hauteurBloc) {
	let nbBitcoinInit = 50;
	let nbBitcoin = 0;
    let recompense = 50;
	let blocPlafond = 210000; 
	while(hauteurBloc+nbBitcoinInit > blocPlafond){
		nbBitcoin += (recompense * blocPlafond);
		recompense /= 2;
		hauteurBloc -= blocPlafond;
	}
	nbBitcoin += recompense * hauteurBloc;
	return nbBitcoin;
}