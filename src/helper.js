import merge from 'deepmerge';

// Helper function to combine multiple resolver definition hashes into a single hash for consumption by Apollostack's graphql-server
export const combineResolvers = (resolvers = []) => resolvers
  .reduce((combined, resolver) => merge(combined, resolver));

// Helper function to compose resolvers
export const composeResolvers = (resolvers = [], ...baseResolvers) =>
  resolvers.map(resolver => {
    if (baseResolvers.length > 1) {
      // Reverse the array so that they execute from left to right when called
      baseResolvers.reverse();
      // Compose each resolver with the one before it
      return baseResolvers.reduce((composed = resolver, baseResolver) =>
        baseResolver.createResolver(composed),
      );
    }
    // If there's only one base resolver, createResolver from it and return
    return baseResolvers[0].createResolver(resolver);
  });
