'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::feedback.feedback', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { users_permissions_user, pattern_example } = ctx.request.body.data;

      const existingFeedback = await strapi.entityService.findMany('api::feedback.feedback', {
        filters: {
          users_permissions_user: users_permissions_user,
          pattern_example: pattern_example,
        },
      });

      if (existingFeedback.length > 0) {
        return ctx.badRequest('You have already submitted feedback for this article.');
      }

      // Proceed with creation if no duplicate exists
      const response = await super.create(ctx);
      return response;
    } catch (error) {
      console.error('Error in feedback creation:', error);
      return ctx.internalServerError('An error occurred while submitting your feedback.');
    }
  },
}));