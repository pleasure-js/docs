export default {
  discriminator: 'user',
  model: {
    schema: {
      name: String,
      email: {
        type: String,
        unique: true,
        index: true
      },
      password: {
        type: String
      }
    }
  }
}
