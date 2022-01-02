// const request=require('request') 

// const forecast=(lat,lon,callback)=>{
//     const url='http://api.weatherstack.com/current?access_key=d07b3f6a3551507987d481f67d459a79&query='+lat+','+lon+'&units=f'
//     request({url:url,json:true},(error,response)=>{
//         if(error)
//         {
//             callback('Unable to connect to weather service!',undefined)
//         }
//         else if(response.body.error){
//             callback('Unable to find location',undefined)
//         }
//         else{
//             callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
//         }
//     })
// }
// module.exports=forecast

//better version using object destructing 

const request=require('request') 

const forecast=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=d07b3f6a3551507987d481f67d459a79&query='+lat+','+lon+'&units=f'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}
module.exports=forecast