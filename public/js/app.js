console.log('client side script is loaded')
const adress = document.getElementById('adress')
const btn = document.getElementById('submit')
const output = document.querySelector('.output')
const form = document.querySelector('form')

let gotLocation = false
const autoPrediction = function() {
    let html = `Fetching location from browser...`
    output.innerHTML = html
    setTimeout(() => {
        if(gotLocation)return
        output.innerHTML = `Location auto fetch failed. Please allow location access.`
    },10000)
    navigator.geolocation.getCurrentPosition( (position) => {
        console.log(`getting locatioin of ${position.coords.latitude} and ${position.coords.longitude}`)
        fetch(`/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
        .then(res => res.json())
        .then(data => {
            gotLocation = true
            if(data.error) 
            html = `Some error occoured! <br>${data.error}`
            else 
            html = `<u>${data.location}</u><br><i>${data.forecast}</i>`
            output.innerHTML = html
            adress.value = ''
        })
        .catch(error =>{
            gotLocation = true
            console.log(error)
        })
    })
}
setTimeout(autoPrediction,2000)


form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('button clicked')
    let html = `Loading...`
    output.innerHTML = html
    if(!adress.value) return output.innerHTML = 'The adress cannot be empty'
    fetch(`/weather?adress=${adress.value}`)
    .then(res => res.json())
    .then(data => {
        if(data.error) 
        html = `Some error occoured! <br>${data.error}`
        else 
        html = `<u>${data.location}</u><br><i>${data.forecast}</i>`
        output.innerHTML = html
        adress.value = ''
    })
    .catch(error =>{
        console.log(error)
    })
    
})



// document.getElementById('help-btn').addEventListener('click', gethelp)