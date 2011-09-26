
define([
	'../Document', '../Window', '../Element', '../List', '../select', 'Base/Utility/Array', 'Base/Utility/Object'
], function(Window, Document, Element, List, select, Array, Object){


Array.invoke([Element, Document, Window], 'implement', {

	find: function(expression){
		return select(Slick.find(this.node, expression));
	},

	search: function(expression){
		var elements = new List, nodes = Slick.search(this.node, expression);
		for (var i = 0; i < nodes.length; i++) elements[elements.length++] = select(nodes[i]);
		return elements;
	}

});

/* Tree Walking */

methods = {
	find: {
		getNext: '~',
		getPrevious: '!~',
		getFirst: '^',
		getLast: '!^',
		getParent: '!'
	},
	search: {
		getAllNext: '~',
		getAllPrevious: '!~',
		getSiblings: '~~',
		getChildren: '>',
		getParents: '!'
	}
};

Object.forEach(methods, function(getters, method){
	Element.implement(Object.map(getters, function(combinator){
		return function(expression){
			return this[method](combinator + (expression || '*'));
		};
	}));
});

return Element;

});
