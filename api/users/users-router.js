const express = require('express');
const router = express.Router();
// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const usersModel = require('./users-model');
const postsModel =require('../posts/posts-model');
const {validateUserId,validateUser,validatePost} = require("../middleware/middleware")




// TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
router.get('/', async (req, res) => {
    try {
    const allUsers = await usersModel.get();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({message: "Gönderiler alınamadı"})
}
});

// USER NESNESİNİ DÖNDÜRÜN
// user id yi getirmek için bir ara yazılım gereklidir
  router.get('/:id',validateUserId, (req, res,next) => {
    try {
      res.json(req.currentUser)
      
    } catch (error) {
      next(error)
    }
  });
// YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
// istek gövdesini doğrulamak için ara yazılım gereklidir.
router.post('/',validateUser, async (req, res, next) => {
  try {
    const name = req.currentUserName;
    const allUsers = await usersModel.get();
      if ((allUsers.filter((list)=> list.name == name)).length>0?true:false){
      res.status(400).json({ message: "Lütfen listede bulunan ismin tekrar göndermeyin"})
    } else {
      const insertedUserId = await usersModel.insert({name});
      const insertedUser = await usersModel.getById(insertedUserId.id)
      res.status(201).json(insertedUser)
    }
  } catch (error) {
    next(error);
}
});

// YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
// user id yi doğrulayan ara yazılım gereklidir
// ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
router.put('/:id',validateUserId,validateUser, async (req, res,next) => {
  try {
      const name  = req.currentUserName;
      const {id} = req.params
      const updatedUser = await usersModel.update(id,{name});
      res.json(updatedUser)
  }
  catch (error) {
    next(error);
  }
});

// SON SİLİNEN USER NESNESİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
router.delete('/:id',validateUserId, async (req, res,next) => {
  try {
    const {id} = req.params
    const name =req.currentUser;
    const deletedUser = await usersModel.remove(id);
    res.json(name) 

  } catch (error) {
    next(error);
  }
});

// USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
router.get('/:id/posts',validateUserId, async (req, res,next) => {
  try {
  const {id} = req.params;
  const post = await usersModel.getUserPosts(id);
  res.json(post)
  } 
  catch (error) {
    next(error);
  }
});


// YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
// user id yi doğrulayan bir ara yazılım gereklidir.
// ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
router.post('/:id/posts',validateUserId,validatePost, async (req, res,next) => {
  try {
  const text = req.currentText;
   const {id} = req.params
   const insertedText = await postsModel.insert({user_id:id,text:text});
   res.status(210).json(insertedText);
  } 
  catch (error) {
    next(error);
  }

});



// routerı dışa aktarmayı unutmayın
module.exports = router;