const express = require("express")
require("dotenv").config();
const app = express();
const userRoutes = require("./Routes/userRoutes")
const productRoutes = require("./Routes/productRoutes")
const orderRoutes = require("./Routes/orderRoutes")
const deliveryRoute = require("./Routes/deliveryRoute")
const cartRouter = require('./Routes/CartRoutes')
const billingRouter = require('./Routes/BillingRoutes')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const uuid = require('uuid').v4
const cors = require('cors')

app.use(express.json())
app.use("/user" , userRoutes);
app.use("/product" , productRoutes);
app.use("/order" , orderRoutes);
app.use("/delivery" , deliveryRoute);
app.use('/cart', cartRouter)
app.use('/billing', billingRouter)
//app.use("/article" , articleRoutes);
//app.use("/all" , allRoutes);

app.use(cors())   

app.post('/token', async (request, response) => {

      var param = {};
      param.card ={
          number: '4242424242424242',
          exp_month: 2,
          exp_year:2024,
          cvc:'212'
      }
  
      stripe.tokens.create(param, function (err,token) {
        if(token)
        {
            response.send({
                  token:token
            })
        }
        else
        {
            response.send({
                error:err
          })
        }
      })

})
app.post('/checkout', async (request, response) => {

   // let error, status
   // try{
      const {product, token} = request.body
   //    const customer = await stripe.customers.create({
   //       email: token.email,
   //       source: token.id
   //    })

   //    const key = uuid()
   //    const charge = await stripe.charges.create({
   //       amount: product.price * 100,
   //       currency: 'usd',
   //       customer: customer.id,
   //       receipt_email: token.email,
   //       description: `Purchased the ${product.name}`,
   //       shipping: {
   //          name: token.card.name,
   //          address: {
   //             line1: token.card.address_line1,
   //             line2: token.card.address_line2,
   //             city: token.card.address_city,
   //             country: token.card.address_country,
   //             postal_code: token.card.address_zip
   //          }
   //       }
   //    }, {
   //       idempotencyKey: key

   //    })
   //    console.log('Charge:', {charge})
   //    status = 'success'


   // }catch(error){
   //    console.error('Error:', error)
   //    status = 'failure' 
   // }
   // response.json({error, status})

   let payment = {
      amount: '2000',
      currency: 'usd',
      description:'First payment',
      source:token.id
  }

  stripe.charges.create(payment, function (err,charge) {
      if(charge)
      {
          response.send({
                charge:charge
          })
      }
      else{
            response.send({
               error:err
         })
      }
  })
})

const mongoose = require("mongoose")
 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected")
}).catch(err=>{
    console.log(err)
})


app.listen(process.env.PORT || 3000 , ()=>{
    console.log(`App Listning on Port ${process.env.PORT}`)
})


