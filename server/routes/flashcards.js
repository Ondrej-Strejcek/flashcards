const router = require('express').Router();

const Collection = require('../models/Collection');
const User = require('../models/User');
const authRequired = require('../middleware/verifyToken');



// @route   /api/flashcards
// @desc    Show all user's collections. 
// @access  Authenticated Users Only
router.get('/', authRequired,async (req, res) => {
    try{
        let sort;
        switch(req.query.sortBy){
            case'date':
                sort = "-createdAt";
            break;
            case'-date':
                sort = "createdAt";
            break;
            case'name':
                sort = "name";
            break; 
            case'-name':
                sort = "-name";
            break;
            default: 
                sort = "-createdAt";
        }
        const collections = await Collection.find({ creator: req.user._id}).sort(sort).exec();
        collections.forEach(collection => {
            const {name, slug} = collection
            collection = {
                name: name,
                slug: slug
            }
        })
        res.json({
            collections: collections,
            isSuccess: true,
        });
    }
    catch{
        res.json({
            msg: "Something went wrong",
            isSuccess: false,
        });
    }
});


// @route   /api/flashcards/shared-with-me
// @desc    Show all collections shared with authenticated user
// @access  Authenticated Users Only
router.get('/shared-with-me', authRequired,async (req, res) => {
    try{
        const collections = await Collection.find({sharedUsers: { $in: [req.user._id]}}).exec();
        collections.forEach(collection => {
            const {name, slug} = collection
            collection = {
                name: name,
                slug: slug
            }
        });
        res.json({
            collections: collections,
            isSuccess: true,
        });
    }
    catch{
        res.json({
            msg: "Something went wrong",
            isSuccess: false,
        });
    }
});



// @route   /api/flashcards/create-collection
// @desc    Create collection
// @access  Authenticated Users Only
router.post('/create-collection', authRequired, async (req, res) => {
    try{
        //Check if collection name is not empty
        if(req.body.name=== "") return res.status(400).json({
            err: "You have to enter collection name",
            isSuccess: false
        });
        //Check if collection name is unique
        const checkCollection = await Collection.findOne({ name: req.body.name, creator: req.user._id});
        if(checkCollection) return res.status(400).json({
            err: "You already have collection with this name.",
            isSuccess: false,
        });

        //Create slug
        let slug = req.body.name.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();
        

        //Check if slug is unique
        const checkSlug = await Collection.findOne({ slug: slug, creator: req.user._id});
        if(checkSlug) return res.status(400).json({
            err: "You already have collection with this name.",
            isSuccess: false,
        });

        const newCollection = new Collection({
            name: req.body.name,
            slug: slug,
            creator: req.user._id,
        });
        console.log(newCollection)
        await newCollection.save();
        res.status(200).json({
            msg: "Collection has been created.",
            isSuccess: true,
        });
    }
    catch{
        res.status(500).json({
            msg: "Something went wrong!",
            isSuccess: false
        })
    }
});

// @route   /api/flashcards/collection:slug/
// @desc    View Collection Cards
// @access  Authenticated Users Only
router.get('/:slug', authRequired, async(req, res) => {
    try {
        const shared = (req.query.shared === "true");
        if(!shared){
            const collection = await Collection.findOne({slug: req.params.slug, creator: req.user._id});
            const {name, slug, flashcards} = collection;
            const username = await User.findOne({_id: collection.creator});
            if(collection){
                return res.status(200).json({
                    msg: "Fetched successfully",
                    collection: {
                        name: name,
                        slug: slug,
                        flashcards: flashcards
                    },
                    shared: shared,
                    successful: true,
                    creatorUsername: username.username
                });
            }
        }else{
            const shared_collection = await Collection.findOne({slug: req.params.slug, sharedUsers: { $in: [req.user._id]}});
            const {shared_name, shared_slug, shared_flashcards} = collection;
            const username = await User.findOne({_id: shared_collection.creator});
            if(shared_collection){
                return res.status(200).json({
                    msg: "Fetched successfully",
                    collection: {
                        name: shared_name,
                        slug: shared_slug, 
                        flashcards: shared_flashcards,
                    },
                    shared: shared,
                    successful: true,
                    creatorUsername: username.username,
                })
            }
        }
        console.log("404")
        return res.status(404)
    }catch (err) {
        res.status(500)
    }
})

// @route   /api/flashcards/collection:slug/edit
// @desc    Edit collection name
// @access  Authenticated Users Only
router.get('/:slug/edit', authRequired, async (req, res) =>{
    try{
        const collection = await Collection.findOne({slug: req.params.slug, creator: req.user._id});
        const {name} = collection
        if(collection){
            return res.status(200).json({
                collection: {
                    name: name,
                },
            });
        }else{
            return res.status(400).json({
                err: "Collection not found"
            })
        }
    }catch{

    }
})


// @route   /api/flashcards/collection:slug/edit
// @desc    Edit collection name
// @access  Authenticated Users Only
router.patch('/:slug/edit',authRequired, async (req, res) => {
    try{
        const collection = await Collection.findOne({slug: req.params.slug, creator: req.user._id});

        //Check if collection name is not empty
        if(req.body.name=== "") return res.status(400).json({
            err: "You have to enter collection name",
            isSuccess: false
        });
        //Check if collection name is unique
        const checkCollection = await Collection.findOne({ name: req.body.name, creator: req.user._id});
        if(checkCollection) return res.status(400).json({
            err: "You already have collection with this name.",
            isSuccess: false,
        });

        //Create slug
        let slug = req.body.name.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase();

        //Check if slug is unique
        const checkSlug = await Collection.findOne({ slug: slug, creator: req.user._id});
        if(checkSlug) return res.status(400).json({
            err: "You already have collection with this name.",
            isSuccess: false,
        });
        
        collection.name = req.body.name;
        collection.slug = slug;

        await collection.save();
        res.status(200).send(collection)
    }catch{
        res.status(500)
    }
}) 

// @route   DELETE /api/flashcards/collection:slug/delete
// @desc    Delete collection 
// @access  Authenticated Users Only // Creator only
router.delete('/:slug/delete', authRequired, async (req, res) => {
    try{
        const belongsToUser = await Collection.deleteOne({ slug: req.params.slug, creator: req.user._id});
        if(belongsToUser){
            return res.status(200).json({
                msg: "Collection deleted",
                isSuccess: true,
            });
        }else{
            return res.status(400).json({
                msg: "Cannot delete.",
                isSuccess: false,
            });
        }
    }catch{
        res.status(500)
    }
})


// @route   DELETE /api/flashcards/collection:slug/card:id
// @desc    Delete collection 
// @access  Authenticated Users Only // Creator only
router.delete('/:slug/:card/delete', authRequired, async (req, res) => {
    try{
        const belongsToUser = await Collection.updateOne({slug: req.params.slug, creator: req.user._id}, {$pull: { flashcards: { _id: req.params.card}}});
        if(belongsToUser){
            return res.status(200).json({
                msg: "Card deleted",
                isSuccess: true,
                belongsToUser: belongsToUser,
            });
        }else{
            return res.status(400).json({
                err: "Can not delete"
            })
        }
    }catch{
        res.status(500)
    }
})



// @route   /api/flashcards/collection:slug/create-card
// @desc    Create card to collection
// @access  Authenticated Users Only
router.post('/:slug/create-card', authRequired, async (req, res) => {
    try{
        const card = {
            question: req.body.title,
            answer: req.body.body,
        };
        const collection = await Collection.findOne({slug: req.params.slug, creator: req.user._id});
        if(collection){
            collection.flashcards.push(card);
            await collection.save()
            return res.status(200).json({
                msg: "Successfully created.. "
            });
        }else{
            return res.status(400).json({
                err: "Collection does not exist."
            });
        }
    }catch{
        return res.status(500)
    }
})


module.exports = router;