module.exports = {
  apps: [{
    name: 'favbytes',
    script: './server/index.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
    }
  }]
};