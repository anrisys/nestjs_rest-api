import { QueryInterface } from 'sequelize';

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('Posts', [
      {
        content: 'This is my new post',
        authorId: 1,
      },
    ]);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Posts', { authorId: 1 });
  },
};
