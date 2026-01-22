const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function(rq,res){
    res.json({
        msg: "purchasing"
    })
})

courseRouter.get("/preview" , function(req,res){
    res.json({
        msg : " preview"
    })
})

module.exports = {
    courseRouter : courseRouter
}