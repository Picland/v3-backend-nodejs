import { User } from './mysql'

const register = user => {
  return User.create({
    phone_number: user.phoneNumber,
    password: user.password,
    name: user.name,
    gender: user.gender,
    avatar: user.avatar,
    bio: user.bio,
    email: user.email
  })
}

export default {
  register
}
