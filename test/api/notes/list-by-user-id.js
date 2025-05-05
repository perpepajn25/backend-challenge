let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('list-by-user-id', () => {
      let userAuth1
      let userAuth2

      before(async () => {
        userAuth1 = await mockData.mockAuthAndUser()
        userAuth2 = await mockData.mockAuthAndUser()
      })

      it('should list notes for user', async () => {
        // create notes for global user
        await mockData.mockNote({ user: userAuth1.user })
        await mockData.mockNote({ user: userAuth1.user })
        
        // create note for other user
        await mockData.mockNote({ user: userAuth2.user })

        const notes = await agent
          .client()
          .get(`/user/${userAuth1.user}/notes`)
          .set('authorization', userAuth1.token)
          .expect(200)
          .promise()
          
          notes.length.should.equal(2)

          // check notes belong to correct user 
          for (const note of notes) {
            note.user.should.equal(userAuth1.user)
           }
        })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${userAuth1.user}/notes`).expect(401).promise()
      })

      it('should fail if given user id does not match current user', async () => {
        await agent.client().get(`/user/${userAuth2.user}/notes`).set('authorization', userAuth1.token).expect(403).promise()
      })
    })
  })
})
