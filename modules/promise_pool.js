import { allSequential } from './helpers/promise';

export default class PromisePool{
	constructor() {
		this._promises = [];
	}

	push(item) {
		this._promises.push(item);
	}

	// Ejecuta las promesas en orden (o inverso)
	all(reverse = false) {
    	if (reverse) {
			this._promises.reverse();
		}
		return allSequential(this._promises);
	}

	clear(){
		this._promises = [];
	}
};