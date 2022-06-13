const express = require('express');
const { json } = require('express');
const app = express();
const cors = require('cors')
const routes = require('./routes/routes');

const corsOptions ={
    origin: '*',
    credentials:true,
    optionSuccesStatus:200
}

app.use(cors(corsOptions))
app.use(json())
app.use(routes.route);



app.listen(3001, async (error) => {
    if(error){
        console.log("Houve algum erro!!")
    }else{
        console.log("Servidor iniciado na porta:3001")
    }
});