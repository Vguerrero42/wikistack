const express = require("express");
const app = express();
const morgan = require("morgan");
const layout = require("./views/layout");
const models = require('./models')
const wikiRoute = require('./routes/wiki')
const userRoute = require('./routes/user')


app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use('/wiki',wikiRoute)
//app.use('/user',userRoute)

app.get('/', (req,res) => {
  res.redirect('/wiki')
})


const init = async () => {
  await models.db.sync({force: true})

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

init()

