import { LoginResponse } from '../../interfaces/appInterfaces';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string | null;
  errorMessage: string;
  user: LoginResponse | null;
}

type AuthAction =
  | { type: 'login'; payload: { token: string; user: LoginResponse } }
  | { type: 'addError'; payload: string }
  | { type: 'removeError' }
  | { type: 'notAuthenticated' }
  | { type: 'updatePicture'; payload: { avatar: string } }
  | {
      type: 'updateUser';
      payload: { user: { firstname: string; lastname: string; email: string } };
    }
  | { type: 'logout' };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        token: null,
        user: null,
        status: 'not-authenticated',
        errorMessage: action.payload
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: ''
      };

    case 'login':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user
      };

    case 'logout':
      return {
        status: 'not-authenticated',
        token: null,
        errorMessage: '',
        user: null
      };

    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null
      };

    case 'updatePicture':
      return {
        ...state,
        user: { ...state.user!, avatar: action.payload.avatar }
      };

    case 'updateUser':
      return {
        ...state,
        user: {
          ...state.user!,
          firstname: action.payload.user.firstname ?? state.user?.firstname,
          lastname: action.payload.user.lastname ?? state.user?.lastname,
          email: action.payload.user.email ?? state.user?.email
        }
      };

    default:
      return state;
  }
};
