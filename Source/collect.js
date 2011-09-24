
define(['./List', 'Slick/Finder'], function(List, Slick){

return function(){
	var list = new List;
	for (var i = 0, l = arguments.length; i < l; i++){
		var argument = arguments[i];
		if (typeof argument == 'string') Slick.search(document, argument, list);
		else list.push(argument);
	}
	return list;
};

});

