google.load('visualization', '1', {packages: ['corechart', 'calendar']});
google.setOnLoadCallback(drawDash);


function readyHandler() {
    $(".place_holder").each(function() {
        if ($(this).html().length > 0) { $(this).removeClass("place_holder"); }
    });
}


function drawDash() {
    var chart = new google.visualization.ChartWrapper({
        'chartType': 'Calendar',
        'dataSourceUrl': '/admin/git_stat?qs=c',
        'containerId': 'plot_c',
        'options': {
            'title': 'Last Year',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'calendar': {
                'cellColor': {'stroke': '#fff'},
                'underYearSpace': 20,
                'yearLabel': {'color': '#c28fdd', 'bold': true},
                'monthLabel': {'color': '#000'},
                'monthOutlineColor': {'stroke': '#d86f5c', 'strokeOpacity': 0.8, 'strokeWidth': 2},
                'dayOfWeekLabel': {'color': '#000'}
            },
            'colorAxis': { 'minValue': 0, 'colors': ['#e8f9f5', '#5496d7']},
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
    google.visualization.events.addListener(chart, 'ready', readyHandler);
    chart.draw();

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'AreaChart',
        'dataSourceUrl': '/admin/git_stat?qs=ad',
        'containerId': 'plot_ad',
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'bottom'},
            'title': 'Weekly Aggregation',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'vAxis': {
                'title': 'Count (#)',
                'titleTextStyle': {'bold': true},
            },
            'hAxis': {
                'gridlines': {'count': -1},
                'textStyle': {'italic': true},
                'format': 'MMM dd'
            },
            'lineWidth': 3,
            'pointSize': 5,
            'colors': ['#29be92', '#ff5c2b'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
    google.visualization.events.addListener(chart, 'ready', readyHandler);
    chart.draw();

    var chart = new google.visualization.ChartWrapper({
        'chartType': 'PieChart',
        'dataSourceUrl': '/admin/git_stat?qs=au',
        'containerId': 'plot_pie',
        'options': {
            'chartArea': {'width': '90%', 'left': '10%'},
            'legend': {'position': 'bottom'},
            'title': 'Contributors Commits',
            'titleTextStyle': {'bold': false, 'fontSize': 16},
            'pieHole': 0.33,
            'colors': ['#3ed4e7', '#ff912e', '#29be92', '#ff5c2b'],
            'animation': {'startup': true, 'duration': 1000, 'easing': 'inAndOut'}
        }
    });
    google.visualization.events.addListener(chart, 'ready', readyHandler);
    chart.draw();

}


$.ajax({
    url : "/admin/git_stat?qs=init&tqx=reqId%3A52",
    dataType: "json",
    success: function (data) {
        var html = "";
        for (var i = 0; i < data.contrib.length; i++) {
            html += '<tr><td>' + data.contrib[i].Contributors + '</td><td><span class="pull-right" style="color:#00f;">' + data.contrib[i].Commits + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span class="pull-right" style="color:#080;">' + data.contrib[i].Additions + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td><td><span class="pull-right" style="color:#f00;">' + data.contrib[i].Deletions + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td></tr>';
        }
        $("#git_table_body").html(html).removeClass('place_holder');
    }
});

