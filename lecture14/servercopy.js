// overview (Home Page ("HomePage", "/", ""))
// Product Page("product")
// "/api" => display data.json to browser
// Error 404
// npm install --save-dev nodemon
var http = require("http");
var fs = require("fs");
var url = require("url");
var json = fs.readFileSync("./data.json")
var template = fs.readFileSync("./templates/product.html")
var cardsTemplate = fs.readFileSync("./templates/card.html")+"";
var overviewTemplate = fs.readFileSync("./templates/overview.html")+"";
template = template + ""
// replace
json = JSON.parse(json)// to convert into object

function replace(template, product){
    template = template.replace(/%image%/g, product["image"])
    template = template.replace(/%productName%/g, product["productName"])
    template = template.replace(/%from%/g, product["from"])
    template = template.replace(/%nutrients%/g, product["nutrients"])
    template = template.replace(/%quantity%/g, product["quantity"])
    template = template.replace(/%price%/g, product["price"])
    template = template.replace(/%description%/g, product["description"])
    return template;
}
var server =http.createServer(function(req,res){
    var url1 = url.parse(req.url,true)
    // var idarr = req.url.split("/")
    var pathName = url1.pathname;
    // var id = idarr[2];
    var id = url1.query.id;
    if(req.url == "/homepage"|| req.url =="/" || req.url == ""){
        // res.write("<h1>Home Page</h1>");
        var cards = "";
    for (var i = 0; i < json.length; i++) {
      cards = cards + replace(cardsTemplate, json[i]);
    }

    overviewTemplate=overviewTemplate.replace(/{%cardsarea%}/g, cards);
    res.write(overviewTemplate);
    }else if(pathName == "/product"){ //else if(req.url == `/product/${id}`)
        if(id == 0){
            var productpage = replace(template, json[0])
            res.write(productpage)
        }if( id == 1){
            var productpage = replace(template, json[1])
            res.write(productpage)
        } if(id == 2){
            var productpage = replace(template, json[2])
            res.write(productpage)
        }if (id == 3){
            var productpage = replace(template, json[3])
            res.write(productpage)
        }if(id == 4){
            var productpage = replace(template, json[4])
            res.write(productpage)
        }
    } else if(req.url == "/api"){
        res.write(json)
    }else {
        console.log()
        res.write("<h1>404 Page Not Found</h1>")
    }
    res.end()
})
server.listen(3000,function(){
    console.log("server created");
})