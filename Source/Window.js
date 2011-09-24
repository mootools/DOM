/**
 * Window wrapper
 */

// I don't think Window should inherit from Node actually (same that `(window instanceof Node) == false`
define(['./Node'], function(Node){

var Window = Class({
	Extends: Node,
	Matches: function(node){
		return !!node.navigator;
	}
});

Window.prototype.toString = function(){
	return '<window>';
};


});
