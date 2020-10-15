module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case 'Login_Failed':
      code = 401;
      message = 'Username & Password combination not found!';
      break;
    case 'Email_Already_Exist':
      code = 400;
      message = 'Email already exists!';
      break;
    case 'Mongoose_Error':
      code = 500;
      message = 'Something wrong with database!';
      break;
    case 'User_Not_Found':
      code = 404;
      message = 'User not found!';
      break;
    case 'Invalid_Token':
      code = 401;
      message = 'Invalid Acces Token';
      break;
    case 'Missing_Token':
      code = 401;
      message = 'Missing Access Token';
      break;
    case 'Not_Found':
      code = 404;
      message = 'Resource not found!';
      break;
    case 'Forbidden':
      code = 403;
      message = 'Forbidden!';
      break;
    case 'Not_Enough':
      code = 403;
      message = 'Resources not enough!';
      break;
    default:
      code = 500;
      message = 'Internal Server Error!';
  }

  res.status(code).json({ success: false, message });
};
