import { fetchContentAPI } from '..';

export const getHomePage = async () => {
  const data = await fetchContentAPI(
    `query MyQuery {
  metaobjects(type: "homepage", first: 100) {
    nodes {
      fields {
        value
        reference {
          ... on Video {
            sources {
              url
            }
          }
        }
      }
    }
  }
}`
  );
  return data;
};
