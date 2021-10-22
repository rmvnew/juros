let result = []
const TypeTax = {
    SIMPLE: 'simples',
    COMP: 'composto'
}

function calc(){

const ul = document.getElementById("ul")
const value = document.getElementById("value").value.replace(',','.')
const juros = document.getElementById("juros").value
const months = document.getElementById("parcelas").value
const divRes = document.getElementById("res")
const selectTax = document.getElementById("type-tax")
ul.innerHTML = ''
let parcelOriginal = value / months
let valueTotal = 0.0
let currentPerc = (juros/100)
let totComp = Number(value)

    for(let i = 0; i < months; i++){

        const liLabel = document.createElement("li")
        const li = document.createElement("li")

        if(selectTax.value == TypeTax.SIMPLE){
            
            valueTotal = getValue(TypeTax.SIMPLE,parcelOriginal,currentPerc,totComp,valueTotal,value)
            
        }else{
            
            const res = getValue(TypeTax.COMP,parcelOriginal,currentPerc,totComp,valueTotal)

            const { calcValue,totCompValue } = res
            
            totComp = totCompValue
            valueTotal = calcValue

        }       
 

        let finalValue = document.createTextNode(`Mês ${(i+1)}:  ${getBr(valueTotal)}`)
        
        
        li.appendChild(finalValue)
        ul.appendChild(li)
           
    }

    result.push(`Total: ${getBr(valueTotal)} em ${months}x 
        De: ${getBr(valueTotal/months)}`)

    console.log(result)    
   
   

        console.log("add")

        divRes.innerHTML = ''
       
        result.forEach(data =>{ 

            const h2Res = document.createElement("h2")

            let totalRes = document.createTextNode(data)
            h2Res.appendChild(totalRes)
            divRes.appendChild(h2Res)

        })
       

        
    if(result.length == 3){
        console.log("apagando")
        result.shift()
       
    }
    
}


function getValue(type,parcelOriginal,currentPerc,totComp,valueTotal,value = 0){



    if(type === TypeTax.SIMPLE){
        console.log('simples')
        let calc = (valueTotal+parcelOriginal)+(value*currentPerc)
        console.log(calc)
        return calc

    }else{
        console.log('composto')
        let calc = (valueTotal+parcelOriginal+(totComp*currentPerc))
        let tax = totComp*currentPerc
         
        return {
            calcValue: calc,
            totCompValue: totComp + tax
        }
    }
      
}


function getBr(value){
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

