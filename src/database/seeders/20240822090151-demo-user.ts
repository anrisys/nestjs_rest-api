import { QueryInterface } from 'sequelize';
import * as bcrypt from 'bcrypt';

export default {
  up: async (queryInterface: QueryInterface) => {
    const hashedPassword = await bcrypt.hash(
      'passexample123',
      Number(process.env.SECRET_SALT_KEY),
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Demo User',
          email: 'demo@example.com',
          password: hashedPassword,
        },
      ],
      {},
    );
  },

  down: async (queryInteface: QueryInterface) => {
    await queryInteface.bulkDelete('Users', { email: 'demo@example.com' });
  },
};
