console.log("Hello from module 3");


const printHello=(data)=>{
    console.log(data); 
}

const val = 'Some text value.';

const obj = {
    A:10,
    B:90,
    C:89
}

class V{
    constructor(){}

    sayHi(){
        console.log('Hello from V class.');
    }
}

module.exports={printHello,val,obj,V};