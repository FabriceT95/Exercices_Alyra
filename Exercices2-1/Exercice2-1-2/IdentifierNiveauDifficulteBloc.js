const calculerDifficulte = (bits) => {
	return parseInt(bits, 16) / ((2**16 - 1) * 2**208);
};