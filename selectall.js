var changeActivePassive = document.getElementById('changeActivePassive');

//on init update the UI checkbox based on storage
chrome.storage.sync.get('active', function(data) {
changeActivePassive.checked=data.active;
});

changeActivePassive.onchange = function(element) {
let value = this.checked;

//update the extension storage value
chrome.storage.sync.set({'active': value});

//Pass init or remove message to content script 
if(value){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "init", active: value});
    });
}else{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: "remove", active: value});
    });
}

};