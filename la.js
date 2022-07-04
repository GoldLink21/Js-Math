function m(...els){
    return els;
}
/**
 * 
 * @param {number[]} a1 
 * @param {number[]} a2 
 * @returns 
 */
function dot(a1,a2){
    if(a1.length == a2.length)
        return a1.map((e,i)=>e*a2[i]).reduce((acc,cur)=>acc+cur,0);
    throw new Error("AAAAA")
}
/**
 * 
 * @param {number[]} v 
 * @param {number} n 
 * @returns 
 */
function scal(v,n){
    return v.map(e=>n*e);
}
function len(v){
    return Math.hypot(...v);
}
function proj(y,u){
    return scal(u,dot(y,u)/dot(u,u))
}
function add(u,v){
    if(u.length != v.length)
        throw new Error("CCCCC")
    return u.map((e,i)=>e+v[i]);
}
function sub(u,v){
    if(u.length !== v.length)
        throw new Error("BBBBBB")
    return add(u,scal(v,-1));
}
function isNormal(v){
    return len(v) == 1
}
function norm(v){
    return scal(v,1/len(v));
}   
function isOrth(v1,v2){
    return dot(v1,v2) == 0
}
function l(...a){
    console.log(...a);
}
function sumOfOrth(y,u){
    return [proj(y,u),sub(y,proj(y,u))]
}
function distFromYAndLineThroughOrigin(y,u){
    return len(sub(y,proj(y,u)))
}

(function main(){
    let u1 = m(0,1,-3,-1)
    let u2 = m(2,4,1,1)
    let u3 = m(1,0,1,-3)
    let u4 = m(4,-2,-1,1)
    let x = m(11,-9,3,0);

    let xhat = scal(u4,(dot(x, u4)/dot(u4,u4)))
    let z = sub(x, xhat);
    l(xhat, z)
})()
