const express = require("express");
const Recipe = require('./models/recipe');

const app = express()

app.post('/add', async (req,res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        console.log(newRecipe);
        res.send('recipe was creadted successfully!');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.get("/", (req, res) => {
    Recipe.find().then(recipes => {
        res.send(recipes)
    }).catch(error => {
        console.log(error);
    })
})
app.get('/:id',  (req, res) => {
    const {id} = req.params;
    Recipe.findById(id).then(recipe => {
        res.send(recipe)
    }).catch(error => {
        console.log(error);
    })
  });

  app.put('/update_recipe/:id', async(req, res) => {
    try {
        const {title, catrgorie, rate ,image, ingredients} = req.body;
        const {id} = req.params;
        const recipe = await Recipe.findByIdAndUpdate(id, {title, catrgorie, rate, image, ingredients})
        if(!recipe) {
            return res.status(404).json({messgae: `cannot find any recipe with ID ${id}`})
        }
        const updateRecipe = await Recipe.findById(id);
        res.status(200).json(updateRecipe)
    } catch {
        res.status(500).json({message: error.message})
    }

  })

  app.delete('/delete_recipe/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
            return res.status(404).json({message: `cannot find any recipe with ID ${id}`})
        }
        const allRecipe = await Recipe.find();
        res.status(200).json(allRecipe);
    } catch {
        res.status(500).json({message: error.message})
    }
  })


module.exports = app;