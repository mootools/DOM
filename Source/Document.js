/*
 * Document Wrapper
 */

define(['./Node', './select'], function(Node){

var Document = Class({

	Extends: Node,

	Matches: function(node){
		return node.nodeType == 9;
	},

	createElement: function(tag){
		return select(this.node.createElement(tag));
	},

	createTextNode: function(text){
		return this.node.createTextNode(text);
	},

	build: function(){}

});

Document.prototype.toString = function(){
	return '<document>';
};

return Document;

});
