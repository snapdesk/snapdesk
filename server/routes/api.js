const express = require('express');

const apiRouter = express.Router();

// require in middleware here
const jwtsController = require('../controllers/jwtsController');
const userController = require('../controllers/userController');
const ticketsController = require('../controllers/ticketsController');

// ADD API ROUTES HERE
apiRouter.get(
  '/user',
  jwtsController.isLoggedIn,
  userController.getData,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.patch(
  '/tickets',
  jwtsController.isLoggedIn,
  ticketsController.updateTicketStatus,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.get(
  '/tickets',
  jwtsController.isLoggedIn,
  ticketsController.getActiveTickets,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post(
  '/tickets',
  jwtsController.isLoggedIn,
  ticketsController.addTicket,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post(
  '/organizations',
  jwtsController.isLoggedIn,
  ticketsController.getOrganizationTickets,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post(
  '/organization/users',
  jwtsController.isLoggedIn,
  ticketsController.getUsersInOrganization,
  (req, res) => res.status(200).json(res.locals)
);

// endpoint to retrieve all of an organizations resolved tickets, may not be used due to sorting being configured in the front end
apiRouter.get(
  '/organizations/resolved',
  jwtsController.isLoggedIn,
  ticketsController.getOrgMentorResTicket,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = apiRouter;
