/*
Adds a PayPal payment module to the given DOM elements
See detailed documentation in Dev/mediawiki
deferrable:YES -- This script needs a little bit to load anyways
*/

(function () {

	// 0. Data

	let standards = {
		minimumDollars: 1, // in full dollars
	};

	let intervalModes = {
		once: '_xclick',
		subscription: '_xclick-subscriptions',
	};

	// 1. Elements

	let template = $(''
		+ '<div class="amount">'
		+  '<span>5</span>'
		+  '<span>20</span>'
		+  '<span>50</span>'
		+  '<span>200</span>'
		+  '<span>1000</span>'
		+  '<span class="manual">'
		+   '<input id="input-amount" type="text" autocomplete="off" />'
		+  '</span>'
		+  '<div class="error">Please select an amount of min $1</div>'
		+ '</div>'

		+ '<div class="interval">'
		+  '<span class="once">once</span>'
		+  '<span class="monthly">monthly</span>'
		+  '<span class="yearly">yearly</span>'
		+  '<div class="error">Please select an interval</div>'
		+ '</div>'

		+ '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">'
		+  '<input type="hidden" name="business" value="patrick_schleizer@web.de">'
		+  '<input type="hidden" name="currency_code" value="USD">'
		+  '<input type="hidden" name="item_name" value="Plus Support">'
		+  '<input type="hidden" name="cmd">'
		+  '<input type="submit" class="submit" name="submit" value="Donate">'
		+ '</form>'
	);

	let elementTemplates = {
		// Time parameters. Syntax: p3 times t3, e.g. p3=6&t3=M -> 6 months, p3=1&t3=Y -> 1 year
		interval: {
			monthly: $('<input type="hidden" name="p3" value="1"><input type="hidden" name="t3" value="M">'),
			yearly: $('<input type="hidden" name="p3" value="1"><input type="hidden" name="t3" value="Y">'),
		},
		amount: {
			once: $('<input type="hidden" name="amount">'),
			subscription: $('<input type="hidden" name="a3">'),
		},
	};

	// 2. Methods

	function isCurrentAmountValid( amount ) {
		let parsedAmount = Number.parseFloat( amount );
		return typeof parsedAmount == 'number' && Number.isNaN(parsedAmount) == false && parsedAmount >= standards.minimumDollars;
	}

	// 3. jQuery Extension

	$.fn.payViaPaypal = function( action ) {

		// Only allow 'init' at the moment (extendable later)
		if( action != 'init' ) return;

		$(this).each( function() {
			// Prevent double initialization
			if( $(this).hasClass('js-fully-loaded') ) return;

			let amount;

			$(this).html( template.clone() );

			let elements = {
				interval: { monthly: elementTemplates.interval.monthly.clone(), yearly: elementTemplates.interval.yearly.clone() },
				amount: { once: elementTemplates.amount.once.clone(), subscription: elementTemplates.amount.subscription.clone() },
			};

			let root = $(this);
			let form = root.children('form');
			let inputCmd = form.children('input[name=cmd]');

			// 4. Events

			root.find('.amount span').on('click', function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				if( $(this).hasClass('manual') ) {
					amount = $(this).children('input').val();
				} else {
					amount = $(this).text();
				}

				if( isCurrentAmountValid(amount) ) root.removeClass('paypal-amount-error');
			});

			root.find('.amount span input').on('input', function() {
				amount = $(this).val();

				if( isCurrentAmountValid(amount) ) root.removeClass('paypal-amount-error');
			});

			root.find('.interval span').on('click', function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');

				let t = $(this).text();
				if( t == 'once' ) {
					elements.interval.monthly.remove();
					elements.interval.yearly.remove();
					elements.amount.subscription.remove();
					form.prepend( elements.amount.once );
					inputCmd.val(intervalModes.once);
				} else {
					elements.amount.once.remove();
					form.prepend( elements.amount.subscription );
					if( t == 'montly' ) {
						elements.interval.yearly.remove();
						form.prepend( elements.interval.monthly );
					} else {
						elements.interval.monthly.remove();
						form.prepend( elements.interval.yearly );
					}
					inputCmd.val(intervalModes.subscription);
				}
				root.removeClass('paypal-interval-error');
			});

			form.on( 'submit', function(event) {
				if( isCurrentAmountValid(amount) == false ) {
					root.addClass('paypal-amount-error');
					return false;
				}

				if( ! inputCmd.val() ) {
					root.addClass('paypal-interval-error');
					return false;
				}

				form.children('input[name=amount],input[name=a3]').val(Number.parseFloat(amount).toFixed(2));

				return true;
			});

			// 6. Finalize Setup

			root.addClass('js-fully-loaded');

			if( root.hasClass('smooth') ) {
				root.css({ height: 0, overflow: 'hidden' });
				root.animate( { height: root.prop('scrollHeight') }, function() { root.css({ overflow: '' }); });
			}

		});

	};

	// 4. Auto-Initialization

	$('.pay-via-paypal-module').payViaPaypal('init');

})();

/*
[[Category:MultiWiki]]
*/