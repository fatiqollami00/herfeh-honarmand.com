'use strict'
const imgEls=document.querySelectorAll('.slider img')
const prevBtn=document.querySelector('.prev')
const nextBtn=document.querySelector('.next')
let activeIndex=0
const nextFunc=()=>{
    imgEls[activeIndex].classList.remove('active')
    if(activeIndex==imgEls.length-1){
        activeIndex=0
    }else{
        activeIndex++
    }
    imgEls[activeIndex].classList.add('active')
    clearInterval(nextSlideInterval)
    nextSlideInterval=setInterval(nextFunc,4000)
}
let nextSlideInterval=setInterval(nextFunc,4000)
nextBtn.addEventListener('click',nextFunc)
prevBtn.addEventListener('click',()=>{
    imgEls[activeIndex].classList.remove('active')
    if(activeIndex==0){
        activeIndex=imgEls.length-1
    }else{
        activeIndex--
    }
    imgEls[activeIndex].classList.add('active')
});


const items = document.querySelectorAll('.menu-item');

    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
      
        items.forEach(i => {
          if (i !== item) i.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    });


    

const productsEl=document.querySelector('.products');
 const formEl=document.querySelector('form');
const inpEl=document.querySelector('input');
formEl.addEventListener('submit',(e)=>{
  e.preventDefault();
  const productId = inpEl.value;
fetch(`https://fakestoreapi.com/products/${productId}`)
.then((res)=> res.json())
.then((data)=>{
        productsEl.innerHTML+=`<div class="product-card">
        <img src=${data.image} alt="${data.title}">
        <h2>${data.title.split(' ').slice(0,3).join(' ')}</h2>
        <p>${data.description.split(' ').slice(0,9).join(' ')}...</p>
        <p> price: ${data.price}</p>
        </div>`;
    })
})
.catch((err)=>{
    productsEl.textContent=`product with id ${productId}not found`;
});