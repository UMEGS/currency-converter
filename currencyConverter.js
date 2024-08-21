const baseUrl = 'https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api/'

let downdrop = document.querySelectorAll('.dropdown select')
let btn = document.querySelector('#btn')
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
let msg = document.querySelector('.msg')


for (let select of downdrop) {
    for (currcode in countryList) {
        let option = document.createElement('option')
        option.innerText = currcode
        option.value = currcode
        if (select.name === 'from' && currcode === 'USD') {
            option.selected = 'selected'
        }
        if (select.name === 'to' && currcode === 'PKR') {
            option.selected = 'selected'
        }
        select.append(option)
    }
    select.addEventListener('change', (eve) => {
        updateFlag(eve.target)
    })
}
const updateFlag = (element) => {
    let currcode = element.value
    let countrycode = countryList[currcode]
    newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src = newSrc

}

btn.addEventListener('click', async (eve) => {
    eve.preventDefault();
    let amount = document.querySelector('.amount input')
    let amountVal = amount.value
    console.log(amountVal)
    if (amountVal == 0 || amountVal < 1) {
        amountVal = 1;
        amount.value = '1';
    }
    let url = `${baseUrl}${toCurr.value}_${fromCurr.value}.json`
    let respone = await fetch(url)
    let data = await respone.json();
    let rate = data.rate
    finalrate=rate*amountVal
    msg.innerText = `${amountVal}${fromCurr.value} = ${finalrate}${toCurr.value}`
})