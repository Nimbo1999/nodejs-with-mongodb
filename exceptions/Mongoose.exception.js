exports.mongooseError = err => {
    const { errors } = err;

    for(key in errors) {
        const { message, type, path } = errors[key].properties;
        return { message, type, path };
        
    }
}
