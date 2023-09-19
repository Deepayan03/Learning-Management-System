const EmailValidator = (value) => {
  return value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
};
const PasswordValidator = (value) => {
  return value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/);
};

export { EmailValidator, PasswordValidator };
