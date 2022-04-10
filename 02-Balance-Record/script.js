// HTML element referent

const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// Add event

form.addEventListener('submit',addTransaction)

// Array for transaction list

const dataTransaction =[
    // {id:1, text:"DMK-CNX flight", amount:-1290},
    // {id:2, text:"Hotel", amount:-800},
    // {id:3, text:"Salary", amount:31900},
    // {id:4, text:"Incentive", amount:+25000}
]

// Add array to list in HTML

let transactions = dataTransaction;
 
function init(){

    list.innerHTML =''
    transactions.forEach(addDataToList)
    calculateMoney()
}

function autoId(){

    return Math.floor(Math.random*1000000)
}

function addDataToList(transactions){

    const symbol = transactions.amount < 0 ? '-':'+'
    const status = transactions.amount < 0 ? 'minus':'plus'

    const item = document.createElement('li')
    item.classList.add(status);

    // Syntax example in html
    // 'Home rent <span> - ฿3500</span><button class="delete-btn">x</button>'
    
    item.innerHTML = `${transactions.text}<span>${symbol}${formatNumber(Math.abs(transactions.amount))}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`
    list.appendChild(item)
}

function calculateMoney(){
    const amounts = transactions.map(transactions => transactions.amount)
    
    // Balanced
    const total = formatNumber(amounts.reduce((sum,item)=> (sum+=item),0).toFixed(2))
    
    // Income
    const income = formatNumber(amounts.filter(amount => amount > 0).reduce((sum,item)=> (sum+=item),0).toFixed(2))

    // Expense
    const expense = formatNumber(amounts.filter(amount => amount < 0).reduce((sum,item)=> (sum+=(item*-1)),0).toFixed(2))

    // Binding to HTML

    balance.innerText = '฿' + total
    money_plus.innerText = '฿' + income
    money_minus.innerText = '฿' + expense
}

function formatNumber(num) {
    
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function addTransaction(e){

    e.preventDefault()
    if(text.value.trim()==='' || amount.value.trim()===""){
        
        alert("Please complete all information")
    }else{

        const data = {
            
            id:autoId(),
            text:text.value,
            amount: +amount.value // convert string to number type
        }

        transactions.push(data)
        updatAll(data)
    }
}

function updatAll(data){

    addDataToList(data)
    calculateMoney()

    text.value = ''
    amount.value = ''
}

function removeData(Id){

    transactions = transactions.filter(transaction => transaction.id !== Id)
    init()
    console.log('delete id = ' + Id)
}

init()
calculateMoney()