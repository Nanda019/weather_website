console.log('This is the client side javascript file for trail')

//trail
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const text1=document.getElementById('p1')
const text2=document.getElementById('p2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //to prevent browser from refreshing
    const location=search.value
    console.log(location)
    // console.log('testing')
    text1.textContent='Loding...'
    text2.textContent=''
    const string="http://localhost:3000/weather?address="+location
    fetch(string).then((res)=>{
        res.json().then((data)=>{
            if(data.error)
            {
                console.log(data.error)
                text1.textContent=data.error
            }
            else{
                
                console.log(data.location)
                text1.textContent=data.location
                console.log(data.forecast)
                text2.textContent=data.forecast
            }

        })
    })  
    
})