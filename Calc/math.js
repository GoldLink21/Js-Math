function getMultipleAndRemainder(a, d){let k=0,r=0;while(a-d>0){a-=d;k++}r=a;return [k,r];}
function euclids(a, b) {if(b>a){let t=a;b=a;a=t;}let x=Math.round(a),y=Math.round(b),r;while(y!=0){r=x%y;x=y;y=r;}return x;}

var lastAnswer = 1;
function factorial(n){return(n<=1)?1:n*factorial(n-1);}
function logbase(base,val){return Math.log(val)/Math.log(base);}

/**@param {string} str */
function parse(str){
    str = "(" + str + ")";
    var ops = [], nums = [], lastWasNumber = false;
    var opKey = {
        "+":function(a,b){return a+b},
        "-":function(a,b){return a-b},
        "!":function (a) {return factorial(a)},
        "*":function(a,b){return Number(a)*Number(b)},
        "/":function(a,b){return Number(b)/Number(a)},
        "^":function(a,b){return Math.pow(Number(b),Number(a))},
        'M':function(a,b){return Math.max(a,b)},
        "m":function(a,b){return Math.min(a,b)},
        "%":function(a,b){return b%a},
        'f':function (a) {return Math.floor(a)},
        'c':function (a) {return Math.ceil(a)},
        'r':function (a) {return Math.round(a)}
        //Theoretically a good idea, but doesn't work well with like 2g or g^2
        //"g":function(){return "9.8"}
    }
    //Handles running an operations with it's required number of parameters
    function doOperation(){
        var op = opKey[ops.pop()], vals = [];
        for(let i = 0; i < op.length;i++)
            vals.push(Number(nums.pop()));
        nums.push(String(op.apply(op.func,vals)));
    }
    for(let i=0;i<str.length;i++) {
        //Handle if it's an operation
        if(str[i] in opKey){
            ops.push(str[i]);
            lastWasNumber = false;
        //Handle numbers
        } else if(/[0-9.]/.test(str[i])) {
            if(lastWasNumber){
                nums.push(String(nums.pop()) + str[i])
            } else {
                nums.push(str[i]);
                lastWasNumber = true;
            }
        //Calculate once with parenthesis
        } else if(str[i] == ')'){
            if(ops.length == 0)
                continue;
            doOperation()
        //Handle multiplying if a number is next to open parenthesis
        } else if(str[i] == "("){ 
            if(lastWasNumber) {
                ops.push("*");
                lastWasNumber = false;
            }
        //Handle any letters
        } else if(/[a-z]/i.test(str[i])){
            //Checked this way to allow things like 2g or g^2
            if(lastWasNumber)
                ops.push("*");
            switch(str[i]){
                case 'a': nums.push(String(lastAnswer));break;
                case 'g': nums.push("9.8");break;
                case 'e': nums.push(String(Math.E));break;
            }
            lastWasNumber = false;
        //Just make sure they don't count as a number
        } else {
            lastWasNumber = false;
        }
    }
    //Run through remaining operations
    while(ops.length > 0)
        doOperation();
    return (lastAnswer = Number(nums.pop()));
}

function calculate(){document.getElementById('out').innerText = parse(document.getElementById('in').value);}
document.getElementById("calc").addEventListener("click",e=>calculate());
document.getElementById("in").addEventListener("keydown",e=>{if(e.key=='Enter')calculate()})