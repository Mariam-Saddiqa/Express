var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    //res.send('hello')
    res.render('blog',{title:'this is a blog page'})
})

const auth={
    user:'root',
    pass:'admin'
}

//middleware
const authToken=(req,res,next)=>{
console.log("this is a middleware");
//console.log(req.body);
let authDecoded=Buffer.from(req.headers.authorization.substr(6),'base64').toString('utf-8').split(':')
if(auth.user!=authDecoded[0] && auth.pass!=authDecoded[1]){
    res.json({
        msg:'not allowed'
    })
}
console.log(req.headers.authorization.substr(6));
next();
}

//blog/api
router.get('/api',authToken,(req,res)=>{
    console.log(req.body);
    res.json({
        "id":1
    })
})
module.exports = router;