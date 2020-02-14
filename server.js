const express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
require('dotenv').config();
var billing_email = require('express-email')(__dirname + '/email/billing');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
// const PORT = 3000;
const PORT = process.env.PORT || 4000;

let Job = require('./working.model');
let Plan = require('./plan.model');
let User = require('./todo.model');
let Category = require('./category.model');
let Question = require('./question.model');
let Scores = require('./scores.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/question', { useNewUrlParser: true });

const connection = mongoose.connection;



connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/scoresshow').post(function (req, res) {
    //   console.log('request:  ', req);
    Scores.find(function (err, aaddresponsea) {
        if (err) {
            res.status(401).json({
                'status': 401,
                'message': 'failed',
                'data': " "
            });
        } else {
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'data': aaddresponsea
            });


        }
    });
});

todoRoutes.route('/scoresGlobalshow').post(function (req, res) {
    //   console.log('request:  ', req);
    Scores.aggregate(
        [
            {
              $group:
                {
                    _id: "$category",
                  scores: { $max: "$scores" }
                }
            }
          ],
        function (err, response) {
        if (err) {
            res.status(401).json({
                'status': 401,
                'message': 'failed',
                'data': " "
            });
        } else {
            // var swap = {}, cart = []
            // swap["_id"] = aaddresponsea[0]._id
            // swap["email"] = aaddresponsea[0].email
            // swap["cretedates"] = aaddresponsea[0].cretedates
            // swap["category"] = aaddresponsea[0].category
            // swap["scores"] = aaddresponsea[0].scores
            // swap["name"] = aaddresponsea[0].name
            // cart.push(swap);            
            // for (var i = 1; i < aaddresponsea.length; i++) {
            //     for (var j = 0; j < i; j++) {
            //         if (aaddresponsea[i].category = aaddresponsea[j].category && aaddresponsea[i].scores > aaddresponsea[j].scores) {
            //             swap._id = aaddresponsea[i]._id
            //             swap.email = aaddresponsea[i].email
            //             swap.cretedates = aaddresponsea[i].cretedates
            //             swap.category= aaddresponsea[i].category
            //             swap.scores = aaddresponsea[i].scores
            //             swap.name = aaddresponsea[i].name
            //             cart.push(swap)
            //         }
            //     }
            // }



            console.log('response: ', response);
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'data': response
            });
        }
    });
});

todoRoutes.route('/scoresadd').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.name != null && req.body.category != null && req.body.email != null && req.body.scores != null && req.body.cretedates != null) {
        let scores = new Scores(req.body);
        scores.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
            })
            .catch(err => {
                res.status(403).json({
                    'status': 403,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

todoRoutes.route('/scoresdelete').post(
    function (req, res) {
        if (req.body.key != null) {
            let key = req.body.key
            console.log(key);
            Scores.deleteOne({ _id: key }, function (err, scores) {
                if (err) {
                    res.status(401).json({
                        'status': 401,
                        'message': 'Do not exist data',
                        'data': " "
                    });
                } else {
                    res.status(200).json({
                        'status': 200,
                        'message': 'todo Updated successfully',
                        'data': scores
                    });
                }
            })
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'please input all field or correct value',
                'data': " "
            });
        }
    });

todoRoutes.route('/categoryadd').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.name != null && req.body.flag != null) {
        let category = new Category(req.body);
        category.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
            })
            .catch(err => {
                res.status(403).json({
                    'status': 403,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }
});

todoRoutes.route('/categoryshow').post(function (req, res) {
    //   console.log('request:  ', req);
    Category.find(function (err, aaddresponsea) {
        if (err) {
            res.status(401).json({
                'status': 401,
                'message': 'failed',
                'data': " "
            });
        } else {
            res.status(200).json({
                'status': 200,
                'message': 'success',
                'data': aaddresponsea
            });


        }
    });
});

todoRoutes.route('/categoryupdate').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.key != null && req.body.name != null && req.body.flag != null) {
        let key = req.body.key
        Category.findById(key, function (err, category) {
            if (err) {
                res.status(401).json({
                    'status': 401,
                    'message': 'Do not exist data',
                    'data': " "
                });
            } else {
                console.log("doc : ", category)
                category.name = req.body.name;
                category.flag = req.body.flag;
                category.save(() => {
                    res.status(200).json({
                        'status': 200,
                        'message': 'todo Updated successfully',
                        'data': "success"
                    });
                });
            }
        });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': " "
        });
    }
});


todoRoutes.route('/categorydelete').post(
    function (req, res) {
        if (req.body.key != null) {
            let key = req.body.key
            console.log(key);
            Category.deleteOne({ _id: key }, function (err, category) {
                if (err) {
                    res.status(401).json({
                        'status': 401,
                        'message': 'Do not exist data',
                        'data': " "
                    });
                } else {
                    res.status(200).json({
                        'status': 200,
                        'message': 'todo Updated successfully',
                        'data': category
                    });
                }
            })
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'please input all field or correct value',
                'data': " "
            });
        }
    });

// todoRoutes.route('/categoryupdate/:id').post(function (req, res) {
//     let id = req.url.split('/')[2]
//     console.log("req :", id)

//     Category.findById(id, function (err, doc) {
//         if (err) console.log("err ; ", err)        
//         console.log("doc : ", doc)
//         doc.name = req.body.name;
//         doc.save(() => {
//             res.send("success")
//         });
//     });
// });

// todoRoutes.route('/categorydelete/:id').delete(
//     function (req, res) {
//         let id = req.params.id;
//         console.log(id);
//         Category.deleteOne({ _id: id }, function (err, category) {
//             res.json(category);
//         })
//     }
// );

todoRoutes.route('/questionadd').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.categoryid != null && req.body.desc != null && req.body.answer1 != null && req.body.answer2 != null && req.body.answer3 != null && req.body.answer4 != null && req.body.grade != null && req.body.correct != null && req.body.createDate != null) {
        let question = new Question(req.body);
        question.save()
            .then(todo => {
                res.status(200).json({
                    'status': 200,
                    'message': 'todo added successfully',
                    'data': 'successfully'
                });
            })
            .catch(err => {
                res.status(401).json({
                    'status': 401,
                    'message': 'todo added failed',
                    'data': 'flase'
                });
            });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': 'flase'
        });
    }

});

todoRoutes.route('/questionshow').get(function (req, res) {
    //   console.log('request:  ', req);
    Question.find(function (err, aaddresponsea) {
        if (err) {
            res.status(401).json({
                'status': 401,
                'message': 'todo failed',
                'data': " "
            });
        } else {
            res.status(200).json({
                'status': 200,
                'message': 'todo added successfully',
                'data': aaddresponsea
            });
        }
    });
});

todoRoutes.route('/questionupdate').post(function (req, res) {
    console.log("request : ", req.body)
    if (req.body.key != null && req.body.categoryid != null && req.body.desc != null && req.body.answer1 != null && req.body.answer2 != null && req.body.answer3 != null && req.body.answer4 != null && req.body.grade != null && req.body.correct != null) {
        let key = req.body.key
        Question.findById(key, function (err, question) {
            if (err) {
                res.status(401).json({
                    'status': 401,
                    'message': 'Do not exist data',
                    'data': " "
                });
            } else {
                console.log("doc : ", question)
                question.categoryid = req.body.categoryid;
                question.desc = req.body.desc;
                question.answer1 = req.body.answer1;
                question.answer2 = req.body.answer2;
                question.answer3 = req.body.answer3;
                question.answer4 = req.body.answer4;
                question.grade = req.body.grade;
                question.correct = req.body.correct;
                question.save(() => {
                    res.status(200).json({
                        'status': 200,
                        'message': 'todo Updated successfully',
                        'data': "success"
                    });
                });
            }

        });
    } else {
        res.status(400).json({
            'status': 400,
            'message': 'please input all field or correct value',
            'data': " "
        });
    }

});

todoRoutes.route('/questiondelete').post(
    function (req, res) {
        if (req.body.key != null) {
            let key = req.body.key
            console.log(key);
            Question.deleteOne({ _id: key }, function (err, question) {
                if (err) {
                    res.status(401).json({
                        'status': 401,
                        'message': 'Do not exist data',
                        'data': " "
                    });
                } else {
                    res.status(200).json({
                        'status': 200,
                        'message': 'todo Updated successfully',
                        'data': question
                    });
                }

            })
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'please input all field or correct value',
                'data': " "
            });
        }
    });









todoRoutes.route('/add').post(function (req, res) {

    let email = req.body.email
    let password = req.body.password
    console.log("receiver email : ", email)
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'leapord198414@outlook.com',
            pass: 'xincheng1201'
        }
    });
    let user = new User(req.body);
    user.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
            const mailOptions = {
                from: 'leapord198414@outlook.com', // sender address
                to: email, // list of receivers
                subject: "Congratulation",
                html: "<h1>Welcome</h1><p>That was easy!</p><p>Your email address is :<u> " + user.email + " </u>  and your password is : <u>" + password + "  </u><br /> please login to  <a href='http://192.168.1.198:3000/'>OUR TEAM Site</a><br> </P>!",
                text: "Thank."
            };

            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.log("error :", err)
                else
                    console.log("success email :", info.response);
            });

            // // preview
            // if (app.get('env') === 'development') {
            //     var locals = { activation_code: '000000-0000-00000000-000000-00000000' };
            //     app.get('/_mail/billing', billing_email.preview(locals));
            // }

            // // render
            // app.get('/sendBilling', function (req, res, next) {
            //     // ...
            //     var locals = { activation_code: '000000-0000-00000000-000000-00000000' };
            //     billing_email.render(locals, function (err, result) {
            //         // result.html
            //         // result.text
            //         // result.attachments
            //             // transporter.sendEmail({
            //             //     from: "leapord198414@outlook.com",
            //             //     to: user.email,
            //             //     subject: "Congratulation",
            //             //     text: '<h1>Welcome</h1><p>That was easy!</p><p>Your email address is <' + user.email + '> and your password is <' + user.password + '>.please login to OUR TEAM Site</P>!'
            //             // });
            //     });
            // });

        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/send_email').get(function (req, res) {

    let email = req.query['email']

    console.log("receiver email : ", email)



    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'leapord198414@outlook.com',
            pass: 'xincheng1201'
        }
    });

    // transporter.sendEmail({
    //     from: "golden198989@outlook.com",
    //     to: email,
    //     subject: "Congratulation",
    //     html: '<h1>Welcome</h1><p>That was easy!</p><p>Your email address is <' + email + '> and your password.please login to OUR TEAM Site</P>',
    //     text: "Thank."
    // });
    const mailOptions = {
        from: 'leapord198414@outlook.com', // sender address
        to: email, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your html here</p>'// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log("error :", err)
        else
            console.log("success email :", info.response);
    });

    res.send("Okay")

});

todoRoutes.route('/start').post(function (req, res) {

    let newUser = new User(req.body);

    User.find(function (err, user) {
        console.log("user start  ;", err, user);

        if (err) {
            console.log("error : ", err)
            res.status(200).json({ 'todo': 'failed' });
        } else {

            if (user.length == 0) {
                console.log("here length is", user.length);
                newUser.save()
                    .then(todo => {
                        res.status(200).json({ 'todo': 'todo added successfully' });



                    })
                    .catch(err => {
                        res.status(400).send('adding new todo failed');
                    });
            } else {

                res.status(200).json({ 'todo': 'todo added successfully' });

            }

        }

    });
});

// todoRoutes.route('/start').post(function (req, res) {

//     let newUser = new User(req.body);

//     User.find(function (err, user) {
//         console.log("user start  ;", err, user);

//         if (err) {
//             console.log("error : ", err)
//             res.status(200).json({ 'todo': 'failed' });
//         } else {

//             if (user.length == 0) {
//                 console.log("here length is", user.length);
//                 newUser.save()
//                     .then(todo => {
//                         res.status(200).json({ 'todo': 'todo added successfully' });

//                         var mailOptions = {
//                             from: 'hwolf0610@outlook.com',
//                             to: user.email,
//                             subject: 'Congratulation!',
//                             html: '<h1>Welcome</h1><p>That was easy!</p><p>Your email address is <' + user.email + '> and your password is <' + user.password + '>.please login to OUR TEAM Site</P>'
//                         };

//                         transporter.sendMail(mailOptions, function (error, info) {
//                             if (error) {
//                                 console.log(error);
//                             } else {
//                                 console.log('Email sent: ' + newUser.response);
//                             }
//                         });
//                     })
//                     .catch(err => {
//                         res.status(400).send('adding new todo failed');
//                     });
//             } else {

//                 res.status(200).json({ 'todo': 'todo added successfully' });

//             }

//         }

//     });
// });

todoRoutes.route('/userdelete/:id').delete(
    function (req, res) {
        let id = req.params.id;
        console.log(id);
        User.deleteOne({ _id: id }, function (err, user) {
            // var mailOptions = {
            //     from: 'leapord198414@outlook.com',
            //     to: user.email,
            //     subject: 'Alarm!',
            //     text: 'Your infomation was deleted by administrator!'
            // };

            // transporter.sendMail(mailOptions, function (error, info) {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + user.response);
            //     }
            // });

            res.json(user);
        })
    }
);

todoRoutes.route('/login').post(function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});








todoRoutes.route('/').get(function (req, res) {
    //   console.log('request:  ', req);
    User.find(function (err, aa) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(aa);

        }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});


todoRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.email = req.body.email;
        user.password = req.body.password;

        user.save().then(todo => {
            res.json('Todo updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/workdelete/:id').delete(
    function (req, res) {
        let id = req.params.id;
        console.log(id);
        Job.deleteOne({ _id: id }, function (err, job) {
            res.json(job);
        })
    }
);

todoRoutes.route('/userdelete/:id').delete(
    function (req, res) {
        let id = req.params.id;
        console.log(id);
        User.deleteOne({ _id: id }, function (err, user) {
            res.json(user);
        })
    }
);
todoRoutes.route('/login').post(function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});

todoRoutes.route('/userupdate/:id').post(function (req, res) {
    let id = req.url.split('/')[2]
    console.log("req :", id)

    User.findById(id, function (err, doc) {
        if (err) console.log("err ; ", err)
        // doc.name = 'jason bourne';
        console.log("doc : ", doc)
        doc.name = req.body.name;
        doc.birthday = req.body.birthday;
        doc.email = req.body.email;
        doc.address = req.body.address;
        doc.password = req.body.password;
        doc.save(() => {
            res.send("sccesss")
        });
    });
    //   User.findByIdAndUpdate(id, req.body);
});

todoRoutes.route('/planupdate/:id').post(function (req, res) {
    let id = req.url.split('/')[2]
    console.log("req :", id)

    Plan.findById(id, function (err, doc) {
        if (err) console.log("err ; ", err)
        // doc.name = 'jason bourne';
        console.log("doc : ", doc)
        doc.month = req.body.month;
        doc.week = req.body.week;
        doc.flag = req.body.flag;
        doc.year = req.body.year;
        doc.name = req.body.name;
        doc.detail = req.body.detail;
        doc.price = req.body.price;
        doc.save(() => {
            res.send("sccesss")
        });
    });
    //   User.findByIdAndUpdate(id, req.body);
});

todoRoutes.route('/plandelete/:id').delete(
    function (req, res) {
        let id = req.params.id;
        console.log(id);
        Plan.deleteOne({ _id: id }, function (err, plan) {
            res.json(plan);
        })
    }
);

todoRoutes.route('/planadd').post(function (req, res) {
    console.log("request : ", req.body)
    let plan = new Plan(req.body);
    plan.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/jobadd').post(function (req, res) {
    console.log("request : ", req.body)
    let job = new Job(req.body);
    job.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/getJobchart').post(function (req, res) {
    // db.users.find({"name":"Jack"},{"age":1})

    Job.find(function (err, job) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(job);

        }
    });
});

todoRoutes.route('/getPlanchart').post(function (req, res) {
    // db.users.find({"name":"Jack"},{"age":1})

    Plan.find(function (err, plan) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(plan);

        }
    });
});

todoRoutes.route('/jobshow').post(function (req, res) {
    Job.find(function (err, job) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(job);

        }
    });
});

todoRoutes.route('/working').post(function (req, res) {
    let job = new Job(req.body);
    job.save()
        .then(todo => {
            res.status(200).json({ 'todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/show').post(function (req, res) {

    User.find(function (err, user) {
        // db.user.distinct('name'); 
        console.log(user.name);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});

todoRoutes.route('/showplan').post(function (req, res) {

    Plan.find(function (err, plan) {
        // db.user.distinct('name'); 
        console.log(plan.name);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(plan);

        }
    });
});

todoRoutes.route('/showdistinct').post(function (req, res) {
    User.find(function (err, user) {
        // db.User.distinct('name'); 
        console.log(user.name);
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});

// todoRoutes.route('/add').post(function (req, res) {
//     let user = new User(req.body);
//     user.save()
//         .then(todo => {
//             res.status(200).json({ 'todo': 'todo added successfully' });
//         })
//         .catch(err => {
//             res.status(400).send('adding new todo failed');
//         });
// });

todoRoutes.route('/addplan').post(function (req, res) {
    let newplan = new Plan(req.body);
    Plan.find(function (err, plan) {
        console.log("user start  ;", err, plan);
        if (err) {
            console.log("error : ", err)
            res.status(200).json({ 'todo': 'failed' });
        } else {
            if (plan.length == 0) {
                console.log("here length is", plan.length);
                newplan.save()
                    .then(todo => {
                        res.status(200).json({ 'todo': 'todo added successfully' });
                    })
                    .catch(err => {
                        res.status(400).send('adding new todo failed');
                    });
            } else {
                Plan.findOne({ name: req.body.name, month: req.body.month, year: req.body.year }, function (err, plan2) {
                    if (err) {
                        console.log("err->", err);
                    } else {
                        // plan2.price = req.body.price;
                        Plan.findByIdAndUpdate(plan2.id, { price: req.body.price }, (err1, res1) => {
                            if (err1)
                                console.log("err ; ", err1)
                            else {
                                console.log("update data : ", res1)
                                res.status(200).json(res1)
                            }

                        })

                        // plan2.save()
                        //     .then(todo => {
                        //         res.json('Todo updated!');
                        //     })
                        //     .catch(err => {
                        //         res.status(400).send("Update not possible");
                        //     });


                    }


                });
            }
        }
    });
});

// todoRoutes.route('/addplan').post(function (req, res) {
//     console.log("request : ", req.body)
//     let plan = new Plan(req.body);
//     plan.save()
//         .then(todo => {
//             res.status(200).json({ 'todo': 'todo added successfully' });
//         })
//         .catch(err => {
//             res.status(400).send('adding new todo failed');
//         });
// });


todoRoutes.route('/login').post(function (req, res) {
    User.findOne({ email: req.body.email, password: req.body.password }, function (err, user) {
        if (err) {
            console.log("err->", err);
        } else {
            res.json(user);

        }
    });
});
app.use('/todos', todoRoutes);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});