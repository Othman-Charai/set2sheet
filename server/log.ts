export default defineEventHandler(async(event) => {
    console.log('New request: ' + getRequestURL(event))
    const { body } = await readBody(event);
    console.log('body'+body)
  })