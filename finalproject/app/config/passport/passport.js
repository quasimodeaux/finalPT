var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport, user){
    var User = user;
    var LocalStrat = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });

    passport.use('local-signup', new LocalStrat(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true //lets us pass entire request to callback
        }, function(req, email, password, done) {
            // Handle Storing user details
            var generateHash = function(password){
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

            };
            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {

                if (user)

                {

                    return done(null, false, {
                        message: 'That email is already taken'
                    });

                } else

                {

                    var userPassword = generateHash(password);

                    var data =

                        {
                            email: email,

                            password: userPassword,

                            firstname: req.body.firstname,

                            lastname: req.body.lastname

                        };


                    User.create(data).then(function(newUser, created) {

                        if (!newUser) {

                            return done(null, false);

                        }

                        if (newUser) {

                            return done(null, newUser);

                        }

                    });

                }

            });
        }));
};


