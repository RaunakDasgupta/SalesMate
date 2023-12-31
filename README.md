﻿# FreshSales CRM ContactManager

This assignment uses FreshSales CRM API to create a Contact in FreshSales CRM, Retrieve Contact, Update Contact, Delete Contact.
It also gives you the option of managing contacts on a mySQl server, just as you would in the CRM.

## Table of Contents

- [Run Locally](#Run-Locally)
- [APIs](#apis)
- [Contributing](#contributing)
- [Contact](#contact)

## Tech Stack

- **Server:** NodeJs, Express
- **Database:** MySQL
- **Deployment:** Docker Compose

## Run Locally

Clone the project

```bash
  git clone https://github.com/RaunakDasgupta/SalesMate
```

Go to the project directory

```bash
  cd InteractlyAssignment
```

Start backend on docker

```bash
docker-compose -d --build
```

## API Reference

- **Create Contact:** `POST http://localhost:3000/contact/createContact`.

  Creates a contact in either the CRM or the local database.

  - | field :          |          |
    | :--------------- | :------- |
    | `first_name:`    | Required |
    | `last_name:`     | Required |
    | `email:`         | Required |
    | `mobile_number:` | Required |
    | `data_store:`    | Required |

- **Get Contact:** `GET http://localhost:3000/contact/getContact?contact_id=<required ID>&data_store=<CRM/DATABASE>`

  Returns the requested data of the contact.

- | parameter:    |          |
  | :------------ | :------- |
  | `contact_id:` | Required |
  | `data_store:` | Required |

- **Update Contact:** `POST http://localhost:3000/contact/updateContact`

  Makes requested changes to the contact information on either CRM or Database.

- | field         |          |
  | :------------ | :------- |
  | `contact_id:` | Required |
  | `data_store:` | Required |

- **Delete Contact** `POST http://localhost:3000/contact/deleteContact`

  Delete contact using contact_id on either CRM or Database.

- | field         |          |
  | :------------ | :------- |
  | `contact_id:` | Required |
  | `data_store:` | Required |

## Authors

- [@RaunakDasgupta](https://www.github.com/RaunakDasgupta)
