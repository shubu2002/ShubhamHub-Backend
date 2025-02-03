


const validate = (Schema) => async (req, res, next) => {
    try {
        const parseBody = await Schema.parseAsync(req.body);

        req.body = parseBody;
        next();
    } catch (err) {
        // res.status(400)
        //     .json({
        //         msg: err.errors[0].message
        //     })
        const status = 422;
        const message = err.errors[0].message;

        const error = {
            status,
            message
        }

        console.log(error);

        next(error);
        
    }
}

module.exports =  validate;