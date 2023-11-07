var canvas;
var className;
var link;
var parents;
var child;
var selectorForWholeScreen = ".css-kuoxoh-panel-content";
var selectorForTitle = ".css-1ej1m3x-panel-title";

grafana().then(res => {
    console.log(res);
})

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
    var width = ob.style.width;
    var height = ob.style.height;
    ob.style.width = '1400px';
    ob.style.height = '400px'
    const prom = await html2canvas(ob);
    const canvas = await prom;
    link = document.createElement('a');
    link.href = canvas.toDataURL('png');
    link.download = name;
    link.click();
    ob.style.width = width;
    ob.style.height = height;
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