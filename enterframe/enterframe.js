/*
	Based on Paulirish rAF.js
	https://gist.github.com/paulirish/1579671

	Use:
		EnterFrame.add(function, scope);
		EnterFrame.remove(function, scope);
		EnterFrame.pause();
		EnterFrame.resume();
		EnterFrame.clear();
		EnterFrame.getCallbacks();
		EnterFrame.getTimestamp();
*/

// MIT license

var EnterFrame = (function() {
	var _api = {};

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];

	var _callbacks = [];
	var _c;
	var _id;
	var _timestamp = 0;

	function init() {
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame) {
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
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
	function tic(timestamp) {
		_timestamp = timestamp;
		for(var i in _callbacks){
			_c = _callbacks[i];
			_c.fn.call(_c.sc);
		}
		_id = window.requestAnimationFrame(tic);
	}


	//
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


	//
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


	//
	_api.pause = function(){
		window.cancelAnimationFrame(_id);
	};

	//
	_api.resume = function(){
		if(_callbacks.length > 0){
			_id = window.requestAnimationFrame(tic);
		}
	};


	//
	_api.clear = function(){
		window.cancelAnimationFrame(_id);
		_callbacks = [];
	};


	//
	_api.getCallbacks = function(){
		return _callbacks;
	};


	//
	_api.getTimestamp = function(){
		return _timestamp;
	};


	init();
	return _api;
})();