const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const db = require("./auth-model")



router.post('/register',  async (req, res, next) => {
  // implement registration
  try { 
    const { username, password } = req.body
    const user = await db.findBy({username}).first()

    if (user) { 
      return res.status(409).json({
        message: "Username has already been registered."
      })
    }


    // new user info and hashed with bcrypt, added dependency
    const newUser = await db.add({
      username,
      password: await bcrypt.hash(password, 14)
    })

    res.status(201).json(newUser)
  }
  catch (error) {
    next(error)
  }
});

router.post('/login', async (req, res, next) => 
{
  // implement login
  const { username, password} = req.body
  const user = await db.findBy({username}).first()

  if (!user) { 
    return res.status(401).json({message: "Invalid Credentials"})
  }

  const passwordValidate = await bcrypt.compare(password, user.password)

// Check password against the bcrypt hashed password
  if (!passwordValidate) { 
    return res.status(401).json({message: "Invalid Credentials"})
  }

  const token = jwt.sign({
    userID: user.id,
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.json({
    message: "Welcome to the Challenge.",
    token: token
  })
});

module.exports = router;
