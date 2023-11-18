var canvas;
var className;
var link;
var parents;
var child;
var selectorForWholeScreen = ".css-kuoxoh-panel-content";
var selectorForTitle = ".css-1ej1m3x-panel-title";
var width;
var height;
var screenSize;

async function startDownloadGrafanaPNG() {

    await chrome.storage.local.get(["screenWidth"]).then(async (result) => {
        width = result.screenWidth;
        console.log("Value screenWidth is " + result.screenWidth);
        await chrome.storage.local.get(["heightScreen"]).then(async (result) => {
            height = result.heightScreen;
            console.log("Value heightScreen is " + result.heightScreen);
            await chrome.storage.local.get(["screenSize"]).then(async (result) => {
                screenSize = result.screenSize;
                console.log("Value screenSize is " + result.screenSize);
                grafana().then(res => {
                    console.log(res);
                })
            });
        });
    });

}

async function grafana() {

    parents = document.querySelectorAll('[class="css-13l8md7-panel-container"]');
    if (parents.length > 10) {
        console.log("More than 10")
        if (parents.length > 40) {
            console.log("More than 40");
            const arr = [];
            for (p of parents) {
                await every(p);
            }
        } else {
            console.log("less than 40");
            const temp = _.chunk(parents, 3);
            for await (p of temp) {
                await toThree(p);
            }
        }
    } else {
        console.log("Less than 10");
        parents.forEach(a => {
            withoutAwait(a);
        })
    }
}

async function download(ob, name) {

    const prom = await html2canvas(ob);

    var fromCanvas = await prom;
    if (screenSize === "original") {
        link = document.createElement('a');
        link.href = fromCanvas.toDataURL('png', 1);
        link.download = name;
        link.click();
    } else {
        var toCanvas = document.createElement('canvas');
        toCanvas.width = width;
        toCanvas.height = height;
        var newCanvas = await pica().resize(fromCanvas, toCanvas);
        link = document.createElement('a');
        link.href = newCanvas.toDataURL('png', 1);
        link.download = name;
        link.click();
    }

}

async function toThree(p) {
    let count = 0;
    for await (a of p) {
        if (count === p.length - 1) {
            await every(p);
        } else {
            count++;
            withoutAwait(a)
        }
    }
}

async function every(a) {
    if (a.querySelector(selectorForWholeScreen) != null ||
        a.querySelector(selectorForWholeScreen != undefined)) {
        download(a, a.querySelector(selectorForTitle).title);
    } else {
        canvas = a.querySelector(selectorForWholeScreen);
        className = canvas.className;
        canvas.className = "theme-dark";
        await download(a, a.ariaLabel);
        canvas.className = className;
    }
}

async function withoutAwait(a) {
    if (a.querySelector(selectorForWholeScreen) != null ||
        a.querySelector(selectorForWholeScreen != undefined)) {
        download(a, a.querySelector(selectorForTitle).title);
    } else {
        canvas = a.querySelector(selectorForWholeScreen);
        className = canvas.className;
        download(a, a.ariaLabel);
        canvas.className = className;
    }
}

startDownloadGrafanaPNG()