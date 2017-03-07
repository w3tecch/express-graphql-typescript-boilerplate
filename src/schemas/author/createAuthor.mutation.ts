// // import {
// //     GraphQLID,
// //     GraphQLString,
// //     GraphQLNonNull,
// //     GraphQLFieldConfig
// // } from 'graphql';
// // import { models } from 'models';

// // import { Logger } from '../../core/logger';
// // const log = Logger('app:schemas:author:mutation');

// // import { AuthorType } from './author.type';
// // import { createAuthor } from '../../repositories/author/author.create';


// // export const createAuthorMutation = (): GraphQLFieldConfig => ({
// //     type: AuthorType,
// //     args: {
// //         firstName: { type: new GraphQLNonNull(GraphQLString) },
// //         lastName: { type: new GraphQLNonNull(GraphQLString) }
// //     },
// //     resolve: (root, args: models.author.Attributes) => {
// //         log.debug('resolve createAuthor()', args);
// //         return createAuthor(args);
// //     }
// // });

// import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';

// import { Context } from '../../context';
// import { AuthorType } from './author.type';
// import { AbstractMutation, IGraphQLMutation } from '../abstract.mutation';
// import { AuthorModel } from '../../models/author.model';

// import { Logger } from '../../core/logger';
// const log = Logger('app:schemas:author:CreateAuthorMutation');


// export interface ICreateAuthorMutationArguments {
//     firstName: string;
//     lastName: string;
// }

// export class CreateAuthorMutation extends AbstractMutation implements GraphQLFieldConfig, IGraphQLMutation {

//     public type = AuthorType;

//     public allow = ['admin'];

//     public args = {
//         firstName: { type: new GraphQLNonNull(GraphQLString) },
//         lastName: { type: new GraphQLNonNull(GraphQLString) }
//     };

//     public before(context: Context, args: ICreateAuthorMutationArguments) {
//         log.debug('hook before args', args);
//         const author = new AuthorModel()
//             .setFirstName(args.firstName)
//             .setLastName(args.lastName);

//         if (author.validate()) {
//             return Promise.resolve(args);
//         } else {

//         }


//     }

//     public after(result: any, context: Context, args: any, source?: any) {
//         log.debug('hook after args', args);
//         log.debug('hook after source', source);
//         return Promise.resolve(result);
//     }

//     public execute(root, args: common.PageinationArguments, context: Context) {
//         log.debug('resolve findAllAuthors()');
//         return context.repos.author.findAllAuthors({
//             limit: args.limit,
//             offset: args.offset
//         });
//     }
// }
