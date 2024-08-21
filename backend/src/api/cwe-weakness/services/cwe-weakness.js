'use strict';

/**
 * cwe-weakness service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cwe-weakness.cwe-weakness');
