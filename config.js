function config() {
  var environmentSettings = {
    db: {
      path: '/home/nacho/dash_data',
      options: {
        encoding: 'json',
        createIfMissing: true
      }
    }
  };
  return environmentSettings;
}

module.exports = config();
