export class Person{
	constructor(config = {}){
	  this._properties = {...config};
	}

	log(){
	  let promise = new Promise((resolve, reject)=>{
		setTimeout(()=>{
		  resolve(this._properties);
		}, 1000);
	  });
	  return promise;
	}

	getCompleteName(){
	  const n = this._properties.name || '';
	  const s = this._properties.surname || '';
	  const sep = (n && s) ? ' ' : '';
	  return Promise.resolve(n + sep + s);
	}

	getError(){
	  return Promise.reject('Un error');
	}
  }