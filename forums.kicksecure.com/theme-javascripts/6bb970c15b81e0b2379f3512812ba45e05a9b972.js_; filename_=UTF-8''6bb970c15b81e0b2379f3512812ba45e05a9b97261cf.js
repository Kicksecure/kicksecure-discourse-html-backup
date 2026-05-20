(function () {
  let contentForSlides = `
        <h1>We want to <b>grow and improve</b> - please help Kicksecure!</h1>
        
        <div data-crypto-addresses='{
          "payBitcoin": "3DaJWfHyLv4RVnvMD7K2Mz2AX2r3fwiQwV",
          "payMonero": "84ozcSohQfoV6nRgGfaQ8uBvWphXAH8zDTTuotVnJWF1JMNQfvgNFdbEo4ZnJ9hxPMeYfJuUoWGH3MRaXCfbYk8sFFgm4XL",
          "payEthereum": "0xf27EAe399f186600Dc6e5A418793C4A3D58a74e7"
        }'>
        </div>
        
        <div>
          <img src="/w/images/3/30/End-of-year-green.jpg" />
          Kicksecure is an Open Source security power house and the basis for <a target="_blank" href="https://www.whonix.org">Whonix</a> - <b>providing great value to thousands of users</b>! 
          But only those who move forward continue to thrive. Would you support our next big leap? 
        </div>
        
        <div>
          <img src="/w/images/2/2d/End-of-year-blue.jpg" />
          For 2023 we're <b>improving the usability and enhancing the user experience</b>. We're also hardening the kernel against attacks, improving access control, adding a sandbox and many more features.
        </div>
        
        <div>
          <img src="/w/images/e/ef/End-of-year-yellow.jpg" />
          We aim to create a high impact outreach with articles and videos to attract more users, get more feedback and in turn improve security for YOU!
          <b>Would you consider a donation to keep Kicksecure independent</b> and help reach these new goals? Thank you.
        </div>
      `;
  let initBanner = () => {
    // Will not be executed after 2022-31-12 23:59
    if (Date.now() > 1672527599000) {
      return;
    }

    // If the user has the dismissed less than a week ago, it will not be executed
    if (localStorage.getItem('dismiss-end-of-year-sitenotice') > Date.now()) {
      $('#siteNotice').addClass('hide-notice');
      return;
    }
    // Else remove item (because it's not valid) if it exists
    localStorage.removeItem('dismiss-end-of-year-sitenotice');
    $('#main-container').append('<div id="end-of-year-banner-wrapper"></div>');
    let url = window.location.href.match(/\.onion/) ? 'http://w5j6stm77zs6652pgsij4awcjeel3eco7kvipheu6mtr623eyyehj4yd.onion' : 'https://www.kicksecure.com';
    initEndOfYearSitenotice($('#end-of-year-banner-wrapper'), url, contentForSlides);
    let eoy = $('#donate-end-of-year');
    eoy.find('.btc .cbutton').attr('src', '/w/images/thumb/2/29/BC_Logo_.png/40px-BC_Logo_.png');
    eoy.find('.xmr .cbutton').attr('src', '/w/images/thumb/0/05/Monero-symbol-1280.png/40px-Monero-symbol-1280.png');
    eoy.find('.eth .cbutton').attr('src', '/w/images/thumb/2/2c/Ethereumlogo.png/40px-Ethereumlogo.png');
    $('#end-of-year-banner-modal').animate({
      opacity: 1
    }, 1000);
    eoy.find('.dismiss').on('click', function () {
      $('#end-of-year-banner-wrapper').animate({
        height: 0,
        opacity: 0
      }, 1000, function () {
        $(this).attr('style', 'display:none !important;');
      });
    });
  };

  // Currently deactivated
  // $(document).ready( initBanner );
})();
//# sourceMappingURL=6bb970c15b81e0b2379f3512812ba45e05a9b972.map?__ws=forums.kicksecure.com
