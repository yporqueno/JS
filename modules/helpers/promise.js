// Ejecuta un array de promesas en orden
// Devuelve una promesa
// Cuando todas las promesas se terminan de ejecutar, devuelve un array con los resultados exitosos (then), o un error (catch) con el resultado de la promesa que ha fallado
export function allSequential(promises = []) {
	const promise = new Promise(async (resolve, reject) => {
		let result = [];
		for(var i in promises){
			try{
				let promiseResult = await promises[i]();
				result.push(promiseResult);
			}catch(error){
				reject(error);
				break;
			}
		}
		resolve(result);
	});
	return promise;
};