export async function userPolicy(errors) {
    var resError=[];

    errors.forEach(error => {
        var constraints=[];
          Object.keys(error.constraints).forEach((key) => {
            constraints.push({"error":error.constraints[key]});
        })
        resError.push({[error.property]:constraints});
    });
    const error = {errors:resError}
    return error;
}