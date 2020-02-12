const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

//contact model

const Contact = require('../model/Contact');
const User = require("../model/User");

//@route GET me/contacts
//@desc Get all contacts
//@access Public

router.get('/', auth ,async(req, res) => {

    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);

        Contact.find({userid: user.id})
            .sort({first: 1})
            .then(contact => res.json(contact))
        //res.json(user);
      } catch (e) {
        res.send({ message: "Error in Fetching user" });
      }

 
});

//@route POST me/contacts/add
//@desc Add a contact
//@access Public

router.post('/add', (req, res) => {

    if(req.body.first == null)
    {
        req.body.first = "";
    }
    if(req.body.last == null)
    {
        req.body.last = "";
    }
    if(req.body.phone == null)
    {
        req.body.phone = "";
    }
    if(req.body.note == null)
    {
        req.body.note = "";
    }
    if(req.body.userid == null)
    {
        req.body.userid = "";
    }

    const newContact = new Contact({
        

        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        note: req.body.note,
        userid: req.body.userid
    });

    console.log(req.body);

    newContact.save()
    .then(contact => res.json(contact))
    .catch(console.log);
    
});

//@route DELETE me/contacts/:id
//@desc Delete contact by Mongo ID
//@access Public

router.delete('/:id', (req, res) => {
    Contact.findById(req.params.id)
        .then(contact => contact.remove().then(()=> res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

//@route POST me/contacts/search
//@desc Search through contacts
//@access Public

router.post('/search', async (req, res) => {
    //incoming: userId, fSearch, lSearch
    //outgoing: results[]

    var fSearch = req.body.first;
    var lSearch = req.body.last;
    var uSearch = req.body.userid;

    if(fSearch == null)
        fSearch = "";
    if(lSearch == null)
        lSearch = "";
    if(uSearch == null)
        uSearch = "";


    const fResults = await Contact.find({first :{$regex:fSearch+'.*', $options:'r'}, last :{$regex:lSearch+'.*', $options:'r'} });

    var results = [];

    for(var i = 0; i < fResults.length; i++)
    {
        if(fResults[i].userid == uSearch)
        {
            results.push(fResults[i]);
        }
    }    

    res.status(200).json(results);

});


/*
router.get('/search', (req, res) => {
    var search = new RegExp(req.body.search, 'ig');
    Contact.aggregate()
    .project({
        fullName: {$concat: ['$first',' ','$last']},
        first: 1,
        last: 1,
        phone: 1,
        note: 1,
        userid: 1
    })
    .match({fullName: search})
    .then(contact => res.json(contact))
});*/


//@route POST me/contacts/edit/:id
//@desc Edit a contact by Mongo ID
//@access Public

router.post('/edit/:id', (req, res) => {

    Contact.findById(req.params.id).then(contact => {

        var tempFirst = contact.first;

        if(contact.last != null)
            var tempLast = contact.last;
        else
            var tempLast = "";
        
        var tempPhone = contact.phone;

        if(contact.note != null)
            var tempNote = contact.note;
        else
            var tempNote = "";
        
        var tempUser = contact.userid;

        contact.first = req.body.first;
        contact.last = req.body.last;
        contact.phone = req.body.phone;
        contact.note = req.body.note;
        contact.userid = req.body.userid;

        if(req.body.first == null)
            contact.first = tempFirst;
        if(req.body.last == null)
            contact.last = tempLast;
        if(req.body.phone == null)
            contact.phone = tempPhone;
        if(req.body.note == null)
            contact.note = tempNote;
        if(req.body.userid == null)
            contact.userid = tempUser;


        contact.save()
            .then(() => res.json(contact))
            .catch(err => res.status(404).json(err));
    })
    .catch(err => status(404).json(err));
})

module.exports = router;
