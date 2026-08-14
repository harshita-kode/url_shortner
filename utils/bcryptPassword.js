import bcrypt from 'bcrypt';

const saltRounds = 10;

const bcryptPassword = (password)=>{
     return bcrypt.hash(password, saltRounds);
}

const comparePassword = (password, hash)=>{
    return bcrypt.compare(password, hash);
}

export {bcryptPassword, comparePassword};
