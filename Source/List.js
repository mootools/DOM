/*
 * Collection of elements
 */

define(['./select', './Element', 'Base/Host/Object', 'Slick/Finder'], function(select, Element, Object, Slick){

var List = function(){
	this.uids = {};
	if (arguments.length) this.push.apply(this, arguments);
};

List.implement = function(key, fn){
	if (typeof key != 'string') for (var k in key) this.implement(k, key[k]); else this.prototype[key] = fn;
};

List.prototype = Object.create(Array.prototype);

List.implement({

	length: 0,

	push: function(){
		for (var i = 0, l = arguments.length; i < l; i++){
			var node = arguments[i], item = select(arguments[i]);
			if (item && item instanceof Element){
				node = item.node;
				var uid = node.uniqueNumber || Slick.uidOf(node);
				if (!this.uids[uid]) this[this.length++] = item;
			}
		}
		return this.length;
	}

	// TODO: forward-port 1.3 Elements methods and fixes

});

// element methods to List

var elementImplement = Element.implement;

Element.implement = function(key, fn){
	if (typeof key != 'string') for (var k in key) this.implement(k, key[k]); else {
		if (!List.prototype[key]) List.prototype[key] = function(){
			var list = new List, results = [];
			for (var i = 0; i < this.length; i++){
				var node = this[i], result = node[key].apply(node, arguments);
				if (list && !(result instanceof Element)) list = false;
				results[i] = result;
			}

			if (list){
				list.push.apply(list, results);
				return list;
			}

			return results;
		};

		elementImplement.call(Element, key, fn);
	}
};

return List;

});
