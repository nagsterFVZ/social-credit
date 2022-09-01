import gql from 'graphql-tag';

export const GET_USER_BY_ID_QUERY = gql `
query Query($id: String) {
  getUserById(_id: $id) {
    _id
    name
    score
    socialId
  }
}
`;

export const REGISTER_USER_MUTATION = gql`
  mutation Mutation($input: RegisterInput!) {
    registerUser(input: $input) {
      error {
        message
        type
      }
      user {
        _id
        name
        score
        socialId
      }
    }
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation Mutation($input: EditUserInput!) {
    editUser(input: $input) {
      status
      error {
        message
        type
      }
    }
  }
`;
