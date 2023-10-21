const { type } = require("@hapi/joi/lib/extend");

class UserDto{
    id;
    name;
    email;
    image;
    type;

    constructor(data){
        this.id = data._id;
        this.name = user.name;
        this.email = user.email;
        this.image = user.image;
        this.type = user.type
    }

}

module.exports = UserDto;