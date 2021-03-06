/*
 *  jquery.loadingimagethingy.js
 *  a plugin that puts a loading icon and overlay into any specified element or window.
 *  @author gehsekky
 *  @version 1.1
 */
;(function ( $, window, document, undefined ) {
	"use strict";

	var pluginName = "loadingimagethingy",
		defaults = {
			overlayBackgroundColor: "rgba(0,0,0,0.5)", // the background color of the overlay in any format you want
			imageType: "css3", // css3|image
			imagePath: "", // either empty string or the path to image file
			imageHeight: 80, // image height as int (normally at 128, bubbling best set at 80, circleg at 32)
			imageWidth: 128, // image width as int (normally 128, circleg best at 150, floatingbarsg best at 103)
			animation: "bubbling", // floatingcircles|circularg|bubbling|circleg|floatingbarsg
			messageHeightOffset: 50, // hack to get text under positioned image
			message: "" // the text under the animation (if any)
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
			var $this = $(this.element),
				template = '',
				$thingy, $overlay, $message, $container;
			
			// check to see if overlay already exists. if yes, do nothing.
			if ($this.find(".loadingimagethingy-overlay").length === 0) {
				switch(this.settings.imageType) {
					case "css3":
						switch(this.settings.animation) {
							case "floatingcircles":
								template = 
									'<div class="floatingCirclesG loadingimagethingy"> \
										<div class="f_circleG frotateG_01"></div> \
										<div class="f_circleG frotateG_02"></div> \
										<div class="f_circleG frotateG_03"></div> \
										<div class="f_circleG frotateG_04"></div> \
										<div class="f_circleG frotateG_05"></div> \
										<div class="f_circleG frotateG_06"></div> \
										<div class="f_circleG frotateG_07"></div> \
										<div class="f_circleG frotateG_08"></div> \
									</div>';
								break;
							case "circularg":
								template = 
									'<div class="circularGOuter loadingimagethingy"> \
										<div class="circularG circularG_1"></div> \
										<div class="circularG circularG_2"></div> \
										<div class="circularG circularG_3"></div> \
										<div class="circularG circularG_4"></div> \
										<div class="circularG circularG_5"></div> \
										<div class="circularG circularG_6"></div> \
										<div class="circularG circularG_7"></div> \
										<div class="circularG circularG_8"></div> \
									</div>';
								break;
							case "bubbling":
								template =
									'<div class="bubblingG loadingimagethingy"> \
										<span class="bubblingG_1"></span> \
										<span class="bubblingG_2"></span> \
										<span class="bubblingG_3"></span> \
									</div>';
								break;
							case "circleg":
								template = 
									'<div class="circleGContainer loadingimagethingy"> \
										<div class="circleG_1 circleG"></div> \
										<div class="circleG_2 circleG"></div> \
										<div class="circleG_3 circleG"></div> \
									</div>';
								break;
							case "floatingbarsg":
								template =
									'<div class="floatingBarsG loadingimagethingy"> \
										<div class="blockG rotateG_01"></div> \
										<div class="blockG rotateG_02"></div> \
										<div class="blockG rotateG_03"></div> \
										<div class="blockG rotateG_04"></div> \
										<div class="blockG rotateG_05"></div> \
										<div class="blockG rotateG_06"></div> \
										<div class="blockG rotateG_07"></div> \
										<div class="blockG rotateG_08"></div> \
									</div>';
								break;
							default:
								throw new Error("Unknown animation specified: " + this.settings.animation);
						}
						break;
					case "image":
						// quick sanity check
						if (!this.settings.imagePath) {
							throw new Error("Image type is image but there is no path specified.");
						}
						
						template = 
							'<div class="loadingimagethingy"><img class="loadingimagethingy-image" src="' + this.settings.imagePath + '" /></div>';
						break;
					default:
						throw new Error("Unsupported image type: " + this.settings.imageType);
				}
				
				// create new overlay and append to container element.
				$thingy = $(document.createElement("div"))
					.addClass("loadingimagethingy-image-container")
					.css("width", this.settings.imageWidth)
					.css("height", this.settings.imageHeight + this.settings.messageHeightOffset)
					.append(template);
				$overlay = $(document.createElement("div")).addClass("loadingimagethingy-overlay").css("background-color", this.settings.overlayBackgroundColor);

				if (this.settings.message !== "") {
					$message = $(document.createElement("div")).addClass("loadingimagethingy-message").append("<p>" + this.settings.message + "</p>");
					$thingy.append($message);
				}
				$overlay.append($thingy);
				$this.append($overlay);
				
				// set height and width
				$this.find(".loadingimagethingy").css("height", this.settings.imageHeight).css("width", this.settings.imageWidth);
			}
		},
		disable: function () {
			// remove plugin html
			$(this.element).find(".loadingimagethingy-overlay").remove();
			
			// destroy plugin
			this.destroy();
		},
		destroy: function () {
			// erase this plugin from the element data
			$.data(this.element, 'plugin_' + pluginName, null);
			
			console.log("loadingimagethingy destroyed");
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