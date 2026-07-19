const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#btn");
let fromcurr =     document.querySelector(".from select")
let tocurr =     document.querySelector(".to select")


for (let select of dropdowns) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if(select.name ==="from" && currencyCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name ==="to" && currencyCode === "INR"){
            newOption.selected = "selected";
        }
        select.appendChild(newOption);
    } 

    select.addEventListener("change", function(evt){
        updateflag(evt.target);
    });
} 

let updateflag = function(element){
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
} 

btn.addEventListener("click", async function(evt){
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amvl = amount.value
    if(amvl ==="" || amvl < 1 ){
        amvl = 1 ;
        amount.value = "1";
    }

   const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;

const response = await fetch(url);
const data = await response.json();
console.log(response);

const rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];

const finalAmount = amvl * rate;

document.querySelector(".msg").innerText =
`${amvl} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value}`;
})