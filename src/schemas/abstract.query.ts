import { GraphQLResolveInfo } from 'graphql';

import { RootValue } from '../root-value';
import { Context } from '../context';


export interface IGraphQLQuery {
    allow: string[];
    before<A, S>(context: Context<A>, args: A, source?: S): Promise<A>;
    after<R, A, S>(result: R, context: Context<A>, args: A, source?: S): Promise<R>;
    execute<R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R>;
}


export class AbstractQuery {

    /**
     * Here you can add your needed permisson
     * roles. This will be checked at the resolve
     * method.
     *
     * @type {string[]}
     * @memberOf AbstractQuery
     */
    public allow: string[] = [];

    /**
     * This is our before hook. Here you are able
     * to alter the args object before the actual resolver(execute)
     * will be called.
     *
     * @template A
     * @template S
     * @param {Context} context
     * @param {A} args
     * @param {S} [source]
     * @returns {Promise<A>}
     *
     * @memberOf AbstractQuery
     */
    public before<A, S>(context: Context<A>, args: A, source?: S): Promise<A> {
        return Promise.resolve(args);
    }

    /**
     * This our after hook. It will be called ater the actual resolver(execute).
     * There you are able to alter the result before it is send to the client.
     *
     * @template R
     * @template A
     * @template S
     * @param {R} result
     * @param {Context} context
     * @param {A} [args]
     * @param {S} [source]
     * @returns {Promise<R>}
     *
     * @memberOf AbstractQuery
     */
    public after<R, A, S>(result: R, context: Context<A>, args?: A, source?: S): Promise<R> {
        return Promise.resolve(result);
    }

    /**
     * This our resolver, which should gather the needed data;
     *
     * @template R
     * @param {any} root
     * @param {any} args
     * @param {Context} context
     * @returns {Promise<R>}
     *
     * @memberOf AbstractQuery
     */
    public execute<R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> {
        return undefined;
    }

    /**
     * This will be called by graphQL and they need to have it not as a
     * member fucntion of this class. We use this hook to add some more logic
     * to it, like permission checking and before and after hooks to alter some data.
     *
     *
     * @memberOf AbstractQuery
     */
    public resolve = async <R, A>(root: RootValue, args: A, context: Context<A>, info: GraphQLResolveInfo): Promise<R> => {
        //store the root query arguments
        context.setResolveArgument(args);

        //first check roles
        if (!context.hasUserRoles(this.allow)) {
            context.Response.send(401);
            return Promise.reject('401 Unauthorized');
        }

        //go throw before
        args = await this.before(context, args);

        //run execute
        let result = await this.execute<R, A>(root, args, context, info);

        //call after
        await this.after(result, context, args);

        //return the resolved result
        return result;
    }

}
