// Creation of a new class to send the response in a structured way. It would send statuscode, data and the message which is initialised with success otherwise set.
class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "Success"
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 // Another key is added .success which is set true if the statuscode is less than 400 otherwise set to false.
    }
}

export {ApiResponse}