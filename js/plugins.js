(function($) {
	"use strict";

	/* ---------------------------------------------------
		1 - Pagina cargando
	----------------------------------------------------- */
	$(window).on("load", function() {
		$(".preloader").delay(400).fadeOut(600);
	});

	/* ---------------------------------------------------
		2 - Ajustes - barra
	----------------------------------------------------- */
	$("html").niceScroll({
		scrollspeed: 40,
		mousescrollstep: 40,
		zindex: 9999,
		cursorwidth: 10,
		cursorborder: false,
		cursorborderradius: "5px",
		cursorcolor: "rgba(73, 73, 73, 0.54)"
	});

	/* ---------------------------------------------------
		3 - Mouse
	----------------------------------------------------- */
	$("#mouse").on("click", function() {
		$("html, body").animate({
			scrollTop: $("#about-me").offset().top
		}, 1000);
	});

	/* ---------------------------------------------------
		4 - Navegacion
	----------------------------------------------------- */
	// the top nav get visible when scrolling >= 600
	$(window).on("scroll", function() {
		$("#top-nav, #menu").addClass("transition");
		if ($(this).scrollTop() >= 600) {
			$("#top-nav, #menu").addClass("shown");
		} else {
			$("#top-nav, #menu").removeClass("shown");
		}
	});

	/* ---------------------------------------------------
		5 - Ajustes menu
	----------------------------------------------------- */
	var menuBtn = $("#menu"),
		sideMenu = $("#side-menu");
	menuBtn.on("click", function() {
		$(this).toggleClass("active-menu");
		sideMenu.toggleClass("active-side-menu").children("a").removeClass("selected-item");
	});

	$("#side-menu a").on("click", function() {
		$(this).addClass("selected-item").siblings().removeClass("selected-item");
		menuBtn.toggleClass("active-menu");
		sideMenu.toggleClass("active-side-menu");
	});

	$("a[href^='#']").on("click", function(event) {
		var target = $($(this).attr("href"));
		if (target.length) {
			event.preventDefault();
			$("html, body").animate({
				scrollTop: target.offset().top
			}, 1500);
		}
	});

	/* ---------------------------------------------------
		6 - Scroll Porcentaje
	----------------------------------------------------- */
	var scrollTimer = null;
	$(window).on("scroll", function() {
		var viewportHeight = $(this).height(),
			scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
			progress = $(this).scrollTop() / ($(document).height() - viewportHeight),
			distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - $("#scroll").height() / 2;
		$("#scroll")
			.css("top", distance)
			.text(" (" + Math.round(progress * 100) + "%)")
			.fadeIn(100);

		if (scrollTimer !== null) {
			clearTimeout(scrollTimer);
		}
		scrollTimer = setTimeout(function() {
			$("#scroll").fadeOut();
		}, 800);
	});

	/* ---------------------------------------------------
		7 - acordion
	----------------------------------------------------- */
	$(".acc-title").on("click", function() {
		$(".acc-title").not(this).removeClass("active");
		$(this).toggleClass("active");
		$(this).siblings(".acc-content").slideToggle(350);
		$(".acc-title").not(this).siblings(".acc-content").slideUp(300);
	});

	/* ---------------------------------------------------
		8 - Vamos Pa arriba
	----------------------------------------------------- */
	var backToTop = $(".back-to-top");
	$(window).on("scroll", function() {
		if ($(this).scrollTop() >= 400) {
			backToTop.addClass("show-button");
		} else {
			backToTop.removeClass("show-button");
		}
	});

	backToTop.on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 1200);
	});

	/* ---------------------------------------------------
		9 - Animacion de numeros
	----------------------------------------------------- */
	$("#facts").appear(function() {
		$("#number_1").animateNumber({
			number: 2000
		}, 2200);
		$("#number_2").animateNumber({
			number: 120
		}, 2200);
		$("#number_3").animateNumber({
			number: 200
		}, 2200);
		$("#number_4").animateNumber({
			number: 195
		}, 2200);
	}, {
		accX: 0,
		accY: -150
	});

	/* ---------------------------------------------------
		10 - facil
	----------------------------------------------------- */
	$("#skills").appear(function() {
		$(".chart").easyPieChart({
			barColor: "#eaeaea",
			trackColor: false,
			scaleColor: false,
			lineWidth: 10,
			lineCap: "round",
			size: 150,
			animate: 1500
		});

		$("#chart_num_1").animateNumber({
			number: 80
		}, 1500);
		$("#chart_num_2").animateNumber({
			number: 60
		}, 1500);
		$("#chart_num_3").animateNumber({
			number: 50
		}, 1500);
		$("#chart_num_4").animateNumber({
			number: 50
		}, 1500);
	}, {
		accX: 0,
		accY: -10
	});

	/* ---------------------------------------------------
		11 - Plugin
	----------------------------------------------------- */
	$("#Container").mixItUp();

	/* ---------------------------------------------------
		12 - carousel
	----------------------------------------------------- */
	$(".test-owl").owlCarousel({
		loop: true,
		responsiveClass: true,
		margin: 10,
		nav: false,
		dots: false,
		dotsEach: false,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			}
		}
	});

	/* ---------------------------------------------------
		13 - Carousel partners
	----------------------------------------------------- */
	$(".partners-owl-carousel").owlCarousel({
		loop: true,
		responsiveClass: true,
		margin: 10,
		nav: false,
		dots: false,
		dotsEach: false,
		autoplay: true,
		autoplayTimeout: 1500,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			1000: {
				items: 5
			}
		}
	});

	/* ---------------------------------------------------
		14 - Validacion
	----------------------------------------------------- */
	var contactForm = $("#contact-form"),
		submitBtn = $(".submit-btn"),
		formResponse = $(".form-response");
	contactForm.validator().on("submit", function (e) {
			if(e.isDefaultPrevented()) {
				formResponse.text("Lo siento, te falta completar el formulario.").fadeIn(1000);
			} else {
				e.preventDefault();
				submitForm();
			}
		});
		function submitForm() {
			var name = $("#name").val(),
				mail = $("#mail").val(),
				message = $("#message").val();
			$.ajax({
				type: "POST",
				url: "php/contact.php",
				data: "name=" + name + "&mail=" + mail + "&message=" + message,
				beforeSend: function(text) {
					submitBtn.html("Enviando...");
					formResponse.fadeOut(500).text("");
				},
				success: function (text) {
					if(text == "success") {
						contactForm[0].reset();
						formResponse.text("Gracias!, tu mensaje fue enviado correctamente.").fadeIn(1000);
						submitBtn.html("Enviar Mensaje");
					} else {
						formResponse.text(text).fadeIn(1000);
					}
				}
			});
		}

	$(".contact .form-control").focusout(function() {
		var textValue = $(this).val();
		if (textValue === "") {
			$(this).removeClass("has-value");
		} else {
			$(this).addClass("has-value");
		}
	});
})(jQuery);
