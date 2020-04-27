function recompenseBloc(hauteurBloc){
	let recompense = 50;
	let blocPlafond = 210000; 
	while(hauteurBloc > blocPlafond){
		recompense /= 2;
		hauteurBloc -= blocPlafond;
	}
	return recompense;
}