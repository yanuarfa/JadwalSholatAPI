const { nanoid } = require('nanoid');
const wisata = require('./wisata');

const addWisataHandler = (request, h) => {
  const { title, subtitle, description, url } = request.payload;

  const id = nanoid(16);

  if (
    !title ||
    title === ' ' ||
    !subtitle ||
    title === ' ' ||
    !description ||
    description === ' ' ||
    !url ||
    url === ' '
  ) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan data. Mohon semua field diisi',
    });
    response.code(400);
    return response;
  }

  const newWisata = {
    id,
    title,
    subtitle,
    description,
    url,
  };

  wisata.push(newWisata);

  const isSuccess = wisata.filter((w) => w.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Data berhasil ditambahkan',
      data: {
        id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Data gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllDataHandler = (request, h) => {
  const { title, subtitle, description, url } = request.query;

  const response = h.response({
    status: 'success',
    data: {
      wisata: wisata.map((w) => ({
        id: w.id,
        title: w.title,
        url: w.url,
      })),
    },
  });
  response.code(200);
  return response;
};

const getDetailWisataHandler = (request, h) => {
  const { id } = request.params;

  const w = wisata.filter((wis) => wis.id === id)[0];

  if (w !== undefined) {
    return {
      status: 'success',
      data: w,
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Data tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateWisataHandler = (request, h) => {
  const { id } = request.params;

  const { title, subtitle, description, url } = request.payload;

  const index = wisata.findIndex((w) => w.id === id);

  if (
    !title ||
    title === ' ' ||
    !subtitle ||
    title === ' ' ||
    !description ||
    description === ' ' ||
    !url ||
    url === ' '
  ) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui data. Mohon semua field diisi',
    });
    response.code(400);
    return response;
  }

  if (index !== -1) {
    wisata[index] = {
      ...wisata[index],
      title,
      subtitle,
      description,
      url,
    };

    const response = h.response({
      status: 'success',
      message: 'Data berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui data. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteWisataHandler = (request, h) => {
  const { id } = request.params;

  const index = wisata.findIndex((w) => w.id === id);

  if (index !== -1) {
    wisata.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Data berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Data gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addWisataHandler,
  getAllDataHandler,
  getDetailWisataHandler,
  updateWisataHandler,
  deleteWisataHandler,
};
