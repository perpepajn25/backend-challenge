let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('update-by-id', () => {
      let userAuth1
      let userAuth2

      before(async () => {
        userAuth1 = await mockData.mockAuthAndUser({
          firstName: 'Steve',
          lastName: 'Rogers',
          email: `${mockData.uuid()}@test.com`
        })
        userAuth2 = await mockData.mockAuthAndUser()
      })

      it('should update user', async () => {
        const body = { firstName: 'Captain', lastName: 'America', email: `${mockData.uuid()}@test.com` }

        const updatedUser = await agent
          .client()
          .put(`/user/${userAuth1.user}`)
          .send(body)
          .set('authorization', userAuth1.token)
          .expect(200)
          .promise()

        should.exist(updatedUser)
        updatedUser.id.should.equal(userAuth1.user)

        // ensure fields are updated
        updatedUser.firstName.should.equal(body.firstName)
        updatedUser.lastName.should.equal(body.lastName)
        updatedUser.email.should.equal(body.email)
      })

      it('should fail if invalid auth', () => {
        return agent.client().put(`/user/${userAuth1.user}`).expect(401).promise()
      })

      it('should fail if given user id does not match current user', async () => {
        await agent.client().put(`/user/${userAuth2.user}`).set('authorization', userAuth1.token).expect(403).promise()
      })
    })
  })
})
