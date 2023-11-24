// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'Interactly',
});

const FRESHSALES_API_DOMAIN =
  'https://interactly-647782674673369507.myfreshworks.com/crm/sales/api/contacts/';
const FRESHSALES_API_KEY = 'WmPgY0L8Sk1I6ezsBetd2A';

// Endpoint to create a contact
router.post('/createContact', async (req, res) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  try {
    if (data_store === 'CRM') {
      const freshSalesResponse = await axios.post(
        `${FRESHSALES_API_DOMAIN}`,
        {
          contact: {
            first_name,
            last_name,
            mobile_number,
            email,
          },
        },
        {
          headers: {
            Authorization: `Token token=${FRESHSALES_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const freshSalesContact = freshSalesResponse.data;

      res.json({ success: true, freshSalesContact });
    } else if (data_store === 'DATABASE') {
      const insertQuery =
        'INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?, ?, ?, ?)';
      const values = [first_name, last_name, email, mobile_number];

      db.query(insertQuery, values, (err, result) => {
        if (err) throw err;

        const mysqlContactId = result.insertId;

        res.json({ success: true, contact_id: mysqlContactId });
      });
    } else {
      res.status(400).json({ error: 'Invalid data_store parameter' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Implement the other endpoints similarly
// Endpoint to get a contact
router.get('/getContact', (req, res) => {
  const { contact_id, data_store } = req.query;

  if (data_store === 'CRM') {
    // Implement logic to get contact from FreshSales CRM using contact_id
    // Example: Make an HTTP request to FreshSales API
    axios
      .get(`${FRESHSALES_API_DOMAIN}${contact_id}`, {
        headers: {
          Authorization: `Token token=${FRESHSALES_API_KEY}`,
        },
      })
      .then((response) => {
        // Process FreshSales API response if needed
        const contactData = response.data;
        res.json({ success: true, contact: contactData });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else if (data_store === 'DATABASE') {
    // Implement logic to get contact from MySQL database using contact_id
    const selectQuery = 'SELECT * FROM contacts WHERE id = ?';
    const values = [contact_id];

    db.query(selectQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (result.length === 0) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        const contactData = result[0];
        res.json({ success: true, contact: contactData });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid data_store parameter' });
  }
});

// Endpoint to update a contact
router.post('/updateContact', (req, res) => {
  const {
    contact_id,
    new_first_name,
    new_last_name,
    new_email,
    new_mobile_number,
    data_store,
  } = req.body;
  console.log(`${FRESHSALES_API_DOMAIN}${contact_id}`);

  if (data_store === 'CRM') {
    // Implement logic to update contact in FreshSales CRM using contact_id
    axios
      .patch(
        `${FRESHSALES_API_DOMAIN}${contact_id}`,
        {
          contact: {
            id: contact_id,
            first_name: new_first_name,
            last_name: new_last_name,
            email: new_email,
            mobile_number: new_mobile_number,
          },
        },
        {
          headers: {
            Authorization: `Token token=${FRESHSALES_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // Process FreshSales API response if needed
        res.json({
          message: 'Contact updated successfully',
          data: response.data,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else if (data_store === 'DATABASE') {
    // Implement logic to update contact in MySQL database using contact_id
    const updateQuery =
      'UPDATE contacts SET email = ?, new_first_name= ?, new_last_name= ?, mobile_number = ? WHERE id = ?';
    const values = [
      new_first_name,
      new_last_name,
      new_email,
      new_mobile_number,
      contact_id,
    ];

    db.query(updateQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.json({ success: true, message: 'Contact updated successfully' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid data_store parameter' });
  }
});

// Endpoint to delete a contact
router.post('/deleteContact', (req, res) => {
  const { contact_id, data_store } = req.body;

  if (data_store === 'CRM') {
    // Implement logic to delete contact in FreshSales CRM using contact_id
    // Example: Make an HTTP request to FreshSales API
    axios
      .delete(`${FRESHSALES_API_DOMAIN}/${contact_id}`, {
        headers: {
          Authorization: `Token token=${FRESHSALES_API_KEY}`,
        },
      })
      .then((response) => {
        // Process FreshSales API response if needed
        res.json({ success: true, message: 'Contact deleted successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else if (data_store === 'DATABASE') {
    // Implement logic to delete contact in MySQL database using contact_id
    const deleteQuery = 'DELETE FROM contacts WHERE id = ?';
    const values = [contact_id];

    db.query(deleteQuery, values, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Contact not found' });
      } else {
        res.json({ success: true, message: 'Contact deleted successfully' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid data_store parameter' });
  }
});

module.exports = router;
