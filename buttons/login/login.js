var host = document.location.host
var username;
var password;

chrome.runtime.sendMessage({method: "getLocalStorage", key: "yourPassword"},
    function (response) {
        console.log(response.data)
        password = response.data;
    })

chrome.runtime.sendMessage({method: "getLocalStorage", key: "yourLogin"},
    function (response) {
        console.log(response.data)
        username = response.data;
    })
async function login() {

    var delayForLogin = async (ms) => await new Promise(resolve => setTimeout(resolve, ms));

    if (host === "test.com") {
        if (document.location.pathname === "/login") {
            document.querySelector('[name="username"]').value = username;
            document.querySelector('[name="password"]').value = password;
            document.querySelector('[type="button"]').click();
        } else {
            document.querySelector('[title="Log in with test"]').click();
        }
    } else if (host === "test2.com") {
        delayForLogin(1000).then(() => {
            document.querySelector('[id="head-link-r"]').click();
            document.querySelector('[name="username"]').value = username;
            document.querySelector('[name="password"]').value = password;

            delayForLogin(1000).then(() => {
                document.querySelector('[type="button"]').click();
            })
        })
    }
}

login();