function config() {
  var environmentSettings = {
    db: {
      path: 'database',
      options: {
        encoding: 'json',
        createIfMissing: true
      }
    }
  };
  return environmentSettings;
}

module.exports = config();
