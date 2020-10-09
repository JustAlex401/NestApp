export class CreateUserException extends Error{
    constructor(message){
        super(message);
        this.name= 'CreateUserException';
    }
}

export class NotFoundUserException extends Error{
    constructor(message){
        super(message);
        this.name= 'NotFoundUserException';
    }
}