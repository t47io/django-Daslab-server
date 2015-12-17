var $ = django.jQuery;

function replace_path(string) {
	return string.replace('/home/ubuntu/Server_DasLab/data/', '/site_data/').replace('/Website_Server/Daslab/data/', '/site_data/')
}

$(document).ready(function () {
	// $('script[src="/static/admin/js/admin/DateTimeShortcuts.js"]').remove();
	// $('script[src="/static/admin/js/jquery.js"]').remove();
	// $('script[src="/static/admin/js/jquery.init.js"]').remove();

	$("label.required").css("font-weight", "bold");
	$("table").addClass("table-hover").removeClass("table-bordered table-condensed");
	$('[scope="col"]').addClass("info");

	$("a.deletelink").css("box-sizing", "border-box");
	$("input").addClass("form-control");
	$("select").addClass("form-control");
	$("textarea").addClass("form-control");
	$("span.add-on").html('<span class="glyphicon glyphicon-calendar"></span>').addClass("input-group-addon").removeClass("add-on");

	$('th > div.text > span > input[type="checkbox"]').each(function() {
		var parent = $(this).parent();
		$(this).css("display", "");
		$(this).detach().insertBefore(parent);
	});
	$('input[type="checkbox"], input[type="radio"]').each(function() {
		$(this).parent().addClass("checkbox");
		if ($(this).next().is("label")) {
			$(this).prependTo($(this).next());
		} else {
			$(this).removeClass("form-control");
			$(this).next().css("padding-left", "10px");
			$('<label></label>').insertBefore($(this));
			var elem = $(this).prev();
			$(this).next().appendTo(elem);
			$('<span class="cr"><span class="cr-icon glyphicon glyphicon-ok"></span></span>').prependTo(elem);
			$(this).prependTo(elem);
			$('<div class="checkbox"></div>').insertBefore(elem);
			elem.appendTo(elem.prev());
		}
	});

	$('p.file-upload > a').each(function() {
		$(this).replaceWith('<div class="form-inline"><label>Current:&nbsp;&nbsp;</label><input class="form-control" disabled="disabled" style="cursor:text;" value="' + $(this).attr("href") + '">&nbsp;&nbsp;<a href="'+ replace_path($(this).attr("href")) + '" class="btn btn-default" target="_blank"><span class="glyphicon glyphicon-cloud-download"></span>&nbsp;&nbsp;View&nbsp;&nbsp;</a></div>');
	});
	$('.clearable-file-input').each(function() {
		$(this).appendTo($(this).prev());
		$(this).children().contents().filter(function () {return this.data === "Clear";}).replaceWith("&nbsp;&nbsp;<span class='glyphicon glyphicon-remove-sign'></span>&nbsp;Clear");
	});
	$('input[type="file"]').each(function() {
		$('<div class="form-inline"><label>Change:&nbsp;&nbsp;</label><input id="' + $(this).attr("id") + '_disp" class="form-control" placeholder="No file chosen" disabled="disabled" style="cursor:text;"/>&nbsp;&nbsp;<div id="' + $(this).attr("id") + '_btn" class="fileUpload btn btn-info"><span><span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Browse&nbsp;&nbsp;</span></div>').insertAfter(this);
		$(this).detach().appendTo('#' + $(this).attr("id") + '_btn');

        $(this).on("change", function () {
            $('#' + $(this).attr("id") + '_disp').val($(this).val().replace("C:\\fakepath\\", ""));
        });
		$('.file-upload').contents().filter(function () {return this.data === "Change: " | this.data === "Currently: ";}).remove();
	});
	$('input[disabled="disabled"]').each(function() {
		$(this).width($(this).width()*2.5);
	});

	$(".toggle.descending").html('<span class="glyphicon glyphicon-chevron-up"></span>');
	$(".toggle.ascending").html('<span class="glyphicon glyphicon-chevron-down"></span>');
	$(".sortremove").html('<span class="glyphicon glyphicon-remove"></span>');
	$(".sortoptions").addClass("pull-right").removeClass("sortoptions");
	$("div.pagination-info").html("<br/>&nbsp;&nbsp;&nbsp;&nbsp;" + $("div.pagination-info").html());

    if ($(location).attr("href").indexOf("admin/src/news") != -1) {
		$("th.column-date").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-content").addClass("col-lg-6 col-md-6 col-sm-6 col-xs-6");
		$("th.column-link").addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");

		$("td.field-link").css({"word-break":"break-all", "text-decoration":"underline"});
		$("td.field-content").each(function() { $(this).html($(this).text()); });

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-content > div.text > a").html('<span class="glyphicon glyphicon-list-alt"></span>&nbsp;&nbsp;Content');
		$("th.column-link > div.text > a").html('<span class="glyphicon glyphicon-globe"></span>&nbsp;&nbsp;URL');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-picture"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-picture"></span>&nbsp;&nbsp;')
    } else if ($(location).attr("href").indexOf("admin/src/publication") != -1) {
		$("th.column-year").addClass("col-lg-1 col-md-1 col-sm-1 col-xs-1");
		$("th.column-journal").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-authors").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-title").addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");
		$("th.column-link").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");

		$("td.field-authors").css("word-break", "break-all");
		$("td.field-title").css({"word-break":"break-all", "font-weight":"bold"});
		$("td.field-link").css({"word-break":"break-all", "text-decoration":"underline"});
		$("td.field-journal").css("font-style", "italic");

		$("th.column-year > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Year');
		$("th.column-journal > div.text > a").html('<span class="glyphicon glyphicon-book"></span>&nbsp;&nbsp;Journal');
		$("th.column-authors > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Authors');
		$("th.column-title > div.text > a").html('<span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;Title');
		$("th.column-link > div.text > a").html('<span class="glyphicon glyphicon-globe"></span>&nbsp;&nbsp;URL');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-education"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-education"></span>&nbsp;&nbsp;')
	} else if ($(location).attr("href").indexOf("admin/src/member") != -1) {
		$("th.column-full_name").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-sunet_id").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-year").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-joint_lab").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-affiliation").addClass("col-lg-4 col-md-4 col-sm-4 col-xs-4");

		$("th.field-full_name").css("font-weight", "bold");
		$("td.field-sunet_id").each(function() { $(this).html("<kbd>" + $(this).html() + "</kbd>");	});

		$("th.column-full_name > div.text > a").html('<span class="glyphicon glyphicon-credit-card"></span>&nbsp;&nbsp;Full Name');
		$("th.column-sunet_id > div.text > a").html('<span class="glyphicon glyphicon-qrcode"></span>&nbsp;&nbsp;SUNet ID');
		$("th.column-year > div.text > a").html('<span class="glyphicon glyphicon-hourglass"></span>&nbsp;&nbsp;Status');
		$("th.column-joint_lab > div.text > a").html('<span class="glyphicon glyphicon-home"></span>&nbsp;&nbsp;Joint Lab');
		$("th.column-affiliation > div.text > a").html('<span class="glyphicon glyphicon-education"></span>&nbsp;&nbsp;Affiliation');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-user"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;')
	} else if ($(location).attr("href").indexOf("admin/src/flashslide") != -1) {
		$("th.column-date").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-link").addClass("col-lg-9 col-md-9 col-sm-9 col-xs-9");

		$("td.field-link").css("text-decoration", "underline");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-link > div.text > a").html('<span class="glyphicon glyphicon-globe"></span>&nbsp;&nbsp;URL');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-blackboard"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-blackboard"></span>&nbsp;&nbsp;')
	} else if ($(location).attr("href").indexOf("admin/src/journalclub") != -1) {
		$("th.column-date").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-presenter").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-title").addClass("col-lg-5 col-md-5 col-sm-5 col-xs-5");
		$("th.column-link").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");

		$("td.field-link").css("text-decoration", "underline");
		$("td.field-presenter").css("font-weight", "bold");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-presenter > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Presenter');
		$("th.column-title > div.text > a").html('<span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;Title');
		$("th.column-link > div.text > a").html('<span class="glyphicon glyphicon-globe"></span>&nbsp;&nbsp;URL');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-book"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-book"></span>&nbsp;&nbsp;')
	} else if ($(location).attr("href").indexOf("admin/src/rotationstudent") != -1) {
		$("th.column-date").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-full_name").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-title").addClass("col-lg-6 col-md-6 col-sm-6 col-xs-6");

		$("td.field-full_name").css("font-weight", "bold");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-full_name > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Student');
		$("th.column-title > div.text > a").html('<span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;Title');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-retweet"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-retweet"></span>&nbsp;&nbsp;')
 	} else if ($(location).attr("href").indexOf("admin/src/eternayoutube") != -1) {
		$("th.column-date").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-presenter").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-title").addClass("col-lg-5 col-md-5 col-sm-5 col-xs-5");
		$("th.column-link").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");

		$("td.field-presenter").css("font-weight", "bold");
		$("td.field-link").css("text-decoration", "underline");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-presenter > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Presenter');
		$("th.column-title > div.text > a").html('<span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;Title');
		$("th.column-link > div.text > a").html('<span class="glyphicon glyphicon-globe"></span>&nbsp;&nbsp;URL');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-facetime-video"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-facetime-video"></span>&nbsp;&nbsp;')
 	} else if ($(location).attr("href").indexOf("admin/src/presentation") != -1) {
		$("th.column-date").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-presenter").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-title").addClass("col-lg-6 col-md-6 col-sm-6 col-xs-6");

		$("td.field-presenter").css("font-weight", "bold");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-presenter > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Student');
		$("th.column-title > div.text > a").html('<span class="glyphicon glyphicon-send"></span>&nbsp;&nbsp;Title');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-cd"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-cd"></span>&nbsp;&nbsp;')
 	} else if ($(location).attr("href").indexOf("admin/src/slackmessage") != -1) {
		$("th.column-date").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-receiver").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-message").addClass("col-lg-8 col-md-8 col-sm-8 col-xs-8");

		$("th.column-date > div.text > a").html('<span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Date');
		$("th.column-receiver > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Receiver');
		$("th.column-message > div.text > a").html('<span class="glyphicon glyphicon-compressed"></span>&nbsp;&nbsp;Message (Content + Attachment)');

		$("td.field-receiver").each(function() { $(this).html("<a>" + $(this).html() + "</a>");	});
		$("td.field-message").each(function() { $(this).html('<div class="well well-sm" style="font-family:monospace;">' + $(this).html() + "</div>");	});

		$("div.col-md-6 > h2.legend").html('<img src="/site_media/images/icons/slack.png" style="vertical-align:text-top;" height="16px">&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<img src="/site_media/images/icons/slack.png" height="21" style="vertical-align:text-top;">&nbsp;&nbsp;')
	} else if ($(location).attr("href").indexOf("admin/auth/user") != -1) {
		$("th.column-username").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");
		$("th.column-email").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-last_login").addClass("col-lg-3 col-md-3 col-sm-3 col-xs-3");
		$("th.column-is_active").addClass("col-lg-1 col-md-1 col-sm-1 col-xs-1");
		$("th.column-is_staff").addClass("col-lg-1 col-md-1 col-sm-1 col-xs-1");
		$("th.column-is_superuser").addClass("col-lg-2 col-md-2 col-sm-2 col-xs-2");

		$("th.field-username").css("font-style", "italic");
		$("td.field-email").css("text-decoration", "underline");

		$("th.column-username > div.text > a").html('<span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;Username');
		$("th.column-email > div.text > a").html('<span class="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;Email Address');
		$("th.column-last_login > div.text > a").html('<span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;Last Login');
		$("th.column-is_active > div.text > a").html('<span class="glyphicon glyphicon-pawn"></span>&nbsp;&nbsp;Active');
		$("th.column-is_staff > div.text > a").html('<span class="glyphicon glyphicon-queen"></span>&nbsp;&nbsp;Staff');
		$("th.column-is_superuser > div.text > a").html('<span class="glyphicon glyphicon-king"></span>&nbsp;&nbsp;Admin');

		$("div.col-md-6 > h2.legend").html('<span class="glyphicon glyphicon-lock"></span>&nbsp;' + $("div.col-md-6 > h2.legend").html() + '<span class="pull-right" style="font-weight:normal; font-size: 12px;">(Click values in first column to edit)</span>');
		$("ul.breadcrumb > li:first").next().remove();
		$("ul.breadcrumb > li:first").next().prepend('<span style="color: #000;" class="glyphicon glyphicon-lock"></span>&nbsp;&nbsp;')

	}

});


$(window).load(function () {
	setTimeout(function() {
		$(".vDateField").each(function () {
			$(this).next().detach().appendTo($(this).parent());
			$(this).removeAttr("size");
			$(this).next().detach().insertAfter($(this).parent());
			$(this).parent().addClass("input-group").removeClass("");

			$('<div class="input-group-btn"><a class="btn btn-default" id="' + $(this).attr("id") + '_cal"><span class="glyphicon glyphicon-calendar"></span>&nbsp;&nbsp;Calendar&nbsp;&nbsp;</a><a class="btn btn-primary" id="' + $(this).attr("id") + '_today"><span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;Today&nbsp;&nbsp;</a></div>').insertAfter($(this));
			$(this).css("width", "auto");

			if ($(this).parent().next().hasClass("datetimeshortcuts")) {
				var elem = $(this).parent().next();
			} else {
				// $('<br><br>').insertBefore($(this).parent().next());
				$(this).parent().next().css("display", "block");
				var elem = $(this).siblings().last();
			}
			$('#' + $(this).attr("id") + '_cal').attr("href", elem.children().last().attr("href"));
			$('#' + $(this).attr("id") + '_cal').on("click", function() {
				var self = $(this);
				setTimeout(function () {
					$(".calendarbox.module").css("left", self.offset().left);
					$(".calendarbox.module").css("top", self.offset().top + 50);
				}, 50);
			});
			$('#' + $(this).attr("id") + '_today').attr("href", elem.children().first().attr("href"));

			elem.css("display", "none");
			$('<p class="datetime input-group"></p>').insertBefore($(this));
			var p = $(this).prev();
			$(this).next().detach().appendTo(p);
			$(this).detach().prependTo(p);
			$("span.timezonewarning").addClass("label label-default");
		});

		$(".vTimeField").each(function () {
			$(this).next().detach().appendTo($(this).parent());
			$(this).removeAttr("size");
			$(this).next().detach().insertAfter($(this).parent());
			$(this).parent().addClass("input-group").removeClass("");

			$('<div class="input-group-btn"><a class="btn btn-default" id="' + $(this).attr("id") + '_clk"><span class="glyphicon glyphicon-time"></span>&nbsp;&nbsp;Clock&nbsp;&nbsp;</a><a class="btn btn-primary" id="' + $(this).attr("id") + '_now"><span class="glyphicon glyphicon-map-marker"></span>&nbsp;&nbsp;Now&nbsp;&nbsp;</a></div>').insertAfter($(this));
			$(this).css("width", "auto");

			if ($(this).parent().next().hasClass("datetimeshortcuts")) {
				var elem = $(this).siblings().last();
			} else {
				// $('<br><br>').insertBefore($(this).parent().next());
				$(this).parent().next().css("display", "block");
				var elem = $(this).siblings().last();
			}
			$('#' + $(this).attr("id") + '_clk').attr("href", elem.children().last().attr("href"));
			$('#' + $(this).attr("id") + '_clk').on("click", function() {
				var self = $(this);
				setTimeout(function () {
					$(".clockbox.module").css("left", self.offset().left);
					$(".clockbox.module").css("top", self.offset().top + 50);
				}, 50);
			});
			$('#' + $(this).attr("id") + '_now').attr("href", elem.children().first().attr("href"));

			elem.css("display", "none");
			$('<p class="datetime input-group"></p>').insertBefore($(this));
			var p = $(this).prev();
			$(this).next().detach().appendTo(p);
			$(this).detach().prependTo(p);
			$("span.timezonewarning").addClass("label label-default");
		});


		if ($(location).attr("href").indexOf("admin/auth/user") != -1) {
			$("span.help-icon").removeClass("help help-tooltip help-icon").addClass("glyphicon glyphicon-question-sign");
			$("select").addClass("form-control").removeClass("filtered");
			$("input[placeholder='Filter']").addClass("form-control").parent().addClass("input-group");
			$("<br/>").insertAfter($("input[placeholder='Filter']").parent())
			$('<div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>').insertAfter($("input[placeholder='Filter']"))
			$("img[src='/static/admin/img/selector-search.svg']").parent().remove();
			$('<span class="glyphicon glyphicon-question-sign"></span>').insertAfter($("img[src='/static/admin/img/icon-unknown.svg']"))
			$("img[src='/static/admin/img/icon-unknown.svg']").remove();

			$("a.selector-add").addClass("btn btn-inverse").html('<span class="glyphicon glyphicon-circle-arrow-right"></span>')
			$("a.selector-remove").addClass("btn btn-default").html('<span class="glyphicon glyphicon-circle-arrow-left"></span>')
			$("a.add-related").addClass("btn btn-blue").html('<span class="glyphicon glyphicon-plus-sign"></span>&nbsp;&nbsp;Add Group')
			$("<br/>").insertBefore($("a.selector-chooseall"));
			$("a.selector-chooseall").addClass("btn btn-info").html('<span class="glyphicon glyphicon-ok-sign"></span>&nbsp;&nbsp;Choose All');
			$("<br/>").insertBefore($("a.selector-clearall"));
			$("a.selector-clearall").addClass("btn btn-default").html('<span class="glyphicon glyphicon-remove-sign"></span>&nbsp;&nbsp;Remove All');
		}

		$("img[src$='/static/admin/img/icon-yes.svg']").each(function() {
			var newElem = $('<span class="label label-green"><span class="glyphicon glyphicon-ok-sign"></span></span>');
			$(this).replaceWith(newElem);
		});
		$("img[src$='/static/admin/img/icon-no.svg']").each(function() {
			var newElem = $('<span class="label label-danger"><span class="glyphicon glyphicon-remove-sign"></span></span>');
			$(this).replaceWith(newElem);
		});
		$("img[src$='/static/admin/img/icon-changelink.svg']").each(function() {
			var newElem = $('<span class="label label-warning"><span class="glyphicon glyphicon-edit"></span></span>');
			$(this).replaceWith(newElem);
		});
		$("img[src$='/static/admin/img/icon-addlink.svg']").each(function() {
			var newElem = $('<span class="label label-success"><span class="glyphicon glyphicon-plus-sign"></span></span>');
			$(this).replaceWith(newElem);
		});

	}, 50);

});
