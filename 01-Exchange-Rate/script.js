const currency_from = document.getElementById('currency-from');
const currency_to = document.getElementById('currency-to');

const amount_from = document.getElementById('amount-from');
const amount_to = document.getElementById('amount-to');

const rate_local = document.getElementById('exchange-rate');
const swap = document.getElementById('btn-swap')

currency_from.addEventListener('change',Calculate);
currency_to.addEventListener('change',Calculate);
amount_from.addEventListener(`input`, Calculate)

function Calculate(){
    const curr_from = currency_from.value;
    const curr_to = currency_to.value;

    let url = `https://v6.exchangerate-api.com/v6/d49e5a410f9f5e9bdc0755fe/latest/${curr_from}`

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const rate = data.conversion_rates[curr_to];
        rate_local.innerText = `1 ${curr_from} = ${rate} ${curr_to}`

        amount_to.value = (amount_from.value*rate).toFixed(6)
    })

    console.log("currency from = ", curr_from)
    console.log("currency to = ", curr_to)
}

swap.addEventListener('click', ()=>{

    const temp = currency_from.value;
    currency_from.value = currency_to.value;
    currency_to.value = temp;

    const temp_result = amount_to.value;
    amount_to.value = amount_from;
    amount_from.value = temp_result;

    
    Calculate();
});

// function SwapClick(){
    
//     const temp = currency_from.value;
//     currency_from.value = currency_to.value;
//     currency_to.value = temp;
// }

amount_from.value = 1;
amount_to.setAttribute('disabled','')
Calculate();