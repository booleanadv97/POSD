module.exports = {
    async afterCreate(event) {
      const { result } = event;

      const message = `A new GDPR article titled "${result.title}" has been published.`;
  
      try {
        const users = await strapi.query('plugin::users-permissions.user').findMany();
  
        for (const user of users) {
          await strapi.entityService.create('api::notification.notification', {
            data: {
              message,
              users_permissions_user: user.id,
              read: false,
            },
          });
        }
      } catch (error) {
        console.error('Error while creating new GDPR article notifications:', error);
      }
    },
  };
  