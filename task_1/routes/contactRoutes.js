// routes/contactRoutes.js
const {
  createContact,
  deleteContact,
  getContact,
  updateContact,
} = require('../controllers/contact_controller');

const express = require('express');
const router = express.Router();
const axios = require('axios');
const mysql = require('mysql');


// Endpoint to create a contact
router.post('/createContact', createContact);

// Endpoint to get a contact
router.get('/getContact', getContact);

// Endpoint to update a contact
router.post('/updateContact', updateContact);

// Endpoint to delete a contact
router.post('/deleteContact', deleteContact);

module.exports = router;
