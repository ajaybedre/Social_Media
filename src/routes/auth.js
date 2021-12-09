const express =require('express');
const { create, login, isAuthenticated, updatePassword, forgotPassword, resetPassword, updateNewPassword } = require('../auth');

const router =express.Router();



// router.post('/signup',);
router.post('/create',create);
router.get('/login',login);
router.post('/update-password',isAuthenticated,updatePassword);
router.post('/forgot-password',forgotPassword);
router.get('/:id/:token',resetPassword);
router.post('/:id/:token',updateNewPassword);

module.exports =router;