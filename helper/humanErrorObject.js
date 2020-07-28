module.exports.buildHumanErrorsObject = errorsObj => {
  const errors = {};
  for (let i = 0; i < errorsObj.length; i++) {
    let e = errorsObj[i];
    errors[e.path] = e.message.replace(/["]/ig, '');
  }
  return errors;
}
