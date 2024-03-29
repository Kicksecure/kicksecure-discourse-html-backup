/*
CodeSelect Gadget - JS Initialisation, Setup, Events. Activates all .code-select fields on the site. By clicking the icon the code is copied to clipboard and tooltip is changed
See detailed documentation in Dev/mediawiki
deferrable:NO -- Because other scripts are dependent on it
*/

(function () {

	// Global

	var innerContent = $( ""
		+ '<i class="far fa-clone fa-rotate-90 cbutton">'
		+ '</i>'
		+ '<span class="tooltip2">'
		+  '<span class="hover">Click = Copy</span>'
		+  '<span class="copied">'
		+   '<i class="fa fa-check-square-o"></i>'
		+   'Copied to clipboard!'
		+  '</span>'
		+ '</span>'
		+ '<span class="code"></span>'
	);
	var cbuttonIcons = { normal: 'far fa-clone fa-rotate-90', copied: 'fas fa-check' };

	// Private

	function markSelection( jqDom ) {
		let selection = window.getSelection();
		selection.removeAllRanges();

		let range = document.createRange();
		range.selectNodeContents( jqDom[0] );
		selection.addRange(range);
	}

	// jQuery Extension

	$.fn.codeSelect = function( action ) {

		// Only allow 'init' at the moment (extendable later)
		if( action != 'init' ) return;

		$(this).each( function() {
			// Prevent double initialization
			if( $(this).hasClass('js-fully-loaded') ) return;

			// Setup

			let codeSelect = $(this);
			let htmlMode = codeSelect.hasClass('insert-mode-html');
			let content = codeSelect[ htmlMode ? 'html' : 'text' ]();
			codeSelect
				.empty()
				.append( innerContent.clone() )
				.find('.code')[ htmlMode ? 'html' : 'text' ]( content );

			let imageButton = false;
			if( codeSelect.attr('data-button-image-src') ) {
				$('<img class="cbutton" src="' + codeSelect.attr('data-button-image-src') + '" />').insertAfter( codeSelect.find('.cbutton') );
				codeSelect.find('i.cbutton').remove();
				imageButton = true;
			}

			let cbutton = codeSelect.find('.cbutton');
			let tooltip = codeSelect.find('.tooltip2');

			// Events

			cbutton.on('click', function() {
				// copying
				markSelection( codeSelect.find('.code') );
				document.execCommand("copy");

				// feedback and closing
				codeSelect.addClass('copied');
				if( ! imageButton ) cbutton.removeClass( cbuttonIcons.normal ).addClass( cbuttonIcons.copied );
				setTimeout(f1, 3000);
				function f1() { tooltip.fadeOut( 600, f2 ); }
				function f2() {
					codeSelect.removeClass('copied');
					if( ! imageButton ) cbutton.removeClass( cbuttonIcons.copied ).addClass( cbuttonIcons.normal );
					setTimeout( f3, 200 );
				}
				function f3() { tooltip.css( 'display', '' ); }
			});

			codeSelect.find('.code').on('click', function() {
				markSelection( $(this).parent().find('.code') );
			});

			codeSelect.addClass('js-fully-loaded');
		});
	};

	// Enrich selection of standard elements

	$('.code-select').codeSelect('init');

})();

/*
[[Category:MultiWiki]]
*/