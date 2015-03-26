
;(function ( $, window, document, undefined ) {
	"use strict";

	var pluginName = "loadingimagethingy",
		defaults = {
			propertyName: "value"
		};

	// The actual plugin constructor
	function Plugin ( element, options ) {
		this.element = element;
		$(this.element).addClass("loadingimagethingy-container");

		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {
		init: function () {
			console.log("initializing loadingimagethingy");
		},
		enable: function () {
			var $this = $(this.element);
			
			// check to see if overlay already exists. if yes, do nothing.
			if ($this.find(".loadingimagethingy-overlay").length === 0) {
				// create new overlay and append to container element.
				$this.append($(document.createElement("div")).addClass("loadingimagethingy-overlay").append(
					'<div class="loadingimagethingy-imagecontainer"> \
						<div class="floatingCirclesG loadingimagethingy"> \
							<div class="f_circleG frotateG_01"></div> \
							<div class="f_circleG frotateG_02"></div> \
							<div class="f_circleG frotateG_03"></div> \
							<div class="f_circleG frotateG_04"></div> \
							<div class="f_circleG frotateG_05"></div> \
							<div class="f_circleG frotateG_06"></div> \
							<div class="f_circleG frotateG_07"></div> \
							<div class="f_circleG frotateG_08"></div> \
						</div> \
					</div>'		
				));
			}
		},
		disable: function () {			
			$(this.element).find(".loadingimagethingy-overlay").remove();
			this.destroy();
		},
		destroy: function () {
			$.data(this.element, 'plugin_' + pluginName, null);
		}
	});

	$.fn[pluginName] = function ( options ) {
		var args = arguments;
		if (options === undefined || typeof options === 'object') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			return this.each(function () {
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
				}
				var instance = $.data(this, 'plugin_' + pluginName);
				if (instance instanceof Plugin && typeof instance[options] === 'function') {
					instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
				}
			});
		}
	};
})( jQuery, window, document );