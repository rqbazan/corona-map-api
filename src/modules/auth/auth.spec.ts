import supertest from 'supertest'
import server from '~/server'

describe('auth module', () => {
  it('should allow access to public routes', async () => {
    const res = await supertest(server).get('/public/places')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(4)
  })

  it('should deny access to private routes when no credentials', async () => {
    const res = await supertest(server).get('/private/places/populateGeoInfo')

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('You must send the basic auth credentials')
  })

  it('should deny access to private routes with wrong credentials', async () => {
    const res = await supertest(server)
      .get('/private/places/populateGeoInfo')
      .set('authorization', 'Basic dXNlcjpwYXNz')

    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Credentials are not valid')
  })
})
