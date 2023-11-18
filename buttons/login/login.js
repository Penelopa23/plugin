var host = document.location.host
var username;
var password;



async function autoLogin() {
        await chrome.storage.local.get(["yourLogin"]).then(async (result) => {
            username = result.yourLogin;
            console.log("Value login is " + result.yourLogin);
            await chrome.storage.local.get(["yourPassword"]).then(async (result) => {
                password = result.yourPassword;
                console.log("Value password is " + result.yourPassword);
                login().then(res => {
                    console.log(res);
                })
            });
        });
}

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

autoLogin();