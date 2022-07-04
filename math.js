class BasicPoly {
    constructor(...monos){
        /**@type {BasicMono[]} */
        this.monos=[]
        monos.forEach(m=>this.addMono(m));
    }

    toString(){
        var out='';
        //Puts them in order from greatest power to lowest
        this.monos.sort((a,b)=>b.pow-a.pow);
        this.monos.forEach(m=>{
            var toAdd=m.toString()
            if(out==='')
                out=toAdd
            else{
                if(!toAdd.startsWith('-')){
                    out+=' + '
                }
                out+=toAdd
            }
        })
        //Formatting
        out=out.split('-').join(' - ')
        return out;
    }

    addMono(m){
        for(let i=0;i<this.monos.length;i++){
            if(this.monos[i].pow===m.pow){
                this.monos[i].coeff+=m.coeff;
                if(this.monos[i].coeff===0)
                    this.monos.splice(i,1)
                return;
            }
        }
        this.monos.push(new BasicMono(m.coeff,m.pow));
    }

    eval(x=0, ignoreC=false){
        var num=this.monos.reduce((pv,cv)=>pv+cv.eval(x),0)
        if(ignoreC)
            return num;
        return String(num) +
            this.monos.reduce((pv,cv)=>{
                if(cv.n===undefined)
                    return pv;
                var toRet=cv.toString();
                toRet=(!toRet.startsWith('-'))?' + '+toRet:' - '+toRet.substring(1);
                return pv+toRet;
        },'')
    }

    /**@returns {BasicPoly} */
    derive(makeCopy=false){
        if(makeCopy){
            return new BasicPoly(...this.monos).derive()
        }else{
            for(let i=0;i<this.monos.length;i++){
                this.monos[i].derive()
                if(this.monos[i].coeff == 0)
                    this.monos.splice(i--,1);
            }
        }
        return this;
    }

    integrate(makeCopy=false){
        if(makeCopy){
            return new BasicPoly(...this.monos).integrate();
        }else{
            this.monos.forEach(m=>m.integrate())
            this.monos.push(new UnknownConstant())
        }
        return this;
    }
    
    defineConst(n,c){
        for(let i=0;i<this.monos.length;i++)
            if(this.monos[i].n!==undefined && this.monos[i].n === n)
                this.monos.splice(i,1,new BasicMono(this.monos[i].coeff * c, this.monos[i].pow))
    }

    /**@type {BasicMono} */
    multiplyMono(m){
        for(let i=0;i<this.monos.length;i++){
            this.monos[i].multiply(m)
        }
    }

    /**@param {BasicPoly} p */
    multiplyPoly(p,makeCopy=false){
        var copyOfThis=[];
        this.monos.forEach(mo=>copyOfThis.push(m(mo.coeff,mo.pow)))
        var copyOfP=[];
        p.monos.forEach(mo=>copyOfP.push(m(mo.coeff,mo.pow)))
        console.log(copyOfThis,copyOfP)
        var toAdd=[];
        copyOfP.forEach(m=>{
            copyOfThis.forEach(m2=>{
                toAdd.push(m2.multiply(m,true));
            })
        })
        console.log(toAdd)
        if(makeCopy)
            return new BasicPoly(...toAdd)

        this.monos=new BasicPoly(...toAdd).monos
        return this
    }
}


class BasicMono{
    constructor(coeff,pow){
        this.coeff = coeff;
        this.pow = pow;
    }
    eval(x){
        return this.coeff * Math.pow(x, this.pow);
    }
    toString(){
        if(Number(this.coeff)===0)
            return '0'
        var co=String(this.coeff);
        if(Number(this.coeff)===1 && this.pow !== 0)
            co=''
        var pow='x^'+this.pow
        if(Number(this.pow)===0)
            pow=''
        if(Number(this.pow)===1)
            pow='x'
        return co+pow
    }

    /**@param {string} str */
    static parse(str){
        if(str===undefined)
            return m(0,0);
        str=String(str)

        var split = str.split('^')
        if(split.length===1){
            if(split[0].includes('x'))
                split.push('1')
            else
                split.push('0');
        }else{
            if(!split[0].includes('x')){
                split[0]=String(Math.pow(Number(split[0]),Number(split[1])))
                split[1]='0'
            }
        }
        split[0]=split[0].replace('x','')
        if(split[0]==='')
            split[0]='1'
        return m(Number(split[0]),Number(split[1]))
    }
    derive(makeCopy=false){
        if(makeCopy)
            return new BasicMono(this.coeff*this.pow,this.pow-1)
        this.coeff*=(this.pow--);
        return this;
    }
    integrate(makeCopy=false){
        if(makeCopy)
            return new BasicMono(this.coeff/(this.pow+1),this.pow+1)
        this.coeff/=(++this.pow);
        return this;
    }
    /**@param {BasicMono} other */
    multiply(other, dontModify=false){
        if(dontModify){
            return m(this.coeff*other.coeff,this.pow+other.pow)
        }else{
            this.pow += other.pow;
            this.coeff *= other.coeff;
            return this;
        }
    }
}

class UnknownConstant extends BasicMono{
    static n=1;
    constructor(){
        super(1,0)
        this.n=UnknownConstant.n++;
    }
    eval(){return 0}
    toString(){
        if(this.coeff===0)
            return ''
        var co=(this.coeff===1)?'':String(this.coeff);
        var po=(this.pow===0)?'':'x';
        if(this.pow!==1&&this.pow!==0)
            po+='^'+this.pow;
        return co+'c['+this.n+']'+po;
    }
}


class Trig{
    constructor(coeff,func, innerFunc){

    }
}

function m(coeff,pow){return new BasicMono(coeff,pow)}
function uc(){return new UnknownConstant()}

var p1=new BasicPoly(m(1,2), m(2,3));

setInterval(()=>{
    document.getElementById('p').innerHTML = p1.toString()
},100)

function sample(func, start, end){
    var rng = arrRange(start,end),
        out = []
    rng.forEach(val=>{
        console.log('('+val+','+func.eval(val)+')')
    })
    
}

/**Returns a new array with values from (start-end), end inclusive */
function arrRange(start,end){
    var index=0,arr=[];
    for(let i=start;(start<end)?(i<end+1):(i>end-1);(start<end)?(i++):(i--))
        arr[index++]=i
    return arr;
}

function factor(x=0){
    x=Math.floor(x)
    var out=[],i=2;
    while(i<x){
        if(x%i===0){
            out.push(i)
            x/=i
        }else
            i++
    }
    out.push(x)
    return out;
}

function gcf(n1,n2){
    var f1 = factor(n1);
    var f2 = factor(n2);
    if(f1.length >= f2.length){
        for(let i = f1.length-1; i>=0;i--){

        }
    } else {
        for(let i = f2.length-1; i>=0;i--){
            
        }
    }
}

function getMultipleAndRemainder(a, d){
    let k = 0
    let r = 0
    while (a - d > 0){
        a -= d
        k++
    }
    r = a
    return [k,r];
}

/**
 * Returns greatest common divisor of the two. 
 * @param {number} a Integer
 * @param {number} b Integer
 */
function euclids(a, b) {
    if(b > a) {
        let t = a;
        b = a;
        a = t;
    }
    let x = Math.round(a);
    let y = Math.round(b);
    let r;
    while(y!=0){
        r = x % y;
        x = y;
        y = r;
    }
    return x;
}