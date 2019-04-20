module.exports = function(app, passport, db, multer, ObjectId) {

  //---------------------------------------
  // IMAGE CODE
  //---------------------------------------
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("multer req.url:", req.url);
      if (req.url.indexOf("creations") != -1) {
        console.log("uploading to art");
        cb(null, 'public/images/art')
      } else {
        console.log("uploading to profile");
        cb(null, 'public/images/profile')
      }
    },
    filename: function (req, file, cb) {
      let extensionStart = file.originalname.lastIndexOf(".")
      let extension = file.originalname.substring(extensionStart)
      console.log("multer storage file:", extensionStart, extension);

      cb(null, file.fieldname + '_' + Date.now() + extension)
    }
  })
  let upload = multer({storage: storage})

  //---------------------------------------
  // IMAGE CODE END
  //---------------------------------------


  //===============================================================
  //                NORMAL 'GET' ROUTES
  //===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs')
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, (req, res) => {
    const firstName = req.query.firstName
    const lastName = req.query.lastName
    console.log(req.user)
    const uid = req.user.local.email
    db.collection('info').find({email:req.user.local.email}).toArray((err, result1) => {
      if (err) return console.log(err)
      db.collection('creations').find({email:req.user.local.email}).toArray((err, result) => {
        if (err) return console.log(err)
        console.log(" from /profile profile:", result1, "work:", result);
        res.render('profile.ejs', {
          user : req.user,
          profile: result1,
          work: result,
        })
      })
    })
  })

  // GALLERY SECTION =========================
  app.get('/gallery', (req, res) => {
    console.log(req.user)
    db.collection('info').find().toArray((err, result1) => {
      if (err) return console.log(err)
      db.collection('creations').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log("from /gallery profile:", result1, "work:", result);
        res.render('gallery.ejs', {
          user : req.user,
          profile: result1,
          work: result
        })
      })
    })
  })

  // Artist  SECTION =========================
  app.get('/artist', function(req, res){
    db.collection('info').find().toArray((err, result1) => {
      if (err) return console.log(err)
      db.collection('creations').find().toArray((err, result) => {
        if (err) return console.log(err)
        console.log("from /gallery profile:", result1, "work:", result);
        res.render('gallery.ejs', {
          user : req.user,
          profile: result1,
          work: result
        })
      })
    });

    // Form SECTION =========================
    app.get('/form', function(req, res) {
      console.log(req.session);
      db.collection('info').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('form.ejs', {
          user : req.user,
          messages: result
        })
      })
    });


    // Edit profile SECTION =========================
    app.get('/editProfile', function(req, res) {
      console.log(req.user)
      db.collection('info').find().toArray((err, result) => {
        if (err) return console.log(err)
        const profileInfo = result.find((profile) => {
          return profile.email == req.user.local.email
        })
        console.log(profileInfo)
        res.render('editForm.ejs', {
          user : req.user,
          profile: profileInfo
        })
      })
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/')
    });

    //===============================================================
    //                NORMAL 'POST' ROUTES
    //===============================================================

    //===== Uploading profile pic on profile Page====

    app.post('/info', upload.single('profilePic'), (req, res) => {
      console.log("THIS IS THE FILE", req.file);
      db.collection('info').save({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tagLine: req.body.tagLine,
        email: req.user.local.email,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
        city: req.body.city,
        state: req.body.state,
        web: req.body.web,
        profilePic: "images/profile/" + req.file.filename
      }, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('profile')
      })
    })

    //======== uploading art work on profile Page====

    app.post('/creations', upload.single('artWork'), (req, res) => {
      console.log("THIS IS THE FILE", req.file);
      db.collection('creations').save({email: req.user.local.email, caption: req.body.caption, artWork: "images/art/" + req.file.filename}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('profile')
      })
    })
    //===============================================================
    //                NORMAL 'PUT' ROUTES
    //===============================================================

    //======== Profile Page====
    app.put('/updateProfile', isLoggedIn, function(req, res){
      console.log('HELLLLLLLLOOOOOOOOOOOOO' + req.body.profilePic)
      db.collection('info')
      .findOneAndUpdate({_id: ObjectId(req.body._id)}, {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          tagLine: req.body.tagLine,
          email: req.body.email,
          twitter: req.body.twitter,
          instagram: req.body.instagram,
          city: req.body.city,
          state: req.body.state,
          web: req.body.web
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        res.redirect(result)
      })
    })

    //===============================================================
    //                NORMAL 'DELETE' ROUTES
    //===============================================================

    //  ======Delete posted Art Work======
    app.delete('/creations', (req, res) => {
      console.log('ABOUT TO DELETE THIS ID!', req.body._id);
      db.collection('creations').findOneAndDelete({_id: ObjectId(req.body._id)}, (err, result) => {
        if (err) return res.send(500, err)
        console.log('MONGO DELETE FINISHED!');
        res.send('Your Painting has been deleted!')
      })
    })

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function(req, res) {
      res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/login', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/form', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
        res.redirect('/profile');
      });
    });

  };

  // route middleware to ensure user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
    return next();

    res.redirect('/');
  }
