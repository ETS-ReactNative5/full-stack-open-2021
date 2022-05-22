import { gql } from '@apollo/client';

import { REPOSITORY_FIELDS, USER_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $first: Int,
    $after: String,
  ) {
    repositories(
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after,
    ) {
      totalCount
      edges {
        node {
          ...repositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }

  ${REPOSITORY_FIELDS}
`;

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      ...userFields
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }

  ${USER_FIELDS}
  ${REVIEW_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...repositoryFields
      reviews(first: $first, after: $after) {
        edges {
          node {
            ...reviewFields
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
  ${REVIEW_FIELDS}
`;