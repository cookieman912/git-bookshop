var gTrans = {
    addBook: {
        en: 'click here to add a book',
        he: ' תקליק כאן כדי להוסיף ספר'
    },
    id: {
        en: 'id',
        he: 'מק"ט'
    },
    name: {
        en: 'name',
        he: 'שם'
    },
    price: {
        en: 'price',
        he: 'מחיר'
    },
    cover: {
        en: 'cover',
        he: 'עטיפה'
    },
    action: {
        en: 'action',
        he: 'פעולה'
    },

    delete: {
        en: 'delete',
        he: 'מחק'
    },
    update: {
        en: 'update',
        he: 'עדכן'
    },
    read: {
        en: 'read',
        he: 'קרא'
    },
    
    
    // date: {
    //     en: 'Date',
    //     he: 'תאריך'
    // }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    // TODO: if key is unknown return 'UNKNOWN'
    if (!keyTrans) return 'UNKNOWN'
    // TODO: get from gTrans

    var txt = keyTrans[gCurrLang];
    // TODO: If translation not found - use english
    if (!txt) return keyTrans.en

    return txt
}

function doTrans() {
    // TODO: 
    var els = document.querySelectorAll('[data-trans]')

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    els.forEach(function (el) {
        // console.dir(el)
        var txt = getTrans(el.dataset.trans)

        if (el.nodeName === 'INPUT') el.placeholder = txt;
        else el.innerText = txt
        //    ITP: support placeholder  
            
        // console.log('el.dataset', el.dataset.trans);       
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    if(gCurrLang==="he")
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
    else {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);}
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}