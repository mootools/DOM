
define(['./Node', './select', 'Base/Core/Class', 'Slick/Finder'], function(Node, select, Class, Slick){

var Element = new Class({
	Extends: Node,
	Matches: '*'
});

Element.prototype.toString = function(){
	var node = this.node, 
		tag = node.tagName.toLowerCase(),
		id = node.id,
		className = node.className;
	var str = '<' + tag;
	if (id) str += '#' + id;
	if (className) str += '.' + className.replace(/\s+/g, '.');
	return str + '>';
};

Element.implement({

	appendChild: function(child){
		if ((child = select(child))) this.node.appendChild(child.valueOf());
		return this;
	},

	setAttribute: function(name, value){
		this.node.setAttribute(name, value);
		return this;
	},

	getAttribute: function(name){
		return this.node.getAttribute(name);
	},

	removeAttribute: function(name){
		this.node.removeAttribute(name);
		return this;
	},

	contains: function(node){
		return ((node = select(node))) ? Slick.contains(this.node, node.valueOf()) : false;
	},

	match: function(expression){
		return Slick.match(this.node, expression);
	}

});

return Element;

});
