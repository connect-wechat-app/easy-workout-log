import ewoloUtil from '../../common/ewoloUtil';

export const initialState = {
  name: '',
  email: '',
  emailFormHint: '',
  password: '',
  passwordFormHint: '',
  afterSuccess: {
    action: undefined,
    redirect: '/dashboard' // by default redirect to the dashboard after signup
  }
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP-SET-DATA':
      {
        const {name, email, password} = action;

        return {
          ...state,
          name: name,
          email: email,
          password: password,
          emailFormHint: ewoloUtil.validateEmail(email),
          passwordFormHint: ewoloUtil.validatePassword(password)
        };
      }
    case 'SIGNUP-SET-AFTER-SUCCESS':
      {
        const redirect = action.redirect;
        const actionAfterSuccess = action.action;

        return {
          ...state,
          afterSuccess: {
            action: actionAfterSuccess,
            redirect: redirect
          }
        };
      }
    default:
      return state;
  }
};

export default signupReducer;