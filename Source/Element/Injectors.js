/*
 * Add inject/eject and other methods to move elements.
 */

define(['./select', './Element', 'Base/Host/Array'], function(select, Element, Array){

var inserters = {

	before: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element);
	},

	after: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element.nextSibling);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		element.insertBefore(context, element.firstChild);
	}

};

return Element.implement({

	inject: function(element, where){
		if ((element = select(element))) inserters[where || 'bottom'](this.node, element.valueOf());
		return this;
	},

	eject: function(){
		var parent = this.node.parentNode;
		if (parent) parent.removeChild(this.node);
		return this;
	},

	adopt: function(){
		Array.forEach(arguments, function(element){
			if ((element = select(element))) this.node.appendChild(element.valueOf());
		}, this);
		return this;
	},

	appendText: function(text, where){
		inserters[where || 'bottom'](document.createTextNode(text), this.node);
		return this;
	},

	grab: function(element, where){
		if ((element = select(element))) inserters[where || 'bottom'](element.valueOf(), this.node);
		return this;
	},

	replace: function(element){
		if ((element = select(element))){
			element = element.valueOf();
			element.parentNode.replaceChild(this.node, element);
		}
		return this;
	},

	wrap: function(element, where){
		return this.replace(element).grab(element, where);
	}

});

});
