function getUrlParam(sUrl, sKey) {
    let param = sUrl.replace('?')

    console.log(param);
    
    
}

let a = getUrlParam('http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe', 'key')

// console.log(a);
