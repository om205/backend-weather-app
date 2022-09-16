console.log('client side script is loaded')
const adress = document.getElementById('adress')
const btn = document.getElementById('submit')
const output = document.querySelector('.output')
const form = document.querySelector('form')

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

