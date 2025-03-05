// import { DataSource } from 'typeorm';
// import { ConfigService } from 'src/shared/configs/config.service';
// import { User } from 'src/entities/users/user.entity';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 3306,
//         username: 'postgres',
//         password: 'Admin',
//         database: 'ecommerce',
//         entities: [User],
//         synchronize: true,
//       });

//       try {
//         // Initialize the connection
//         await dataSource.initialize();
//         console.log('DataSource has been initialized!');
//       } catch (error) {
//         console.error('Error during DataSource initialization:', error);
//         throw error; // Ensures any initialization failure stops the app
//       }

//       return dataSource;
//     },
//     // inject: [ConfigService],
//   },
// ];
