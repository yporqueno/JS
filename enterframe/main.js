window.onload = function(){

	var me = this;

	function init() {
		EnterFrame.add(trazar, me);
		EnterFrame.add(trazar, me); // No hay problema en aniadir por error el mismo callback
		setTimeout(EnterFrame.pause, 1000);
		setTimeout(EnterFrame.resume, 2000);
		setTimeout(EnterFrame.clear, 3000);
		setTimeout(EnterFrame.resume, 4000);  // No tiene efecto despues de un clear
	}

	function trazar() {
		//console.log('_nombre: ', me);
		//console.log('this: ', this);
		otraFuncion('Hola');
	}


	function otraFuncion(argument) {
		console.log('argument: ', argument);
	}

	init();
};