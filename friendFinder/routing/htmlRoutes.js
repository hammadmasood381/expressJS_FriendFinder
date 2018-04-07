module.exports = function(app,database) {

    app.get('/survey', function(req, res) {
        res.render('survey');
    });

    app.get('/user/:uuid',function(req,res) {
        if(database.length <= 1) {
            res.render("error",{errordesc:"not enough users yet to find your match",useruuid:req.params.uuid})
        }
        else {
            let comparedb = []
            let userobj;
            let matchobj;

            for(let i = 0; i < database.length; i++) {
                if(database[i].uuid != req.params.uuid) {
                    comparedb.push(database[i]);
                }
                else {
                    userobj = database[i];
                }
            }

            matchobj = matchuser(userobj,comparedb);


            
            res.render("user",{you:userobj,yourmatch: matchobj})
        }
    })

    app.get('*', function(req, res) {
        res.render('home');
    });
    
}

function matchuser(userobj,arrayofotherusers) {
    let differencesnum;
    let diffindex;


    for(let i = 0; i < arrayofotherusers.length;i++) {
          if(!differencesnum) {
              
              differencesnum = compare(userobj.questions,arrayofotherusers[i].questions)
              diffindex = i;
          }
          else {
              if(compare(userobj.questions,arrayofotherusers[i].questions) < differencesnum) {

                differencesnum = compare(userobj.questions,arrayofotherusers[i].questions)
                diffindex = i;
              }
          }
    }

    return arrayofotherusers[diffindex]

}

function compare(arr,comparearr) {
    let difference = 0;

    for(let i = 0; i < arr.length; i++) {
        let a = parseInt(arr[i]);
        let b = parseInt(comparearr[i]);
        let c = Math.abs(a-b);
        difference += c;
    }

    return difference;

}