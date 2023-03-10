// backend/routes/api/index.js
const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

//Test route
// router.post('/test', function (req, res) {
//   res.json({ requestBody: req.body });
// });

// //Test route authentication
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition',
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

// //Test restore user route
// router.get('/restore-user', (req, res) => {
//   return res.json(req.user);
// });

// //Test requireAuth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth, (req, res) => {
//   return res.json(req.user);
// });

module.exports = router;
