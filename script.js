const base_url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector( ".msg")



for(let select of dropdowns){
    for(currCode in countryList){
        // console.log(code,countryList[code])
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value = currCode;

        if(select.name === "from" && currCode ==="USD"){
            newOption.selected= "selected";
        }else  if(select.name === "to" && currCode ==="PKR"){
            newOption.selected= "selected";
        }


        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}






const updateExchangeRate =  async()=>{

    
    let amount= document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value="1";
    }
    // console.log(amtVal)
    // console.log(fromCurr.value , toCurr.value)

    const URL= `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()]

    let finalAmount = amtVal * rate;

    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}











const updateFlag = (element)=>{
    let currCode= element.value;
    let countryCode= countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;


        // console.log(currCode)
}









btn.addEventListener("click",(evt)=>{
    evt.preventDefault();

    updateExchangeRate();



    // console.log(rate)

})

window.addEventListener("load",()=>{
    updateExchangeRate();

})
