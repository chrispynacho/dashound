function config() {
  var environmentSettings = {
    app: {
      port: 3000
    },
    db: {
      host: 'mongodb://127.0.0.1/',
      name: 'dashound',
      options: {
        encoding: 'json',
        createIfMissing: true
      }
    }
  };
  return environmentSettings;
}

module.exports = config();
