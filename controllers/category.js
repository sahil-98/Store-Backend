const Category = require("../models/category")


exports.getCategoryById = (req,res , next ,id) => {
    Category.findById(id).exec((err, cate) => {

        if(err) {
            return res.status(400).json ( {
                error: "Category not found in DB"
            })
        }
        req.category = cate;   //req.category is variable
        next();
    })
}

exports.createCategory = (req,res) =>  { 
    const category = new Category(req.body);

    category.save((err , category) => {
        if(err) {
            return res.status(400).json ( {
                error: "Failed to create category"
            })
            //console.log("YYY");
        }
        res.json({category});
        
    })
}

exports.getCategory = (req,res) => {

    return res.json(req.category)
};


exports.getAllCategory = (req,res) => {

    Category.find().exec((err , categories) => {

        if(err) {
            return res.status(400).json ( { 
                error: "Category not found in DB"
            })
        }
        res.json(categories);

    })
};

exports.updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updateCategory) => {
        
        if(err) {
            return res.status(400).json ( {
                error: "Failed to Update Category"
            })
        }
        res.json(updateCategory);
    })
}

exports.deleteCategory =(req ,res) => {

        const category = req.category;

        category.remove((err ,category) => {      //remove operation of Mongo
            if(err) {
                return res.status(400).json ( {
                    error: "Failed to delete the Category"
                })
            }   
            res.json({
                message: " Successfully Deleted" 
            })
        })   
}
