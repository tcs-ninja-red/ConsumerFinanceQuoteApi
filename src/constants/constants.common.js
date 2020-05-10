/**
 * Common constants across all the environments (dev, staging, prod)
 */
process.env.NODE_ENV = "dev";
//process.env.PORT = "44301";
module.exports = {
	env: process.env.NODE_ENV,
	port: process.env.PORT ||44301,
};