import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
  fragment repositoryFields on Repository {
    id
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    language
  }
`;

export const USER_FIELDS = gql`
  fragment userFields on User {
    id
    username
  }
`;

export const REVIEW_FIELDS = gql`
  fragment reviewFields on Review {
    id
    text
    rating
    createdAt
    user {
      id
      username
    }
    repositoryId
  }
`;
