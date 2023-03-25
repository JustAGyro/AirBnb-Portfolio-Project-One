// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spot.js');
const reviewRouter = require('./review.js');
const bookingRouter = require('./booking.js');
const spotImageRouter = require('./spotImage.js');
const reviewImageRouter = require('./reviewImage.js');
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.use('/spot-images', spotImageRouter);

router.use('/review-images', reviewImageRouter);

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
