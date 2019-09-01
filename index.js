const ExRates = {}

function init(){
api.getRates().then((ExRates)=>{
   let {rates} = ExRates
   let codes =Object.keys(rates)
   $("#currenciesDdRate").html("")
   $("#currenciesDdBase").html("")

   codes.forEach(code => {
         addCurrencyOpt(currencies[code].name, code)
    } )
}).catch(ExRates => console.log(err))
}


function addCurrencyOpt (name, code){
    flag = code.toLowerCase()
 $("#currenciesDdRate").append(`<a class="dropdown-item ddItem ddScroll " onclick="defineCurrency(this.parentElement.parentElement,'${code}','${name}','${flag}')" > <span class="mr-2 currency-flag " style="background-image:url('currenciesIcons/${flag}.svg"></span>${code}-${name}</a`)
 $("#currenciesDdBase").append(`<a class="dropdown-item ddItem ddScroll " onclick="defineCurrency(this.parentElement.parentElement,'${code}','${name}','${flag}')" > <span class="mr-2 currency-flag " style="background-image:url('currenciesIcons/${flag}.svg"></span>${code}-${name}</a`)
}

function defineCurrency(currentBtn,code,name,flag){
    currentBtn =  $(currentBtn).find("button")
    currentBtn.html(`<span class="currency-flag currency-flag-lg" style="background-image:url('currenciesIcons/${flag}.svg')" "></span> ${name}`)
    currentBtn = currentBtn[0]
    currentBtn.name = code    

}

$("#submitBtn").on("click",getCurrenciesRate)
$("#btn-switch").on("click",switchCurrencies)


function getCurrenciesRate(){
    let amount = $("#amount").val()
    let baseCurrency = $("#dropdownMenuButtonBase")[0]
    let  {name} = baseCurrency
    let convertTo = $("#dropdownMenuButtonRate")[0].name

    if(ExRates[name]){
        let base = (ExRates[name])
        let dateObj = base.date
        let {date} = dateObj
        let {rates} = base
        let result = rates[convertTo]
        showResult(amount,name,date,convertTo,result)
    }
   else{  api.getBaseRates(name).then((baseRates) => {

        let {date} = baseRates
        let {rates} = baseRates
        ExRates[name] = {date:{date},rates:{ ...rates}}
        let result = rates[convertTo]
        showResult(amount,name,date,convertTo,result)

    })
}
}

function showResult(amount,code,date,convertTo,result){
    result = result.toString().slice(0,7)
    $("#converterResult").html(`<div class="ml-auto mr-auto">
    <div class="col-12 text-center"><h5>${amount} ${code} = </h5></div>
    <div class="col-12 text-center"><h1 style="display: inline-block">${(result*amount)} </h1><h5 class="ml-2" style="display:inline-block"> ${convertTo}</h5> </div>
    <div class="col-12 text-center"><h5>Last updated: ${date}</h5></div>
    </div>
`)
}

function switchCurrencies() {
let from = $("#convertFrom").html()
let to = $("#convertTo").html()
$("#convertFrom").html(to)
$("#convertFrom").find("button")[0].id = "dropdownMenuButtonBase"
$("#convertTo").html(from)
$("#convertTo").find("button")[0].id = "dropdownMenuButtonRate"

}

init()

