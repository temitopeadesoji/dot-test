import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: []
    }
  }
});
const cache = new InMemoryCache({ fragmentMatcher });
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";

export default context => {
  return {
    cache,
    defaultHttpLink: false,
    link: createHttpLink({
      uri: `${context.env.BASE_URL}graphql`,
      fetch: (uri, options) => {
        options.headers["Authorization"] = `Bearer ${context.env.GITHUB_TOKEN}`;
        return fetch(uri, options);
      }
    })
  };
};
