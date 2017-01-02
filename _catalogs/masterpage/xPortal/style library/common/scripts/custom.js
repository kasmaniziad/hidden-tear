/*global jQuery, window, Modernizr, navigator, lang_home, objFlexSlider, objLayerSlider, objFlickr, jCarousel, objPostSlider, objGallerySlider, objTestimonials, objBlackAndWhite, google, objGoogleMap*/
var domainURL = window.location.origin;

(function ($, win, Modernizr, nav, doc) {
    "use strict";
    
    $(function () {
   
        /* ---------------------------------------------------- */
        /*	Main Navigation										*/
        /* ---------------------------------------------------- */
        (function () {
            var arrowimages = {
                down: 'downarrowclass',
                right: 'rightarrowclass'
            }, $mainNav = $('#top-navigation'), $mainList = $mainNav.find('ul').eq(0), optionsList = '<option value="" selected>Navigate...</option>', $submenu = $mainList.find("ul").parent();

            $submenu.each(function (i) {
                var $curobj = $(this);
                this.istopheader = ($curobj.parents("ul").length === 1 ? true : false);
                $curobj.children("a").append('<span class="' + (this.istopheader ? arrowimages.down : arrowimages.right) + '"></span>');
            });
            $mainList.find('li').each(function () {
                var $this = $(this), $anchor = $this.children('a'), depth = $this.parents('ul').length - 1, indent = '';
                if (depth) {
                    while (depth > 0) {
                        indent += '-';
                        depth = depth - 1;
                    }
                }
                optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';

            });

            $mainNav.after('<select class="responsive-nav">' + optionsList + '</select>');

            $('.responsive-nav').on('change', function () {
                win.location = $(this).val();
            });

            $.fn.headerToFixed = function (options) {

                var defaults = {
                    speed: 300,
                    windowWidth: $(win).width(),
                    scrollTop: $(win).scrollTop()
                }, o = $.extend({}, defaults, options), $this = $(this), $clone = $('#logo').clone(), heightHeader = $("header").height();
                if (o.windowWidth > 767) {
                    if (o.scrollTop > heightHeader) {
                        if (!$this.hasClass('fixed')) {
                            $this.find('.sixteen').prepend($clone);
                            $this.slideUp(o.speed).addClass('fixed').stop(true, true).slideDown(o.speed);
                            //$('.lang-switcher').hide();
                            //show ribbon
                            $('#ms-designer-ribbon').css('margin-top', '55px').slideDown(o.speed);
                        }
                    } else {
                        if ($this.hasClass('fixed')) {
                            $this.stop(true, true).slideUp(o.speed).stop(true, true).removeClass('fixed').slideDown(o.speed);
                            $this.find('.sixteen #logo').fadeOut(o.speed).remove();
                            $('#ms-designer-ribbon').css('margin-top', '0px');
                        }
                    }
                }

            };
            if (!Modernizr.touch) {
                $(win).scroll(function () {
                    $('#header').headerToFixed();

                });
            }

        } ());

        /* end Main Navigation */

        /* ---------------------------------------------------------------------- */
        /*	Detect Touch Device													  */
        /* ---------------------------------------------------------------------- */

        (function () {

            if (Modernizr.touch) {
                $('body').addClass('touch-device');
            }

            /*if ($.browser.safari === true) {
                $('body').addClass('safari');
            }*/

        } ());

        /* end Detect Touch Device */


        /* ---------------------------------------------------- */
        /* Tabs                                                            */
        /* ---------------------------------------------------- */

        (function () {


            var $contentTabs = $('.content-tabs');

            if ($contentTabs.length) {

                $contentTabs.each(function (i, val) {

                    var $tabsNav = $('.tabs-nav', val), tabsNavLis = $tabsNav.children('li'), $tabsContainer = $('.tabs-container', val);
                    $('.tab-content').stop(true, true).addClass('tab-hidden').removeClass('tab-visible');
                    $('.tab-content:eq(0)').stop(true, true).addClass('tab-visible').removeClass('tab-hidden');

                    $tabsNav.each(function () {
                        $(this).next().children('.tab-content').first().stop(true, true).show();
                        $(this).children('li').first().addClass('active').stop(true, true).show();
                    });

                    $('.tabs-nav a').click(function (e) {

                        var $this = $(this).parent('li'), $index = $this.index();
                        $this.siblings().removeClass('active').end().addClass('active');
                        $this.parent().next().children('.tab-content').stop(true, true).addClass('tab-hidden').removeClass('tab-visible');
                        $this.parent().next().children('.tab-content').eq($index).stop(true, true).addClass('tab-visible').removeClass('tab-hidden').show(250, function () {

                            var self = $(this);

                            self.parent('.tabs-container').animate({
                                height: self.outerHeight(true)
                            }, 200);

                        });

                        //$this.parent().next().children('.tab-content').css('visibility', 'visible');

                        e.preventDefault();
                    });

                    function adjustTabs() {
                        $tabsContainer.each(function () {
                            var $this = $(this);
                            $this.height($this.children('.tab-content:visible').outerHeight() + 20);
                        });
                        //$('.tabs-nav .active a').trigger('click');
                    }

                    // Init
                    adjustTabs(); 

                    // Window resize 
                    $(win).on('resize', function () {
                        var timer = win.setTimeout(function () {
                            win.clearTimeout(timer);
                            adjustTabs();
                        }, 30);
                    });
                });

            }

        } ());
           
        /* end Tabs */


        /*----------------------------------------------------*/
        /*	Alert Boxes										  */
        /*----------------------------------------------------*/

        (function () {

            var $notifications = $('.error, .success, .info, .notice');

            if ($notifications.length) {
                $notifications.notifications({
                    speed: 300
                });
            }

        } ());

        /* ---------------------------------------------------- */
        /* Back to Top											*/
        /* ---------------------------------------------------- */

        (function () {

            var backToTopText;
            //if (_spPageContextInfo.currentLanguage == 1033)
            //    backToTopText = 'Back to Top';
            //else
            //    backToTopText = 'إلى أعلى';

            var extend = {
                button: '#back-top',
                text: backToTopText,
                min: 100,
                fadeIn: 400,
                fadeOut: 400,
                speed: 800
            }, oldiOS = false, oldAndroid = false;

            // Detect if older iOS device, which doesn't support fixed position
            if (/(iPhone|iPod|iPad)\sOS\s[0-4][_\d]+/i.test(nav.userAgent)) {
                oldiOS = true;
            }

            // Detect if older Android device, which doesn't support fixed position
            if (/Android\s+([0-2][\.\d]+)/i.test(nav.userAgent)) {
                oldAndroid = true;
            }

            $('body').append('<a href="#" id="' + extend.button.substring(1) + '" title="' + extend.text + '">' + extend.text + '</a>');

            $(win).scroll(function () {
                var pos = $(win).scrollTop();

                if (oldiOS || oldAndroid) {
                    $(extend.button).css({
                        'position': 'absolute',
                        'top': pos + $(win).height()
                    });
                }

                if (pos > extend.min) {
                    $(extend.button).fadeIn(extend.fadeIn);
                } else {
                    $(extend.button).fadeOut(extend.fadeOut);
                }

            });

            $(extend.button).on('click', function (e) {
                $('html, body').animate({
                    scrollTop: 0
                }, extend.speed);
                e.preventDefault();
            });

        } ());

        /* end Back to Top */


        /*----------------------------------------------------*/
        /*	Search Form										  */
        /*----------------------------------------------------*/

        (function () {

            var $search = $('.search-wrapper'), $text = $('input[type="text"]', $search), $submit = $('.submit-search', $search);

            var paddingRight1, paddingLeft1, paddingRight2, paddingLeft2;

            //if (_spPageContextInfo.currentLanguage == 1033) {
            //    paddingRight1 = '35px'
            //    paddingLeft1 = '0px'
            //    paddingRight2 = '41px'
            //    paddingLeft2 = '0px'
            //} else {
            //    paddingRight1 = '0px'
            //    paddingLeft1 = '35px'
            //    paddingRight2 = '0px'
            //    paddingLeft2 = '41px'
            //}

            function closeSearch(el, text) {
                $submit.removeClass("active");
                el.stop(true, false).animate({
                    width: 0,
                    paddingRight: paddingRight1, //en
                    paddingLeft: paddingLeft1 //ar
                }, 250, function () {
                    text.val("").click(function () {
                        return false;
                    });
                    el.removeClass("active").find("input[type='text']").blur();
                });
            }

            function searchAnimate(wrapper, text) {
                wrapper.stop(true, false).animate({
                    width: '185px',
                    paddingRight: paddingRight2, //en
                    paddingLeft: paddingLeft2 //ar
                }, 250, function () {
                    wrapper.addClass("active").find("input[type='text']").focus();
                    text.click(function () {
                        return false;
                    });
                });
                return false;
            }
			
			var id1 = $('.menu-container #SearchBox').parent().attr('id');
			var id2 = $('.menu-container #SearchBox input').attr('id');
            $submit.on('click', function (e) {
                var target = $(e.target);

                if ($(target).hasClass('active')) {
					EnsureScriptFunc('Search.ClientControls.js', 'Srch.U', function () { $find(id1).search($get(id2).value); });
                    return true;

                } else {
                    target.addClass("active");

                    searchAnimate($search, $text);
                }
                return false;
            });


            $('body').on('click', function (e) {
                var current = $(e.target);
                if ($search.hasClass('active')) {
                    if (current !== $submit) {
                        closeSearch($search, $text);
                    }

                }
            });

        } ());

        /* end Search Form */


        /* ---------------------------------------------------- */
        /*	Image Post Slider									*/
        /* ---------------------------------------------------- */

        (function () {

            function swipeFunc(e, dir) {

                var $postslider = $(e.currentTarget);

                // Enable swipes if more than one slide
                if ($postslider.data('slideCount') > 1) {

                    $postslider.data('dir', '');

                    if (dir === 'left') {
                        $postslider.cycle('next');
                    }

                    if (dir === 'right') {
                        $postslider.data('dir', 'prev');
                        $postslider.cycle('prev');
                    }
                }
            }

            var $postslider = $('.image-post-slider > ul');


            if ($postslider.length) {
			
                $postslider.each(function (i) {

                    var $this = $(this);

                    $this.css('height', $this.children('li:first').height()).after('<div class="post-slider-nav"><a class="prevBtn post-nav-prev-' + i + '">Prev</a><a class="nextBtn post-nav-next-' + i + '">Next</a></div>').cycle({
                        before: function (curr, next, opts) {
                            var $this = $(this);
                            $this.parent().stop().animate({
                                height: $this.height()
                            }, opts.speed);
                        },
                        containerResize: false,
                        easing: objPostSlider.easing,
                        fx: 'fixedScrollHorz',
                        fit: true,
                        next: '.post-nav-next-' + i,
                        pause: true,
                        prev: '.post-nav-prev-' + i,
                        slideResize: true,
                        speed: objPostSlider.speed,
                        timeout: objPostSlider.timeout,
                        width: '100%'
                    }).data('slideCount', $postslider.children('li').length);
                });

                // Pause on Nav Hover
                $('.post-slider-nav a').on('mouseenter', function () {
                    $(this).parent().prev().cycle('pause');
                }).on('mouseleave', function () {
                    $(this).parent().prev().cycle('resume');
                });

                // Hide navigation if only a single slide
                if ($postslider.data('slideCount') <= 1) {
                    $postslider.next('.post-slider-nav').hide();
                }

                // Resize
                $(win).on('resize', function () {
                    $postslider.css('height', $postslider.find('li:visible').height());
                });

                // Include Swipe
                if (Modernizr.touch) {

                    $postslider.swipe({
                        swipeLeft: swipeFunc,
                        swipeRight: swipeFunc,
                        allowPageScroll: 'auto'
                    });

                }
            }

        } ());

        /* ---------------------------------------------------- */
        /*	Image Gallery Slider								*/
        /* ---------------------------------------------------- */

        (function () {

            function swipeFunc(e, dir) {

                var $projects = $(e.currentTarget);

                // Enable swipes if more than one slide
                if ($projects.data('slideCount') > 1) {

                    $projects.data('dir', '');

                    if (dir === 'left') {
                        $projects.cycle('next');
                    }

                    if (dir === 'right') {
                        $projects.data('dir', 'prev');
                        $projects.cycle('prev');
                    }

                }

            }

            var $projects = $('.image-gallery-slider > ul');

           if ($projects.length) {
				
	                $(win).load(function () {                    					
	                    $(".js-gallery ul li").each(function () {						
							if ($(this).find("img").length > 0) {
																																
	                            var imgSrc = $(this).find("img").attr("src").toString().split('?')[0]
	                            $(this).find("img").parents("a.bwWrapper").attr("href", imgSrc );//+ "?RenditionID=16"
	                        }
							if ($(this).find("#video_container .video-url").text() != '') {       
								$(".js-gallery ul").attr('style', '');
	                            var videoPath = $.trim($(this).find("#video_container .video-url").text());
	                            $('.video-icon').attr('href', videoPath);                            
								/**/
	                            var videoURL, slashIndex, youtubeVideoID, imageSrc, vimeoID, xVideo, videoVimeoID, vHref, $this;
	                            if (videoPath.toString().indexOf("youtu") !== -1) { //youtube video                                
									videoURL = videoPath.toString();
	                                youtubeVideoID = YouTubeGetID(videoURL);
	                                imageSrc = "//i.ytimg.com/vi/" + youtubeVideoID + "/mqdefault.jpg";
	                                vHref = "http://www.youtube.com/embed/" + youtubeVideoID;
	
	                                $(this).find("#video_container a.video-icon").attr('href', vHref); 
	                                $('.img-video-thumb').attr('src', imageSrc);
	                            }
	                            else if (videoPath.toString().indexOf("vimeo") !== -1) { //vimeo video				                                
									videoURL = videoPath.toString();
									
	                                vimeoID = videoURL.substring(videoURL.lastIndexOf('/') + 1);
	                                xVideo = "http://player.vimeo.com/video/" + vimeoID;
	                                $this = $(this)
	                                var vimeoJsonURL = "http://vimeo.com/api/v2/video/" + vimeoID + ".json";
	                                $.getJSON(vimeoJsonURL, function (data) {
	                                    $.each(data, function () {
	                                        $this.find("#video_container a.video-icon").attr('href', xVideo); //.append("<img src=" + data[0].thumbnail_large + " alt=''/>");
	                                        $('.img-video-thumb').attr('src', data[0].thumbnail_large)
	                                    });
	                                });
	                            }
								else if (videoPath.toString().indexOf(".mp4") !== -1) { //mp4 video																								
								
								//else if (xVideo.toString().toLowerCase().indexOf("mp4") !== -1) { //mp4 video
								var videoURlmp4 = videoPath.toString();	
								$(this).find("#video_container a.video-icon img.img-video-thumb").replaceWith( "<video style='width:100%; height:297px;' controls='' name='media'><source src="+videoURlmp4+" type='video/mp4'></video>" );
								$(this).find("#video_container a.video-icon").addClass("mp4-video-lightbox").removeClass("video-icon");
								
								
									$('.mp4-video-lightbox').fancybox({
									content : '<video controls="" autoplay="" width="800" name="media"><source src="'+videoURlmp4+'" type="video/mp4"></video>',
									width: '70%',
									height: '70%',
									maxWidth: 800,
									maxHeight: 600,
									fitToView: false,
									autoSize: true,
									nextEffect: 'fade',
									prevEffect: 'fade',
									helpers: {
									media: {},
									title: {
									type: 'inside',
									position: 'bottom'
									}
									},
									beforeShow: function () {        		
									$('.fancybox-iframe').height($(window).height() - 300)
									this.title = ''
									this.title += $(this.element).parents('#video_container').find('.lightbox-data').html();
									}
									
									})
									

								}                            
	                            else { //*other video types are not supported
	                                videoURL = videoPath.toString();
	                                $(this).find("#video_container figure a.video-icon").append("<div class='error'>Your video is not supported</div>");
	                            }
	                        } 
							if ($(this).find('a.single-image').attr('href') == '')
								$(this).remove();
	                        /*end if*/
	                        if ($(".js-gallery ul li").length == 0) {
	                            $(".js-gallery").remove();
	                        }
	                    });
	                    function showCaption() {
	                        if ($('.image-gallery-slider figcaption').text().trim().length > 0) {
	                        $('.image-gallery-slider figcaption').each(function () {
	                            $(this).attr('style', 'display: block !important');
	                        });
	                        }
	                    }
	                    /*end*/
	                    $projects.each(function (i) {
	
	                        var $this = $(this);
	
	                        $this.css('_height', $this.children('li:first').height()).after('<div class="gallery-slider-nav"><a class="prevBtn gallery-nav-prev-' + i + '">Prev</a> <a class="nextBtn gallery-nav-next-' + i + '">Next</a> </div>').cycle({
	                            before: function (curr, next, opts) {
	                                var $this = $(this);
	                                $this.parent().stop().animate({
	                                    height: $this.height()
	                                }, opts.speed);
	                            },
	                            containerResize: false,
	                            easing: objGallerySlider.easing,
	                            fit: true,
	                            next: '.gallery-nav-next-' + i,
	                            pause: true,
	                            prev: '.gallery-nav-prev-' + i,
	                            slideResize: true,
	                            speed: objGallerySlider.speed,
	                            timeout: objGallerySlider.timeout,
	                            width: '100%'
	                        }).data('slideCount', $projects.children('li').length);
	                    }, showCaption());
	
	                    // Pause on Nav Hover
	                    $('.gallery-nav a').on('mouseenter', function () {
	                        $(this).parent().prev().cycle('pause');
	                    }).on('mouseleave', function () {
	                        $(this).parent().prev().cycle('resume');
	                    });
	
	                    // Hide navigation if only a single slide
	                    if ($projects.data('slideCount') <= 1) {
	                        $projects.next('.gallery-slider-nav').hide();
	                    }
	
	                });
	
	                // Resize
	                $(win).on('resize', function () {
	                    $projects.css('height', $projects.find('li:visible').height());
	                });
	
	                // Include Swipe
	                if (Modernizr.touch) {
	
	                    $projects.swipe({
	                        swipeLeft: swipeFunc,
	                        swipeRight: swipeFunc,
	                        allowPageScroll: 'auto'
	                    });
	
	                }
	                
            }

        } ());


        /* ---------------------------------------------------- */
        /*	Fancybox											*/
        /* ---------------------------------------------------- */

        (function () {								
									
            if ($('.single-image.link-icon').length || $('.single-image.plus-icon').length || $('.single-image.video-icon').length || $('.map-link').length) {             							
				
                // Link Icon
                $('.single-image.link-icon, .single-image.plus-icon').fancybox({
                    'titleShow': true,
                    'transitionIn': 'fade',
                    'transitionOut': 'fade',
                    'nextEffect': 'fade',
                    'prevEffect': 'fade',
                    'easingIn': 'easeOutBack',
                    'easingOut': 'easeInBack',
                    helpers: {
                        title: {
                            type: 'over'
                        }
					}
                    /*type: 'iframe',
                    'autoSize' :   true,
                    fitToView: true,					
                    beforeShow: function(){
                    this.width = $('.fancybox-iframe').contents().find('img').width();
                    this.height = $('.fancybox-iframe').contents().find('img').height();
                    }*/
                }).each(function () {
                    $(this).append('<span class="curtain"></span>');					
                });             								
				
                 $('.lightbox-data-link').fancybox({
                    nextEffect: 'fade',
                    prevEffect: 'fade',
                    helpers: {
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        }
                    },                   
                     beforeShow: function () {
					var imgPath = domainURL+this.href;

                        this.title = ''
						//console.log("this.title1</br>"+this.title);
						this.title+= "<a target='_blank' href='https://twitter.com/home?status="+ imgPath +"'><img src='/_catalogs/masterpage/xPortal/style library/common/images/icons/twitter.png' alt=''/> </a><a target='_blank' href='https://www.facebook.com/sharer/sharer.php?u="+ imgPath +"'><img src='/_catalogs/masterpage/xPortal/style library/common/images/icons/facebook.png' alt=''/> </a><a target='_blank'  href='https://plus.google.com/share?url="+ imgPath +"'><img src='/_catalogs/masterpage/xPortal/style library/common/images/icons/g+.png' alt=''/> </a>";
                        this.title += $(this.element).next().find('.lightbox-data').html();
						//console.log("this.title2</br>"+this.title);
				
                        //$(this.element).next().find('.promotionDesc').mCustomScrollbar();
                      
                    },
                    afterShow: function () {
                    	console.log($('.fancybox-title .promotionDesc').height());
                 		if($('.fancybox-title .promotionDesc').height()>=75){
	                    	if($('.fancybox-title .promotionDesc').find('.mCustomScrollBox').length==0){
								$('.fancybox-title .promotionDesc').mCustomScrollbar({
								    theme:"inset-dark",
								    alwaysShowScrollbar: 0
								});
							}
						}
                        addthis.toolbox(
							$(".addthis").get()
						);
						addthis.counter(
							$(".addthis_counter").get()
						);
						//$(".promotionDesc").mCustomScrollbar();
						//console.log("YES IAM HERE");
						//console.log($(this.element).find('.promotionDesc'));
						
                    }
                });

                $('.lightbox-data-link-no-addthis').fancybox({                    
                    type: 'inline',                    
                    width: '50%',
					height: '50%',
                    fitToView: false,
                    autoSize: false,				
                    nextEffect: 'fade',
                    prevEffect: 'fade',                    
                    helpers: {
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        }
                    },                   
                    beforeShow: function () {                        
                        //this.title += $(this.element).next().find('.lightbox-data').html();
                        //this.inner.append($(this.element).next().find('.lightbox-data').html());	
						
                    },
					afterLoad: function(){
						$('.fancybox-iframe').addClass('fancy-auto-height');					
					}
															
					
                })

                $('.video-lightbox').fancybox({
                    type: 'iframe',
                    'nextEffect': 'fade',
                    'prevEffect': 'fade',
                    width: '70%',
                    height: '70%',
                    fitToView: false,
                    autoSize: false,
                    helpers: {
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        }
                    },
                    beforeShow: function () {
                        this.title = ''
                        this.title += $(this.element).next().find('.lightbox-data').html();
                    },
                    afterShow: function () {
                       /* addthis.toolbox(
							$(".addthis").get()
						);
                        addthis.counter(
							$(".addthis_counter").get()
						);*/
                    },
                    afterLoad: function () {
                        //$('.fancybox-iframe').contents().find('embed').css('width', '100%')
                    }
                })
/*mp4 fancybox for ie fix*/
                // Video Icon
                $('.single-image.video-icon').fancybox({
                    type: 'iframe',
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    nextEffect: 'fade',
                    prevEffect: 'fade',                    
                    width: '70%',
                    height: '70%',
                    maxWidth: 800,
                    maxHeight: 600,
                    fitToView: false,
                    autoSize: false,
					helpers: {
                        title: {
                            type: 'inside',
                            position: 'bottom'
                        }
                    },
                    beforeShow: function () {
                        this.title = ''
                        this.title += $(this.element).next().find('.lightbox-data').html();
                    },
                    afterShow: function () {
/*                        addthis.toolbox(
							$(".addthis").get()
						);
                        addthis.counter(
							$(".addthis_counter").get()
						);
						*/
                    },
					beforeClose: function(){						
						$('.fancybox-iframe').attr('src','about:blank');	//to fix the js error on close, IE known bug with videos											
					}
                }).each(function () {
                    $(this).append('<span class="curtain"></span>');
                });

                var mapURL;
                var windowURL = window.location.href.toLowerCase().indexOf('/aboutus/');
                if (windowURL !== -1) {
                    //if (_spPageContextInfo.currentLanguage == 1033) {
                    //    mapURL = '/EN/ContactUs/Pages/Contact_Us.aspx?IsDlg=1&';
                    //} else if (_spPageContextInfo.currentLanguage == 1025) {
                    //    mapURL = '/AR/ContactUs/Pages/Contact_Us.aspx?IsDlg=1&';
                    //}
                } else {
                    mapURL = '';
                }


                // Contact us branches map
                $('.map-link a').fancybox({
                    openEffect: 'fade',
                    closeEffect: 'fade',
                    scrolling: 'no',
                    href: mapURL,
                    title: 'Bing Map location',
                    width: '500px',
                    height: '600px',
                    /*maxWidth: 800,
                    maxHeight: 600,*/
                    fitToView: false,
                    position: 'top',
                    autoSize: false,
                    afterLoad: function () {
                        $('.fancybox-iframe').contents().find('#bing-map-js').attr('class', '');
                        $('.fancybox-iframe').contents().find('#Bing-Map-Container [id^="mapContainer_"]').css('min-height', '400px');
                        $('.fancybox-iframe').contents().find('#s4-workspace').css('overflow', 'hidden');

                    },
                    beforeLoad : function() {
						if ($(window).width() < 700){		
							this.width  = "100%";
							this.height = "100%";
						}else{
							this.width  = "500px";
							this.height = "600px";
						}
						
					}

                })

            }

        } ());

        /* end Fancybox --> End */

        (function () {

            function adjustVideos() {

                var $videos = $('.video-container');

                $videos.each(function () {

                    var $this = $(this), playerWidth = $this.parent().actual('width'), playerHeight = playerWidth / $this.data('aspectRatio');

                    $this.css({
                        'height': playerHeight,
                        'width': playerWidth
                    });
                });
            }

            $('.container').each(function () {

                var selectors = [
					"iframe[src^='http://player.vimeo.com']",
					"iframe[src^='http://www.youtube.com']",
					"object",
					"embed"
				], $allVideos = $(this).find(selectors.join(','));

                $allVideos.each(function () {

                    var $this = $(this),
						videoHeight = $this.attr('height') || $this.actual('width'),
						videoWidth = $this.attr('width') || $this.actual('width');

                    if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.video-container').length) {
                        return;
                    }

                    $this.css({
                        'height': '100%',
                        'width': '100%'
                    }).removeAttr('height').removeAttr('width').wrap('<div class="video-container"></div>').parent('.video-container').css({
                        'height': videoHeight,
                        'width': videoWidth
                    }).data('aspectRatio', videoWidth / videoHeight);
                    adjustVideos();
                });

            });

            $(win).on('resize', function () {
                var timer = win.setTimeout(function () {
                    win.clearTimeout(timer);
                    adjustVideos();
                }, 30);
            });

        } ());

        /* end FitVids */

        /* ---------------------------------------------------- */
        /*	Preloader											*/
        /* ---------------------------------------------------- */
/*
        (function () {

            $.preloader = function (el, options) {
                var elem = $(el), methods = {},
					elements = elem.find('.preloader'),
					o = $.extend({}, $.preloader.defaults, options);

                methods = {
                    init: function () {
                        this.loader();
                    },
                    loader: function () {
                        elements.each(function (i, val) {
                            win.setTimeout(function () {
                                $(val).addClass('loader');
                            }, i * o.speed);
                        });
                    }
                };
                methods.init();

                $(win).load(function () {
                    elements.filter('.loader').removeClass('loader');
                });

            };

            $.preloader.defaults = { speed: 250 };

            $.fn.preloader = function (options) {
                if (typeof options === 'object') {
                    return this.each(function () {
                        new $.preloader(this, options);
                    });
                };
            };

            if (!$('.portfolio-items').length) {
                $('.container').preloader({
                    speed: 300
                });
            }
        } ());
*/
        /* end Preloader */

        /* ---------------------------------------------------- */
        /*	Detail Detect touch									*/
        /* ---------------------------------------------------- */

        (function () {

            if (Modernizr.touch) {

                var detailBox = $('.detail-box');

                detailBox.on('click', function (e) {
                    var target = $(e.target);
                    target.addClass('touched');
                });
            }

        } ());

        /* end Detail Detect touch */


    });

    /* ---------------------------------------------------- */
    /*	Notifications										*/
    /* ---------------------------------------------------- */

    $.fn.notifications = function (options) {

        var defaults = { speed: 200 }, o = $.extend({}, defaults, options);

        return this.each(function () {

            var closeBtn = $('<a class="alert-close" href="#"></a>'),
				closeButton = $(this).append(closeBtn).find('> .alert-close');

            function fadeItSlideIt(object) {
                object.fadeTo(o.speed, 0, function () {
                    object.slideUp(o.speed);
                });
            }

            closeButton.click(function () {
                fadeItSlideIt($(this).parent());
                return false;
            });
        });
    };

    /* end jQuery Notifications */

    /* ---------------------------------------------------- */
    /*	Actual Plugin										*/
    /* ---------------------------------------------------- */

    // jQuery Actual Plugin - Version: 1.0.13 (http://dreamerslab.com/)
    ; (function (a) { a.fn.extend({ actual: function (b, l) { if (!this[b]) { throw '$.actual => The jQuery method "' + b + '" you called does not exist'; } var f = { absolute: false, clone: false, includeMargin: false }; var i = a.extend(f, l); var e = this.eq(0); var h, j; if (i.clone === true) { h = function () { var m = "position: absolute !important; top: -1000 !important; "; e = e.clone().attr("style", m).appendTo("body"); }; j = function () { e.remove(); }; } else { var g = []; var d = ""; var c; h = function () { c = e.parents().andSelf().filter(":hidden"); d += "visibility: hidden !important; display: block !important; "; if (i.absolute === true) { d += "position: absolute !important; "; } c.each(function () { var m = a(this); g.push(m.attr("style")); m.attr("style", d); }); }; j = function () { c.each(function (m) { var o = a(this); var n = g[m]; if (n === undefined) { o.removeAttr("style"); } else { o.attr("style", n); } }); }; } h(); var k = /(outer)/g.test(b) ? e[b](i.includeMargin) : e[b](); j(); return k; } }); })(jQuery);

    /* end jQuery Actual Plugin */

} (jQuery, window, Modernizr, navigator, document));
// Avoid `console` errors in browsers that lack a console.
(function(){var method;var noop=function(){};var methods=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];var length=methods.length;var console=(window.console=window.console||{});while(length--){method=methods[length];if(!console[method]){console[method]=noop;}}}());

// fix jquery $ browser
if(typeof $.browser==="undefined"){$.browser=function(){var a=navigator.userAgent.toLowerCase();var b=/msie/.test(a);return{msie:b}}};


