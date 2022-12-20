const {
  addWisataHandler,
  getAllDataHandler,
  getDetailWisataHandler,
  updateWisataHandler,
  deleteWisataHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/wisata',
    handler: addWisataHandler,
  },
  {
    method: 'GET',
    path: '/wisata',
    handler: getAllDataHandler,
  },
  {
    method: 'GET',
    path: '/wisata/{id}',
    handler: getDetailWisataHandler,
  },
  {
    method: 'PUT',
    path: '/wisata/{id}',
    handler: updateWisataHandler,
  },
  {
    method: 'DELETE',
    path: '/wisata/{id}',
    handler: deleteWisataHandler,
  },
];

module.exports = routes;
