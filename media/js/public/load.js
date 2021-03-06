var more_success, more_fail;

if (app.DEBUG_DIR) {
    more_success = [
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + app.js_ver.bootstrap + '/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + app.js_ver.bootstrap + '/js/bootstrap.min.js'
    ];
    more_fail = [
        '/site_media/js/public/min/core.min.js',
        '/site_media/css/bootstrap.min.css'
    ];
} else {
    more_success = [
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + app.js_ver.bootstrap + '/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + app.js_ver.bootstrap + '/js/bootstrap.min.js'
    ];
    more_fail = [
        '/site_media/js/jquery.min.js',
        '/site_media/js/bootstrap.min.js',
        '/site_media/css/bootstrap.min.css'
    ];
}

head.load('https://cdnjs.cloudflare.com/ajax/libs/jquery/' + app.js_ver.jquery + '/jquery.min.js', function() {
    head.test(window.$, [''], ['/site_media/js/jquery.min.js'], function(flag) {
        app.isCDN = flag;
        $("head").append('<link rel="shortcut icon" type="image/gif" href="/site_media/images/icon_daslab.png" />');
        $("head").append('<link rel="icon" type="image/gif" href="/site_media/images/icon_daslab.png" />');

        head.load(app.isCDN ? more_success : more_fail, function() {
            $.ajaxSetup({'cache': true});
            if (window.location.pathname.indexOf('/group') != -1 && $("div.BODY-ERR").length == 0) {
                $.getScript('/site_media/js/group/' + app.DEBUG_DIR + 'menu' + app.DEBUG_STR + '.js');
                if (!app.DEBUG_DIR) {
                    $.getScript('/site_media/js/group/' + app.DEBUG_DIR + 'email' + app.DEBUG_STR + '.js');
                }
                google.charts.load('visualization', '1', {packages: ['corechart']});
            } else {
                $.getScript('/site_media/js/public/' + app.DEBUG_DIR + 'main' + app.DEBUG_STR + '.js');
            }
        });
    });
});
