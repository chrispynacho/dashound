function config() {
  var environmentSettings = {
    app: {
      port: 3000
    },
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
