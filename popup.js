function readProperty(property, defValue) {
    if (localStorage.getItem(property) === null) {
        localStorage.setItem(property, defValue);
    }
    return localStorage.getItem(property);
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

//DownLoad buttons
$("#download_png").click((function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
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

$("#login").click((function () {

        chrome.storage.sync.set({key: localStorage.getItem('yourLogin')}).then(() => {
            console.log("Value is set");
        });

        chrome.storage.sync.set({myVariable: localStorage.getItem('yourPassword')});

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
    if (($('#pswd')[0].value != "") && ($('#lgn')[0].value != "")) {
        localStorage.setItem('yourLogin', $('#lgn')[0].value);
        localStorage.setItem('yourPassword', $('#pswd')[0].value);
        $('#autoLoginSvg')[0].style.color = 'green';
        $('#saveButton')[0].style.display = 'none';
        $('#pswd')[0].style.display = 'none';
        $('#lgn')[0].style.display = 'none';
        $('#autoLogin')[0].style.display = 'block'
        $('#autoLogin')[0].textContent = `Your Login: ${localStorage.getItem('yourLogin')}`;
    }
    location.reload();
});

$('#btnHome').on("click", () => {
    window.open('https://github.com/Penelopa23/plugin');
});

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




