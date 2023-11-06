//Place's anchor fo button
var element = document.querySelector(".aui-toolbar2-primary");

//Make url
var issue = 'https://jira.atlassian.com/secure/CreateIssueDetails!init.jspa?' +
    'pid=11460&' +
    'issuetype=1&' +
    'summary=test&' +
    'description=sfdsagsdgsg&' +
    'security=10751&' +
    'components=53390&' +
    'versions=62994&' +
    'customfield_19830=15930&' +
    'customfield_1983="Source text"&' +
    'customfield_19832=Target&' +
    'customfield_19931=Suggested Target&' +
    'labels=label1&' +
    'labels=label2&' +
    'customfield_20239=16349&';

//Make button
var button = createDefectButton();

//Add listener
button.addEventListener('click', () => {
    location.href = issue;
})

//Add to page
element.appendChild(button);



function createDefectButton() {
    document.createElement("button");
    button.className = 'css-1fi14p8';
    button.style.color = 'red';
    button.style.width = '42px'
    button.style.height = '40px'
    button.style.backgroundColor = 'light red'
    button.style.fontSize = '16px';
    button.style.textAlign = 'inherit';
    button.style.boxSizing = 'border-box';
    button.style.font = 'inherit'
    button.style.borderRadius = '32px'
    button.style.borderColor = 'red'
    button.textContent = "Bug"
}