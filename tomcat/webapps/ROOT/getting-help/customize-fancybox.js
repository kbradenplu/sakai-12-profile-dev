$(document).ready(function() {

  $(".fancybox").fancybox( {
    loop: false,
    padding: 0,
    openEffect: 'none',
    closeEffect: 'none',

    keys : {
      next : {
        39 : 'left', // right arrow
      },
      prev : {
        37 : 'right',  // left arrow
      },
      close  : [27], // escape key
      play   : [32], // space - start/stop slideshow
      toggle : [70]  // letter "f" - toggle fullscreen
    },

    helpers : {
      title : {
        type: 'inside'
      },
      overlay : {
        css: {
	  'background' : 'rgba(0, 0, 0, 0.5)'
	}
      }
    }
  });

});