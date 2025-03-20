import type {GraphQLResolveInfo} from "graphql/type";

export type Resolver<TResult, TParent = any, TContext = any, TArgs =any> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult|Promise<TResult|null>|null;