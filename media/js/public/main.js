app.fnParseLocation = function() {
  var urls = ['news', 'research', 'people', 'publications', 'resources', 'contact'],
      tab = urls.filter(function(val) { return window.location.pathname.indexOf('/' + val) != -1; });
  if (!tab.length) { return 'home'; }
  return tab[0];
};

app.fnChangeView = function() {
  var tab = app.fnParseLocation();
  $("a.nav-hover.active").removeClass("active");
  $("#nav-"+ tab).addClass("active");
  $("#main").removeClass().removeAttr("style").addClass("DASmain DAS" + tab);
  if (!$("#DasFOOTER").is(":visible")) {
    $("#DasFOOTER").css("display", "inline");
  }

  if (tab == 'publications') {
    $("table.previous").hide();
    $("p.previous").hide();
    $(".DASpublications").css("height", $("table.current:last").offset().top + 300);

    $("#search").on("click", function() { $("#arrow")[0].click(); });
    $("#arrow2, #expand").on("click", function() {
      $("p.previous").fadeToggle(150);
      $("table.previous").fadeToggle(150, function() {
        if ($(this).is(":visible")) {
          $("#arrow2").children().addClass("imgsp_collapse").removeClass("imgsp_arrow");
          $(".DASpublications").css("height", $("table.previous:last").offset().top + 200);
        } else {
          $("#arrow2").children().removeClass("imgsp_collapse").addClass("imgsp_arrow");
          $(".DASpublications").css("height", $("table.current:last").offset().top + 300);
        }
      });
    });

  } else if (tab == 'people') {
    var current_member = $("tr.current_member").length - 1,
        past_member = $("span.past_member").length,
        height_adjust = current_member * 200 + past_member * 60;
    $(".DASpeople").css("height", height_adjust + 850);

  } else if (tab == 'news') {
    $("tr.previous").hide();
    $(".DASnews").css("height", $("tr.middle").offset().top + 200);

    $("#arrow, #previous").on("click", function() {
      $("tr.previous").fadeToggle(150, function() {
        if ($(this).is(":visible")) {
          $("#arrow").children().addClass("imgsp_collapse").removeClass("imgsp_arrow");
          $(".DASnews").css("height", $("tr.last").offset().top + 200);
        } else {
          $("#arrow").children().removeClass("imgsp_collapse").addClass("imgsp_arrow");
          $(".DASnews").css("height", $("tr.middle").offset().top + 200);
        }
      });
    });

  } else if (tab == 'home' && window.location.pathname == '/') {
    $("#DasFOOTER").css("display", "none");
    $("#main").prop("style", "height: 700px !important");
    $("#home_center").carousel({'interval': 5000, 'keyboard': false, 'pause': 'none'});
  }

  $("#DasCONTENT").fadeTo(100, 1);
  if (typeof this.callbackChangeView === "function") {
    this.callbackChangeView();
  }
};

app.fnChangeLocation = function(href) {
  if (window.history.replaceState) {
    window.history.replaceState({} , '', href);
  } else {
    window.location.href = href;
  }
  $("#DasCONTENT").load(href + " #content_wrapper", app.fnChangeView);
};


$(document).ready(function() {
  app.fnChangeView();

  $("#top").on("click", function (event) {
    event.preventDefault();
    $('#top > div').animate({'right': '-5%', 'opacity': 0}, 125);
    $("html, body").stop().animate({'scrollTop': 0}, 250);
  });

  $("#DasNAV a.nav-hover").on("click", function(event) {
    var href = $(this).attr("href");
    event.preventDefault();

    $("#DasCONTENT").fadeTo(100, 0, function() {
      app.fnChangeLocation(href);
    });
  });
});


$(window).on("scroll", function() {
  clearTimeout($.data(this, 'resizeTimer'));
  $.data(this, 'resizeTimer', setTimeout(function() {
    if ($(this).scrollTop() > $(window).height() / 2) {
      $('#top > div').animate({'right': '5%', 'opacity': 0.85}, 125);
    } else {
      $('#top > div').animate({'right': '-5%', 'opacity': 0}, 125);
    }
  }, 200));
});