export async function allSequential(promises = []) {
	let result = [];
	for(var i in promises){
		try{
			let promiseResult = await promises[i]();
			result.push(promiseResult);
		}catch(error){
			return Promise.reject(error);
		}
	}
	return result;
};