if (window.location.href.indexOf("sahibinden.com") > -1) {
    let parents = [];

    function getParent(element){
        return element.closest('ul');
    }
    function getParentIndex(parents,parent){
        return parents.indexOf(parent);
    }
    function isParentExistInParents(parents, parent){
        return getParentIndex(parents, parent) === -1;
    }
    function pushToParents(parents, parent){
        if(isParentExistInParents(parents, parent)){
            parents.push(parent);
        }
        return parents;
    }
    function insertClassesToCheckBoxes(){
        $(".facetedCheckbox").each(function(index,element){
            let parent = getParent(element);
            pushToParents(parents, parent);
            $(element).addClass('facetedCheckboxSelectAll facetedCheckboxSelectAll'+getParentIndex(parents, parent));
        });
    }
    function insertSelectAlls(){
        parents.forEach(function(element,index){
            $(element).prepend("<li><div class='text-content'><a class='facetedCheckboxSelectAllA js-attribute facetedCheckbox' onclick='(function(){ $(\".facetedCheckboxSelectAll\"+"+index+").click(); })();'><i tabindex='0'></i>Hepsini Seç / Kaldır</a></div></li>");
        });
    }
    function removeSelectAlls(){
        $(".facetedCheckboxSelectAllA").remove();
    }
    function getSelectAllText(element){
        return $(element).isChecked()
    }

    //message listener for background
    chrome.runtime.onMessage.addListener(function(request)    {
        if(request.command === 'init'){
            insertSelectAlls();
        }else{
            removeSelectAlls();
        }
    });

    //on init perform based on chrome stroage value
    window.onload=function(){  
        chrome.storage.sync.get('active', function(data) {
            if(data.active){
                document.querySelectorAll('.faceted-select').forEach(function(element, index){
                    if(index == 1){
                        element.click();
                        setTimeout(function(){
                            insertClassesToCheckBoxes();
                            insertSelectAlls();
                            element.click();
                        }, 1000)
                    }
                });
            }else{
                removeSelectAlls();
            } 
        });
    }
}

