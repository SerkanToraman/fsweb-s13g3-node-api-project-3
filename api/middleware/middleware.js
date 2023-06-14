const usersModel = require('../users/users-model');

// SİHRİNİZİ GÖRELİM
function logger(req, res, next) {
  const requestMethod=req.method;
  const requstUrl=req.
  originalUrl;
  const timeStamp = new Date().toLocaleString();
  console.log(`${requestMethod}, ${requstUrl}, ${timeStamp}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const {id} = req.params;
    const existingUser = await usersModel.getById(id);
     if(!existingUser){ 
      res.status(404).json({message: "not found"})
    } else {
      req.currentUser = existingUser;
      next()
    }
  } catch (error) {
    next("not found");
  }   
}

// SİHRİNİZİ GÖRELİM
  function validateUser(req, res, next) {
  try {
    const {name} = req.body;
     if(!name){ 
      res.status(400).json({message: "gerekli name alanı eksik"})
    } else {
      req.currentUserName = name;
      next()
    }
  } catch (error) {
    next("not found");
  }  
}

// SİHRİNİZİ GÖRELİM
function validatePost(req, res, next) {
  try {
    const {text} = req.body;
     if(!text){ 
      res.status(400).json({message: "gerekli text alanı eksik"})
    } else {
      req.currentText =  text;
      next()
    }
  } catch (error) {
    next(error);
  }  

}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = { 
  validateUserId,
  validateUser,
  validatePost,
  logger
}
