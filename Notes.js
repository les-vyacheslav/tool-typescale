function showMSG(name, callback) {

    if(callback && typeof callback === 'function') {
        let a = name+'Les';
        callback(a);
    } else {
        console.log(`Hello ${name}, you function doesn't have callback`);
    }

}

showMSG("Slava", (a) => {
    console.log(`Hello ${a}`);
});