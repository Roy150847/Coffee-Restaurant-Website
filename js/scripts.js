include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/uScroll.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/forms.js");
include("js/MathUtils.js");
include("js/jquery.cycle.all.min.js");
include("js/gallery.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = true, content, mh, h;

function addAllListeners() {
    var val1 = $('.list1>li>a').css('color')
    $('.list1>li>a').hover(
        function(){
        	$(this).stop().animate({'color':'#f2abab'},300,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'color':val1},600,'easeOutCubic');  
        }
    ); 
	$('.list2>li>figure>a, .slider>ul>li>figure>a')
    .find('>span>strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('>span>strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},600,'easeOutExpo');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('>span>strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('>span>strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('>span>strong').stop().hide();
            }            
        }
    );
    var val2 = $('.readMore').css('color')
    $('.readMore').hover(
        function(){
        	$(this).stop().animate({'color':'#967c7f'},300,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'color':val2},600,'easeOutCubic');  
        }
    ); 
    $('.prev').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
    $('.next').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);

function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){    
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    $("#galleryHolder").gallerySplash();
    
    $('.scroll')
	.uScroll({			
		mousewheel:true			
		,lay:'outside'
	});
    
	$('.list2>li>figure>a, .slider>ul>li>figure>a').attr('rel','appendix')
    .prepend('<span class="sitem_over"><strong></strong></span>')
    $('.list2>li>figure>a, .slider>ul>li>figure>a').fancybox({
        'transitionIn': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    });    
    
    if ($(".slider").length) {
        $('.slider').cycle({
            fx: 'scrollHorz',
            speed: 600,
    		timeout: 0,
            next: '.next',
    		prev: '.prev',                
    		easing: 'easeInOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            wrap: true
  		})
    };
        
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});		
        },
        actFu:function(_){            
            if(_.curr){
                
                h = parseInt( _.curr.outerHeight(true));
                content.children('ul').css({'height':h});
                $(window).trigger('resize');
                
                _.curr
                    .css({'left':'-2000px','visibility':'visible'}).stop(true).delay(600).show().animate({'left':'0px'},{duration:1000,easing:'easeOutExpo'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'left':'2000px'},{duration:700,easing:'easeInOutExpo',complete:function(){
                            if (_.prev){
                                _.prev.css({'visibility':'hidden'});
                            }
                        }
		              });
            }            
  		}
    });
    var defColor = $('#menu>li>a').eq(0).css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a>strong',li).css('left','0').stop().animate({'width':'100%','left':'0'},400,'easeOutExpo');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>a>strong',li).stop().animate({'width':'0','left':'100%'},700,'easeOutCubic');
            }
        }
    })
    .navs(function(n,_){
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
        
    setTimeout(function(){
        $('body').css({'overflow':'visible'});
        $(window).trigger('resize');    
    },300);    
    addAllListeners();
    
    mh = parseInt($('body').css('minHeight'));
}

$(window).resize(function (){
    if (content) {
        var newMh = mh + h-639;
        if (newMh < mh) {newMh = mh;}
        $('body').css({'minHeight': newMh})
        content
            .stop().animate({'top':(windowH()-h)*.5,'height':h},500,'easeOutCubic')
            .css('overflow','visible')
    }
});