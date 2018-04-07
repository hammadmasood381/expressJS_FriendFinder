const validator = require('validator');
const uuidv4 = require('uuid/v4');
module.exports = function(app,database) {
    
    app.get('/api/friends', function(req, res) {
        res.json(database);
    });

    app.post('/api/friends',function(req, res){
        let userobject = {
            uuid: uuidv4(),
            name: req.body.name,
            photo: req.body.photo,
            questions: [req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.question5,req.body.question6,req.body.question7,req.body.question8,req.body.question9,req.body.question10]
        }

        if(checkvalid(userobject)) {
            database.push(userobject);
            res.redirect("/user/" + userobject.uuid)
        }
        else {
            res.render("error",{errordesc:"you did not submit the form correctly"})
        }
    });

}

function checkvalid(userobj) {
    if(validator.isEmpty(userobj.name)) {
        console.log("name is empty");
        return false;
    }
    if(!validator.isURL(userobj.photo)){
        console.log("photo is not url");
        return false;
    }
    for(let i = 0; i < userobj.questions.length; i++) {
        if(!validator.isInt(userobj.questions[i],{min:1,max:5})) {
            console.log("question answer is not valid number or is not between 1 and 5")
            return false
        }
        
    }
    return true;
}

