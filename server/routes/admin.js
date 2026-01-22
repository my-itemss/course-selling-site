const { Router } = require("express");
const adminRouter = Router();
const { adminModel } = require("../db/db")

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: " admin signup endpoint",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: " admin signin endpoint",
  });
});

adminRouter.post("/course", function(rq,res){
    res.json({
        msg: "purchasing"
    })
})

adminRouter.put("/course", function(rq,res){
    res.json({
        msg: "change"
    })
})


adminRouter.get("/course/bulk" , function(req,res){
    res.json({
        msg : " preview"
    })
})


module.exports = {
    adminRouter : adminRouter
}