// Simple jQuery Templating
// Author - Igor Aloise Mordashev
// Original by John Resig - http://ejohn.org/ - MIT Licensed


(function($) { 
	
	$.fn.template = 
	{
			cache : {},
			cacheEnabled : true,
			templateGenerator : function(str)
			{
				var fn = null;
				
				var bodyStr = "var p=[],print=function(){p.push.apply(p,arguments);};" +
			     
			     // Introduce the data as local variables using with(){}
			     "with(obj){p.push('" +
			     
			     // Convert the template into pure JavaScript
			     str
			       .replace(/[\r\t\n]/g, " ")
			       .split("<%").join("\t")
			       .replace(/((^|%>)[^\t]*)'/g, "$1\r")
			       .replace(/\t=(.*?)%>/g, "',$1,'")
			       .split("\t").join("');")
			       .split("%>").join("p.push('")
			       .split("\r").join("\\'")
			   + "');}return p.join('');"
				
				try
				{
					fn = new Function("obj", bodyStr );		
				}
				catch(e)
				{
					if( console && console.log )
					{
						console.log('Template compilation failed : function(obj){ '+bodyStr+ '} ');
						
					}
					
					fn = null;
				}
				
				return fn;
			}
	};
		
	$.template = function(str, data) 
	{
		  var fn = $.fn.template.templateGenerator(str);
		  if( fn )
		  {
			  return fn( data );
		  }
		  
		  return null;

	};
	  
	$.templateBySelector = function(selector, data) 
	{
		  var str = $(selector).text();
		  
		  if( str )
		  {
			  var fn = ( $.fn.template.cache[selector] ) ? $.fn.template.cache[selector] : $.fn.template.templateGenerator(str);
			  
			  if( $.fn.template.cacheEnabled && fn )
			  {
				  $.fn.template.cache[selector] = fn;
			  }
			  
			  if( fn )
			  {
				  
				  return fn( data );
				  
			  }
				
		  }

		  return null;
		
	};
	
})(jQuery);


