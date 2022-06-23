const getUser = user => {
    switch (user) {
      case 'kuekard':
        return require('../sites/kuekard/models/document/user');
      default:
        return null;
    }
  }

const getMediaUser = user => {
    switch (user) {
      case 'kuekard':
        return require('../sites/kuekard/models/document/media-user');
      default:
        return null;
    }
  }

  module.exports.getUser = getUser;
  module.exports.getMediaUser = getMediaUser;