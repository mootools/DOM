
define(['./Node', 'Slick/Finder'], function(Node, Slick){

var wrappers = {}, matchers = [];

Node.defineMutator('Matches', function(match){
	matchers.push({
		match: match,
		construct: this,
		type: typeof match
	});
});

var select = function(node){
	if (node != null){
		if (typeof node == 'string') return select(Slick.find(document, node));
		if (node instanceof Node) return node;
		var uid = node.uniqueNumber || Slick.uidOf(node), wrapper = wrappers[uid];
		if (wrapper) return wrapper;
		for (var l = matchers.length; l--;){
			var current = matchers[l],
				matched = current.type == 'string' ? Slick.match(node, current.match) : current.match(node);
			if (matched) return (wrappers[uid] = new current.construct(node));
		}
	}
	return null;
};

return select;

});
