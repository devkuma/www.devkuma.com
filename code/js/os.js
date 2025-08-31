function browserOS() {
    var currentOS = null;
    var mobile = (/Android|iPhone|iPod|iPod|BlackBerry|Windows CE|SAMSUNG|LG|MOT|SonyEricsson/i.test(navigator.userAgent.toLowerCase()));

    if (mobile) {
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.search("android") > -1)
            currentOS = "android";
        else if ((userAgent.search("iphone") > -1) || (userAgent.search("ipod") > -1)
                    || (userAgent.search("ipad") > -1))
            currentOS = "ios";
        else
            currentOS = "mobile_etc";
    } else {
        currentOS = "nomobile";
    }
    return currentOS;
}

function isMobile() {
    if(browserOS() == "nomobile") {
        return false;
    }
    return true;
}

function isAndroid() {
    if(browserOS() == "android") {
        return true;
    }
    return false;
}

function doOnOrientationChange() {
    switch(window.orientation) {
        case -90:
        case 90:
            return "landscape";
        default:
            return "portrait";
    }
}