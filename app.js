const express = require("express");
const app = express();
const {indexRoutes} = require("./routes/index")
const {APIRoutes} = require("./routes/api")
const db_config = require("./utils/db.config")
const cors = require('cors');


app.use(express.json());
app.use(cors({
    origin: '*'
}));


app.use("", 
    // Middlewares
    indexRoutes
)

app.use("/api",
    // Middlewares
    APIRoutes)


db_config.init()
.then( () => {
    app.listen(8000)
}).catch( err => {
    console.log(err)
})
    
  
