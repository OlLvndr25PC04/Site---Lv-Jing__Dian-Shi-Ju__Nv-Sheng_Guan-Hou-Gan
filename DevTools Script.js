allVD = await Promise.all(allN.filter(a => `aweme,search`.split(',').every(b => a.request.url.includes(b))).map(a => new Promise(r => {
    a.getContent(c => {
        if(!c) {
            r()
            return
        }
        if(c[0] == '{'){
            r(JSON.parse(c))
        }else{
            r(c.split('\n').filter(a => a.includes('aweme_id')).map(a => JSON.parse(a.slice(a.indexOf('{'), a.lastIndexOf('}') + 1))))
            
        }
    })
})))

allVD = allVD.flat().map(a => !!a && Array.isArray(a.data) && a.data.map(a => a.aweme_info)).filter(a => !!a).flat()

copy(JSON.stringify(allVD, null, 1))