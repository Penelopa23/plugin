var host = document.location.host
var username;
var password;


async function login() {

    await chrome.storage.sync.get(["key"]).then((result) => {
        username = result.key;
    });

    await chrome.storage.sync.get(["myVariable"]).then((result) => {
        password = result.myVariable;
    });

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