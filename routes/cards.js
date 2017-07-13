// CARDS ROUTER
const express = require('express');
const router = express.Router();
const  { data } = require('../data/flashcardData.json');
const { cards } = data;

const generateRandoNum = (upperLimit) => {
  return Math.floor( Math.random() * upperLimit);
}

router.get('/', (req,res) => {
  const id = generateRandoNum(cards.length);
  res.redirect(`cards/${id}`);
  // res.send(`${id}`);
})

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  
  if(side && side === 'question' || side === 'answer'){
    const text = cards[id][side];
    const { hint } = cards[id];
    const name = req.cookies.username;
    const templateData = { text, link: 'question', id, name, type: side };
    
    if( side === 'question' ) {
      templateData.hint = hint;
      templateData.link = 'answer';
    }

    res.render('card', templateData);
  } else {
    res.redirect(`/cards/${id}/?side=question`);
  }
//   if(id > (cards.length - 1)) {
//     res.redirect('/cards');
//   }
});

module.exports = router;