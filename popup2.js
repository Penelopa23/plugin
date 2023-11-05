//DownLoad buttons
// const grafanaDownload = document.querySelector("#grafanaDownloadPNG");
$("#download_png").click((function() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.tabs.executeScript(tab.id,
                {
                    allFrames: true,
                    file: 'libs/html2canvas.js'
                }
            );
            chrome.tabs.executeScript(tab.id,
                {
                    allFrames: true,
                    file: 'libs/jquery.js'
                }
            );
            chrome.tabs.executeScript(tab.id,
                {
                    allFrames: true,
                    file: 'libs/lodash.js'
                }
            );
            chrome.tabs.executeScript(tab.id,
                {
                    allFrames: true,
                    file: 'buttons/downloads/png/grafana/downloads.js'
                }
            );
        }
    })
    window.close();
}));

$("#auto_login").click((function() {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var tab = tabs[0];
            if (tab) {
                chrome.tabs.executeScript(tab.id,
                    {
                        allFrames: true,
                        file: 'buttons/login/login.js'
                    })
            }
        })
    }
));

$("#active_tab").click((function() {
    $(".url-list-li").remove();
    chrome.storage.local.get(["data"], (function(t) {
            var e;
            if (null != t.data) {
                $(".timer_active_tab").remove(),
                    $(".empty-active-tab").remove();
                var a = t.data
                    , _ = []
                    , n = [];
                a.filter((t=>"manual_url" !== t.refreshType || _.includes(t.tab_url) ? "current_tab" === t.refreshType && (n.push(t),
                    !0) : (_.push(t?.tab_url),
                    n.push(t),
                    !0)));
                for (var i = 0; i < n.length; i++)
                    if (n[i].refreshType) {
                        n[i].tabId,
                            n[i].url,
                            n[i].favIconUrl;
                        var c = ""
                            , o = parseInt(n[i].mili_seconds) / 1000;
                        o -= 3;
                        var l = ""
                            , u = 0;
                        l = "current_tab" == n[i].refreshType ? "none" : "",
                            1 == n[i].btn_start ? (u = 1,
                                c = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path d="M6.094 2.344v10.312c0 .373-.148.731-.412.994s-.621.412-.994.412h-.469c-.373 0-.731-.148-.994-.412s-.412-.621-.412-.994V2.344c0-.373.148-.731.412-.994s.621-.412.994-.412h.469c.373 0 .731.148.994.412s.412.621.412.994zM10.781.938h-.469c-.373 0-.731.148-.994.412s-.412.621-.412.994v10.312c0 .373.148.731.412.994s.621.412.994.412h.469c.373 0 .731-.148.994-.412s.412-.621.412-.994V2.344c0-.373-.148-.731-.412-.994s-.621-.412-.994-.412z" fill="#5c5f62"/></svg>') : c = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path d="M4.796 2.243C3.804 1.674 3 2.14 3 3.283v8.434c0 1.144.804 1.609 1.796 1.041l7.372-4.228c.992-.569.992-1.491 0-2.06L4.796 2.243z" fill="#5c5f62"/></svg>',
                        "" == n[i].tabId && (n[i].tabId = 1);
                        var h = "";
                        h = void 0 === n[i].tab_url || "" == n[i].tab_url ? n[i].url : n[i].tab_url;
                        o = n[i].mili_seconds;
                        var d = r(o = parseInt(o) / 1000 - 3)
                            , m = ""
                            , p = "";
                        null != h && ("manual_url" == n[i].refreshType ? (m = "__MSG_manual__",
                            p = "") : p = "none",
                            $("#tab_no" + i).remove(),
                            e = `<div class='url-list-li' data-tab=' ${JSON.stringify(n[i])}' id='tab_no ${i}'><div class='url-list-box favicon'><div class="url_list_action"><span> ${h} </span><p class='action_container_atr'> <span class="i-icon edit_button_active_tab" title="__MSG_editManualSettings__" style='display:${l}' data-refreesh-type='${n[i].refreshType}' data-tab-id='0'> <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><g clip-path="url(#A)"><path d="M11.135 1.052l2.814 2.815.469-.469A1.99 1.99 0 0 0 15 1.991a1.99 1.99 0 0 0-.583-1.407A1.99 1.99 0 0 0 13.01.001a1.99 1.99 0 0 0-1.407.583l-.469.469zm1.522 4.104L9.842 2.342.914 11.271 0 14.999l3.728-.913 8.929-8.93z" fill="#5c5f62"/></g><defs><clipPath id="A"><path fill="#fff" d="M0 0h15v15H0z"/></clipPath></defs></svg> </span> <button class="i-icon remove_button_active_tab" title="__MSG_removeAutoRefresh__" data-tab-id='${n[i].tabId}'> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none"><path d="M5.25 12a.75.75 0 0 0 .75-.75v-4.5A.75.75 0 0 0 5.25 6a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 .75.75zm7.5-9h-3v-.75A2.25 2.25 0 0 0 9.091.659 2.25 2.25 0 0 0 7.5 0H6a2.25 2.25 0 0 0-2.25 2.25V3h-3a.75.75 0 0 0-.75.75.75.75 0 0 0 .75.75h.75v8.25A2.25 2.25 0 0 0 3.75 15h6A2.25 2.25 0 0 0 12 12.75V4.5h.75a.75.75 0 0 0 .75-.75.75.75 0 0 0-.75-.75zm-7.5-.75A.75.75 0 0 1 6 1.5h1.5a.75.75 0 0 1 .75.75V3h-3v-.75zm5.25 10.5a.75.75 0 0 1-.75.75h-6a.75.75 0 0 1-.75-.75V4.5h7.5v8.25zM8.25 12a.75.75 0 0 0 .75-.75v-4.5A.75.75 0 0 0 8.25 6a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 .75.75z" fill="#5c5f62"/></svg> </button> <button class="i-icon stop_button_active_tab" title="__MSG_startAndPauseRefresh__" data-start-pause="${u}"> ${c} </button></p></div><div class="tags"><b style="display:${p}">${m}</b><b>${d}</b></div>`,
                            $("#url_container").append(s(e)))
                    } else
                        $("#tab_no" + i).remove()
            } else
                $(".url-list-li").remove();
            var f = $(".favicon").html();
            "" !== f && null != f || ($(".timer_active_tab").remove(),
                $(".empty-active-tab").remove(),
                $("#url_container").append(s('<div class="empty-active-tab"><p>__MSG_noTabsToShow__</p></div>')))
        }
    ))
}))

function s(t) {
    var e = "";
    return null != t && null != t && "" != t && (e = t.replace(/__MSG_(\w+)__/g, (function(t, e) {
            return e ? chrome.i18n.getMessage(e) : ""
        }
    ))),
        e
}