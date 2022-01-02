const path= require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// const { hasSubscribers } = require('diagnostics_channel')
const app=express()
const htmlpath=path.join(__dirname,'../public')
//express.static middleware allows some files to access from the client side (i.e it makes those files as public)
app.use(express.static(htmlpath))
// console.log(app)
// console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public/index.html'))

//when changing folder name from views to templates (customising views directory )
const viewsdir=path.join(__dirname,'../templates/views')
const partialdir=path.join(__dirname,'../templates/partials')
console.log(viewsdir)
app.set('views',viewsdir)
hbs.registerPartials(partialdir)




//trail----------------------------------------------------------------
// app.get('/',(req,res)=>{
//     res.send('Hello express')
// })
// app.get('/help',(req,res)=>{
//     res.send('<h1>help page</h1>')
// })
// app.get('/about',(req,res)=>{
//     res.send('This is about page')
// })
// app.get('/weather',(req,res)=>{
//     res.send([{
//         weather:'Its sunny',
//         temperature:'30 deg',
//         air:'humid'
//     }])
// })
//trail----------------------------------------------------------------

app.set('view engine','hbs')

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Nanda'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nanda'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        help_msg:'This is a help message for helping',
        name:'Nanda'
    })
})

app.get('/weather',(req,res)=>{
    // console.log(req.query)
    if(!req.query.address){
        return res.send({
            error:'Address not given'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error:error})
        }
        forecast(data.latitude,data.longitude,(error,forecastdata)=>{
            if(error)
            {
            return res.send({error:error})
            }
            res.send({
                forecast:forecastdata,
                location:data.location,
                address:req.query.address
            })
            
        })
    })


    // res.send({
    //     forecast:'Its sunny',
    //     location:'India',
    //     address:req.query.address
    // })
})

// app.get('/help/*',(req,res)=>{
//     res.send('Help article not found')
// })

//  // always use this * function at the end of the body
// app.get('*',(req,res)=>{
//     res.send('This is 404 error')
// })

// 404 using handlebars
app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:"Help article not found"
    })
})

 // always use this * function at the end of the body
 app.get('*',(req,res)=>{
    res.render('404',{
        error:"This is 404 error"
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})