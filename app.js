const express = require("express")
const bodyParser = require("body-parser")

const app = express()
let items = [];
let workItems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.get("/", function(req, res) {
  let today = new Date()
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  let day = today.toLocaleDateString("en-US", options);
  res.render("index", {
    listTitle: day,
    newListItems: items
  });

})
app.post("/", function(request, response) {
  let item = request.body.newItem;
  if (request.body.list === "Work") {
    workItems.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
})
app.get("/work", function(req, res) {
  res.render("index", {
    listTitle: "Work list",
    newListItems: workItems
  });
})
app.post("/", function(request, response) {
  let item = request.body.newItem;
  items.push(item);
  response.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started at port 3000")
})
