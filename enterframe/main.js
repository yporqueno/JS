window.onload = function(){

	function init() {
		YXQN.EnterFrame.add(trazar, this);
		YXQN.EnterFrame.add(trazar, this); // No hay problema en aniadir por error dos veces el mismo callback
		
		//YXQN.EnterFrame.add(obj.interna, obj);  // Puedo usar objetos y funciones dentro de objetos

		setTimeout(YXQN.EnterFrame.pause, 1000);  // Pauso el enterframe
		setTimeout(YXQN.EnterFrame.resume, 2000);  // Vuelvo a ponerlo en marcha
		setTimeout(YXQN.EnterFrame.clear, 3000);  // Lo vacio (se para por completo)
		setTimeout(YXQN.EnterFrame.resume, 4000);  // No tiene efecto despues de un clear
	}

	//
	function trazar() {
		otraFuncion('Hola');  // Puedo llamar a otra funcion sin problemas, no pierde el scope
	}

	//
	function otraFuncion(argument) {
		console.log('argument: ', argument);
	}

	//
	var obj = {
		interna: function(){
			console.log('Hola Mundo: ' + this.prop);
		},
		prop: 54
	};



	init();
};