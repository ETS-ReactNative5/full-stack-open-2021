import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor: "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      const items = getAllByTestId("repositoryItem");
      const counters = getAllByTestId("counterItem");

      expect(items).toHaveLength(2);
      expect(counters).toHaveLength(8);

      expect(items[0]).toHaveTextContent("jaredpalmer/formik");
      expect(items[0]).toHaveTextContent("Build forms in React, without the tears");
      expect(items[0]).toHaveTextContent("TypeScript");
      expect(counters[0]).toHaveTextContent("21,9k");
      expect(counters[1]).toHaveTextContent("1,6k");
      expect(counters[2]).toHaveTextContent("3");
      expect(counters[3]).toHaveTextContent("88");

      expect(items[1]).toHaveTextContent("async-library/react-async");
      expect(items[1]).toHaveTextContent("Flexible promise-based React data loader");
      expect(items[1]).toHaveTextContent("JavaScript");
      expect(counters[4]).toHaveTextContent("1,8k");
      expect(counters[5]).toHaveTextContent("69");
      expect(counters[6]).toHaveTextContent("3");
      expect(counters[7]).toHaveTextContent("72");
    });
  });
});