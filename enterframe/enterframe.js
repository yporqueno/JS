/*
	Based on Paulirish rAF.js
	https://gist.github.com/paulirish/1579671

	Use:
		YXQN.EnterFrame.add(function, scope);
		YXQN.EnterFrame.remove(function, scope);
		YXQN.EnterFrame.pause();
		YXQN.EnterFrame.resume();
		YXQN.EnterFrame.clear();
		YXQN.EnterFrame.getCallbacks();
		YXQN.EnterFrame.setFps(value);
*/

// MIT license

var YXQN = YXQN || {};

YXQN.EnterFrame = (function() {
	var _api = {};

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];

	var _callbacks = [];
	var _c;
	var _id;
	var _last = 0;
	var _minTime = 20;  // 1000/20 = 50 fps

	function init() {
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, _minTime - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}

		if (!window.cancelAnimationFrame) {
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	}
	

	// Recursividad
	function tic() {
		var now = new Date();
		if((now-_last) > _minTime ){
			_last = now;
			for(var i in _callbacks){
				_c = _callbacks[i];
				_c.fn.call(_c.sc);
			}
		}
		_id = window.requestAnimationFrame(tic);
	}


	// Aniado callbacks nuevos.
	// Si ya existe no lo aniado
	_api.add = function(callback, scope){
		if(!callback || !scope){return false;}
		for(var i in _callbacks){
			_c = _callbacks[i];
			if((callback===_c.fn) && (scope===_c.sc)){
				return false;
			}
		}
		_callbacks.push({fn:callback, sc:scope});
		if(_callbacks.length===1){
			_id = window.requestAnimationFrame(tic);
		}
	};


	// Elimino un callback concreto
	_api.remove = function(callback, scope){
		if(!callback || !scope){return false;}
		for(var i in _callbacks){
			_c = _callbacks[i];
			if((callback===_c.fn) && (scope===_c.sc)){
				_callbacks.splice(i, 1);
			}
		}
		if(_callbacks.length===0){
			window.cancelAnimationFrame(_id);
		}
	};


	// Pauso el enterframe
	_api.pause = function(){
		window.cancelAnimationFrame(_id);
	};


	// Vuelvo a ponerlo en marcha
	_api.resume = function(){
		if(_callbacks.length > 0){
			_id = window.requestAnimationFrame(tic);
		}
	};


	// Detengo por completo el enterframe y vacio su lista de callbacks para que no le afecte un futuro resume
	_api.clear = function(){
		window.cancelAnimationFrame(_id);
		_callbacks = [];
	};


	// Devuelve un listado de los callbacks almacenados
	_api.getCallbacks = function(){
		return _callbacks;
	};


	// Asigno un tiempo minimo entre intervalos, para evitar que vaya demasiado rapido en ordenadores muy potentes y homogeneizar el comportamiento
	_api.setFps = function(value){
		_minTime = Math.round(Math.max(0, 1000/value));
	};


	init();
	return _api;
})();

