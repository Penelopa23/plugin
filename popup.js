function readProperty(property, defValue) {
    if (localStorage.getItem(property) === null) {
        localStorage.setItem(property, defValue);
    }
    return localStorage.getItem(property);
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.method == "getLocalStorage") {
            var value = localStorage.getItem(request.key);
            sendResponse({data: value})
        }
    })

function clearSizes(screenChoosed) {
    if (screenChoosed === "original") {
        $('#bigSize')[0].style.display = 'none'
        $('#smallSize')[0].style.display = 'none'
        $('#manualSize')[0].style.display = 'none'
    } else if (screenChoosed === 'bigSize') {
        $('#original')[0].style.display = 'none'
        $('#smallSize')[0].style.display = 'none'
        $('#manualSize')[0].style.display = 'none'
    } else if (screenChoosed === 'smallSize') {
        $('#original')[0].style.display = 'none'
        $('#bigSize')[0].style.display = 'none'
        $('#manualSize')[0].style.display = 'none'
    } else {
        $('#original')[0].style.display = 'none'
        $('#bigSize')[0].style.display = 'none'
        $('#smallSize')[0].style.display = 'none'
    }
}


$('#autoLoginSvg')[0].style.color = readProperty('autoLoginSvg', 'green') === 'true' ? 'green' : 'red';
if (localStorage.getItem('yourLogin') === null || localStorage.getItem('yourPassword') === null) {
    $('#autoLoginSvg')[0].style.color = 'red';
    $('#autoLogin')[0].style.display = 'none'
    $('#saveButton')[0].style.display = 'block';
    $('#pswd')[0].style.display = 'block';
    $('#lgn')[0].style.display = 'block';
} else {
    console.log("safasfasfasf")
    $('#autoLoginSvg')[0].style.color = 'green';
    $('#saveButton')[0].style.display = 'none';
    $('#pswd')[0].style.display = 'none';
    $('#lgn')[0].style.display = 'none';
    $('#autoLogin')[0].style.display = 'block'
    $('#autoLogin')[0].textContent = `Your Login: ${localStorage.getItem('yourLogin')}`;
}
$('#autoLogin').on("click", function () {
    // $('#autoLoginSvg')[0].style.color = 'red';
    $('#saveButton')[0].style.display = 'block';
    $('#pswd')[0].style.display = 'block';
    $('#lgn')[0].style.display = 'block';
    $('#lgn')[0].value = localStorage.getItem('yourLogin');
    $('#pswd')[0].value = localStorage.getItem('yourPassword');
    $('#autoLogin')[0].style.display = 'none'

})
//DownLoad buttons
$("#download_png").click((function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (localStorage.getItem('screenSize') === "original") {
            chrome.storage.local.set({screenSize: "original"}).then(() => {
                console.log("Value screenSize: original is set");
            });
        } else {
            chrome.storage.local.set({screenSize: "non-original"}).then(() => {
                console.log("Value screenSize: original is set");
            });
            chrome.storage.local.set({screenWidth: localStorage.getItem("widthScreen")}).then(() => {
                console.log("Value widthScreen: " + localStorage.getItem("widthScreen") + " is set");
            });
            chrome.storage.local.set({heightScreen: localStorage.getItem("heightScreen")}).then(() => {
                console.log("Value heightScreen: " + localStorage.getItem("heightScreen") + "is set");
            });
        }
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript({
                    target: {tabId: tab.id, allFrames: true},
                    files: ['libs/html2canvas.js', 'libs/pica.js', 'libs/jquery.js', 'libs/lodash.js',
                        'buttons/downloads/png/grafana/downloads.js']
                }
            );
        }
    })
    window.close();
}));

$(document).mouseup(function (e) {
    var container = $('.css-1k2jwpv');
    if (container.has(e.target).length === 0) {
        $('.css-1k2jwpv')[0].style.display = '';
    }
});

$("#login").click((function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id, allFrames: true},
                    files: ['buttons/login/login.js'],
                })
            }
        })
    }
));

$("#record-btn").click((function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tab = tabs[0];
            if (tab) {
                chrome.scripting.executeScript({
                    target: {tabId: tab.id, allFrames: true},
                    files: ['buttons/downloads/webm/webm.js'],
                });
            }
        })
    }
));

$('#saveButton').on("click", function () {
    localStorage.setItem('yourLogin', $('#lgn')[0].value);
    localStorage.setItem('yourPassword', $('#pswd')[0].value);
    chrome.storage.local.set({yourLogin: $('#lgn')[0].value}).then(() => {
        console.log("Value yourLogin is set");
    });
    chrome.storage.local.set({yourPassword: $('#pswd')[0].value}).then(() => {
        console.log("Value screenSize: original is set");
    });
    // $('#autoLoginSvg')[0].style.color = 'green';
    $('#saveButton')[0].style.display = 'none';
    $('#pswd')[0].style.display = 'none';
    $('#lgn')[0].style.display = 'none';
    $('#autoLogin')[0].style.display = 'block'
    $('#autoLogin')[0].textContent = `Your Login: ${localStorage.getItem('yourLogin')}`;
    location.reload();
});

$('#btnHome').on("click", () => {
    window.open('https://github.com/Penelopa23/plugin');
});

$('#screenChoose').on("click", () => {
    var szc = $('.css-1k2jwpv')[0].style.display;
    console.log(szc)
    if (szc === '') {
        var scrSize = "#" + localStorage.getItem('screenSize');
        $(scrSize)[0].style.display = 'block'
        console.log(scrSize)
        if (scrSize === "#manualSize") {
            $('input')[0].value = localStorage.getItem('widthScreen')
            $('input')[1].value = localStorage.getItem('heightScreen')
        }
        clearSizes(scrSize.substring(1, scrSize.length));
        $('.css-1k2jwpv')[0].style.display = 'flex';
    } else {
        $('.css-1k2jwpv')[0].style.display = '';
    }

})

$('#originalScreenSize').on("click", () => {
    localStorage.setItem('screenSize', 'original');
    clearSizes('original');
    $('#original')[0].style.display = 'block'
})

$('#bigScreenSize').on("click", () => {
    localStorage.setItem('screenSize', 'bigSize');
    clearSizes('bigSize');
    localStorage.setItem('widthScreen', "1920")
    localStorage.setItem('heightScreen', "1080")
    $('#bigSize')[0].style.display = 'block'
})

$('#smallScreenSize').on("click", () => {
    localStorage.setItem('screenSize', 'smallSize');
    clearSizes('smallSize');
    localStorage.setItem('widthScreen', "800")
    localStorage.setItem('heightScreen', "600")
    $('#smallSize')[0].style.display = 'block'
})

$('#userScreenSize').on("click", () => {
    localStorage.setItem('screenSize', 'manualSize');
    clearSizes('manualSize');
    localStorage.setItem('widthScreen', $('input')[0].value)
    localStorage.setItem('heightScreen', $('input')[1].value)
    $('#manualSize')[0].style.display = 'block'

})

$('#btnDefect').on("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id, allFrames: true},
                files: ['buttons/jira/defect.js'],
            });
        }
    })
});




