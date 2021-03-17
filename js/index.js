$(function () {
    var initMap = function (data) {
        $('#map').vectorMap({
            map: 'cn_merc_en',
            backgroundColor: '#253449',
            zoomMin: 0.9,
            zoomMax: 4.4,
            focusOn: {
                x: 0.55,
                y: 2,
                scale: 0.9
            },
            regionStyle: {
                initial: {
                    fill: '#e5e5e5',
                    stroke: 'none',
                },
                hover: {
                    fill: '#ccc'
                },
                selected: {
                    fill: 'yellow'
                },
                selectedHover: {}
            },
            markerStyle: {
                initial: {
                    fill: '#FF8C00',
                    stroke: '#fff',

                },
                hover: {
                    fill: '#fd2020',
                    stroke: '#fff',
                },
            },
            markers: [...data],
            series: {
                markers: [{
                    attribute: 'r',
                    scale: [4, 8],
                    values: data.map(function (c, i, a) {
                        if (c.freq && Number.isInteger(c.freq)) {
                            if (c.freq > 10) return 10;
                            else if (c.freq < 1) return 1;
                            else return c.freq;
                        } else {
                            return 1;
                        }
                    })
                }]
            },
            onMarkerClick(e, code) {
                clickItem = data[code];
                if (clickItem) {
                    $('#info_bar').fadeIn();
                    $('#info_bar_title').text(clickItem.name)
                    if (clickItem.desc) {
                        $('#info_bar_desc').text(clickItem.desc)
                    } else {
                        $('#info_bar_desc').text("")
                    }

                    var photos = clickItem.photos;
                    if (photos && Array.isArray(photos)) {
                        $('#info_bar_photos').empty()
                        for (let i = 0; i < photos.length; i++) {
                            var p_img = document.createElement("img");
                            p_img.setAttribute('class', 'info_bar_photo');
                            p_img.setAttribute('title', '点击放大');
                            p_img.src = photos[i];
                            $('#info_bar_photos').append(p_img)
                        }
                    } else {
                        $('#info_bar_photos').empty()
                    }
                    $('#info_bar_close_btn').click(function () {
                        $('#info_bar').fadeOut('fast');
                    });
                }
            },
            onRegionClick() {
                $('#info_bar').fadeOut("fast");
            }
        }, );
    }

    $('body').on('click', '.info_bar_photo', function () {
        var _this = $(this);
        imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
    })
    $.getJSON('/data/config.json', function (data) {
        initMap(data)
    });

    lovexhjSitetime();

});

function imgShow(outerdiv, innerdiv, bigimg, _this) {
    var src = _this.attr("src");
    $(bigimg).attr("src", src);
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width();
        var windowH = $(window).height();
        var realWidth = this.width;
        var realHeight = this.height;
        var imgWidth, imgHeight;
        var scale = 0.8;

        if (realHeight > windowH * scale) {
            imgHeight = windowH * scale;
            imgWidth = imgHeight / realHeight * realWidth;
            if (imgWidth > windowW * scale) {
                imgWidth = windowW * scale;
            }
        } else if (realWidth > windowW * scale) {
            imgWidth = windowW * scale;
            imgHeight = imgWidth / realWidth * realHeight;
        } else {
            imgWidth = realWidth;
            imgHeight = realHeight;
        }
        $(bigimg).css("width", imgWidth);

        var w = (windowW - imgWidth) / 2;
        var h = (windowH - imgHeight) / 2;
        $(innerdiv).css({
            "top": h,
            "left": w
        });
        $(outerdiv).fadeIn("fast");
    });

    $(outerdiv).click(function () {
        $(this).fadeOut("fast");
    });


}

function lovexhjSitetime() {
    window.setTimeout("lovexhjSitetime()", 1000);
    var seconds = 1000
    var minutes = seconds * 60
    var hours = minutes * 60
    var days = hours * 24
    var years = days * 365
    var today = new Date()
    var todayYear = today.getFullYear()
    var todayMonth = today.getMonth() + 1
    var todayDate = today.getDate()
    var todayHour = today.getHours()
    var todayMinute = today.getMinutes()
    var todaySecond = today.getSeconds()
    // 时间设置
    var t1 = Date.UTC(2017, 11, 04, 15, 15, 00)
    var t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond)
    var diff = t2 - t1
    var diffYears = Math.floor(diff / years)
    var diffDays = Math.floor((diff / days) - diffYears * 365)
    var diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours)
    var diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes)
    var diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours -
        diffMinutes * minutes) / seconds)
    document.getElementById("lovexhjSitetime").innerHTML = "我们相恋了" + diffYears + "年" + diffDays + "天" +
        diffHours + "小时" + diffMinutes + "分钟" + diffSeconds + "秒啦";

    $('#map').height(3 / 6 * $('#map').width())
    window.onresize = function () {
        $('#map').height(1 / 2 * $('#map').width())
    }
}