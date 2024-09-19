export const validateSchema = (schema) => (request,response,next) => {
    try{
        schema.parse(request.body);
        next();
    }catch(error){
        console.log(error);
        return response.status(400).json(error.errors.map(error => error.message));
    }
}