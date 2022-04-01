
const vale =  document.querySelector('input')
document.querySelector('button').addEventListener('click', (e) => {
  e.preventDefault()
 let address = vale.value
 fetch('/weather?address=' + address).then((response) => {
    document.getElementById('quer').innerHTML = 'Loading...'
    document.getElementById('quer2').innerHTML = ''

 response.json().then((data) => {
     if(data.error) {
        document.getElementById('quer').innerHTML = data.error
     } else {
     
            document.getElementById('quer').innerHTML = data.location
            document.getElementById('quer2').innerHTML = data.forecast

        
     }
    }) 
 }).catch(err =>  document.getElementById('quer').innerHTML = error)

 

})

 
