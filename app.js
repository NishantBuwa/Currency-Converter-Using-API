const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
let amount = document.querySelector(".amount input")

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}


const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

const url_picker = (url) => {
    // console.log(`${url}/${fromCurr.value.toLowerCase()}.json`)
    return `${url}/${fromCurr.value.toLowerCase()}.json`
}

btn.addEventListener("click", async (e) => {
    e.preventDefault()
    let amount = document.querySelector(".amount input")
    if (amount.value == "" || amount.value < 1) {
        amount.value = "1"
    }
    if (toCurr.value === fromCurr.value) {
        // console.log(toCurr.value ,fromCurr.value )
        msg.innerText = `${amount.value} ${toCurr.value} = ${amount.value} ${toCurr.value}`
    } 
    else {
        const new_base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
        final_url = url_picker(new_base_url, fromCurr.value.toLowerCase())
        fetch(final_url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const final_name = data[fromCurr.value.toLowerCase()]
                // console.log(final_name)
                const rate = final_name[toCurr.value.toLowerCase()].toFixed(4)
                const final_rate = amount.value * rate
                msg.innerText = `${amount.value} ${fromCurr.value} = ${final_rate.toFixed(4)} ${toCurr.value}`
            })
    }

})