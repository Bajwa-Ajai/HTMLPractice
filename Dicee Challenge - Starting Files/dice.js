var a=Math.random()*6;
var b=Math.random()*6;

a=Math.floor(a)+1;
b=Math.floor(b)+1;


val1='./images/dice'+a+'.png';
val2='./images/dice'+b+'.png';

document.querySelector('.img1').setAttribute('src',val1);
document.querySelector('.img2').setAttribute('src',val2);

console.log(a)
console.log(b)

if(a>b){
    document.querySelector('h1').textContent="Player 1 Wins";
}else if(b>a){
    document.querySelector('h1').textContent="Player 2 Wins";
}else{
    document.querySelector('h1').textContent="Its a Draw";
}

