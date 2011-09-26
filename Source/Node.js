/*
 * A DOM Node wrapper
 */

define(['Base/Core/Class', 'Base/Class/Store'], function(Class, Store){

var Node = Class({

	Implements: Store,

	initialize: function(node){
		this.node = node;
	}

});

Node.prototype.valueOf = function(){
	return this.node;
};

return Node;

});
