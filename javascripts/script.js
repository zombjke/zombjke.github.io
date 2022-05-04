/**choose platform */
window.onload = function(){
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone"];
    let flag = true;
        for (let i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
    flag ? createBody('pc') : createBody('mobile');
}
/**drow body by device*/
function createBody(device){
    let wrap = document.getElementById('wrapper')
        switch (device) {
            case 'pc': {
                wrap.innerHTML = pcBody; 
                includeCSS('/stylesheets/pc.css');
                includeCSS("/stylesheets/min1000px.css", "screen and (min-width: 1000px)");
                includeCSS("/stylesheets/min768max999.css", "screen and (min-width: 768px) and (max-width: 999px)");
                includeCSS("/stylesheets/min500max767.css", "screen and (min-width: 500px) and (max-width: 767px)");
                break;}
            case 'mobile': {
                wrap.innerHTML = mobileBody; 
                includeCSS('/stylesheets/mobile.css'); 
                break;}
            default: wrap.innerHTML = pcBody; break;
        }
}


/**including styles on html-page*/
function includeCSS(url, media){
    let style = document.createElement('link');
    style.href = url;
    style.rel = "stylesheet";
    style.media = media || ""
    document.head.appendChild(style);
}    
/**draw roadmap */
function createRoadMap(){
    if (!document.getElementById('roadMapId')){
        let map = document.createElement('div');
        map.id = "roadMapId";
        map.innerHTML = roadmap;
        document.getElementById('wrapper').append(map);
        document.getElementById('title-back').style.filter = "blur(15px)";
        document.addEventListener('click', function(event){cancelByClick(event)}, 1);
    }
}
/**drow roadmap pic for mobile */
function createRoadMapMobile(){
        let road = document.createElement('div');
        road.id = "smallRoadMap";
        road.innerHTML = forPic;
        document.getElementById('title-road').append(road);
       
    
}
/**close roadmap by click outside the block */
function cancelByClick(event){
    let searchPlace = document.getElementById('backplace');
    if (searchPlace){
        let cordsPlace = searchPlace.getBoundingClientRect();
        
        let lessX = event.clientX < cordsPlace.x;
        let lessY = event.clientY < cordsPlace.y;
        let moreX = event.clientX > cordsPlace.x + cordsPlace.width;
        let moreY = event.clientY > cordsPlace.y + cordsPlace.height;

        if (lessX || lessY || moreX || moreY){
            closeRoadMap();
        }
    }
}
/**close roadmap func */
function closeRoadMap(){
    document.getElementById('roadMapId').remove();
    document.getElementById('title-back').style.filter = "";
    document.removeEventListener('click', function(event){cancelByClick(event)}, 1);
}
/**filling detail /pc*/
function createDetail(what){
    let detailBody = document.getElementById('detailBody');
        switch (what){
            case 1: detailBody.innerHTML = preferredSoftware; break;
            case 2: detailBody.innerHTML = additionalKnowledge; break;
            case 3: detailBody.innerHTML = aboutMyself; break;
        }
        detailBody.classList.add('anim-create');
        detailBody.scrollTop = "";
        setTimeout(() => detailBody.classList.remove('anim-create'), 500);
}
/**filling detail /mobile */
function fillDetail(id){
    let detail = document.createElement('div');
    detail.id = "detailBody";
    detail.className = "detailBody";
    document.getElementById(id).append(detail);
    switch (id){
        case 'title-road': createRoadMapMobile(); break;
        case 'title-software': detail.innerHTML = preferredSoftware; break;
        case 'title-additional': detail.innerHTML = additionalKnowledge; break;
        case 'title-about': detail.innerHTML = aboutMyself; addPhoto(); break;
    }
}
/**what's menu was selected /mobile */
function createDetail_(what){
        switch (what){
            case 1: selectMenu('title-software'); break;
            case 2: selectMenu('title-additional'); break;
            case 3: selectMenu('title-about'); break;
            case 4: selectMenu('title-road'); break;
        }
}
/**adding selector div under description of buttons*/
function selectMenu(id){
    let selector = document.getElementById('selector');
    if (!selector){
        createSelector(id);
    }else if (selector && selector.parentElement.id == id){
        selector.parentElement.innerHTML = selector.innerHTML;
        removeClass();
    } else {
        removeClass(selector.parentElement.id);
        selector.parentElement.innerHTML = selector.innerHTML;
        createSelector(id);
    }   
}
/**drow selector */
function createSelector(id){
    let tmp = document.getElementById(id).innerHTML;
    document.getElementById(id).innerHTML = '';
    let selector = document.createElement('div');
    selector.id = "selector";
    selector.className = "selector";
    selector.innerHTML = tmp;
    document.getElementById(id).append(selector);
    changeClass(id);
    setTimeout(() => fillDetail(id), 500);
}
/**photo place / mobile */
function addPhoto(){
    let forPhoto = document.createElement('div');
    forPhoto.id = "for-photo";
    forPhoto.className= "for-photo";
    forPhoto.innerHTML = photo;
    document.getElementById('detailBody').prepend(forPhoto);
}
/**changing class on description */
function changeClass(id){
    document.getElementById(id).classList.add('title-open');
    let titles = document.querySelectorAll('.title');
    for(let a=0;a<titles.length;a++){
        let spans = titles[a].querySelectorAll('span');
        if (titles[a].id == id){
            for(let i=0;i<spans.length;i++){
                if(spans[i].classList.contains('upper')) spans[i].classList.add('upper-open');
                if(spans[i].classList.contains('little')) {spans[i].classList.remove('little-close'); spans[i].classList.add('little-open')};
            }
        }else{
            for(let i=0;i<spans.length;i++){
                if(spans[i].classList.contains('little')) spans[i].classList.add('little-close');
            }
        }       
    }
}
/**removing class */
function removeClass(id){
    if (id){
        let elem = document.getElementById(id);
        elem.classList.remove('title-open');
        let spans = elem.querySelectorAll('span');
        for(let i=0;i<spans.length;i++){
            if(spans[i].classList.contains('upper-open')) spans[i].classList.remove('upper-open');
            if(spans[i].classList.contains('little-open')) spans[i].classList.remove('little-open');
            if(spans[i].classList.contains('little-close')) spans[i].classList.remove('little-close');
        }
    } else {
        let titles = document.querySelectorAll('.title');
        for(let i=0;i<titles.length;i++){
            if (titles[i].classList.contains("title-open")) titles[i].classList.remove("title-open"); 
            let spans = titles[i].querySelectorAll('span');
            for(let i=0;i<spans.length;i++){
                if(spans[i].classList.contains('upper-open')) spans[i].classList.remove('upper-open');
                if(spans[i].classList.contains('little-open')) spans[i].classList.remove('little-open');
                if(spans[i].classList.contains('little-close')) spans[i].classList.remove('little-close');
            }
        }
    }
}



