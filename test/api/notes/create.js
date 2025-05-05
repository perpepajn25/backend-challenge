const { create } = require('app/api/notes/controller')

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
    describe('create', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should create note for logged in user with valid params', async () => {
        body = { title: 'Note 1', message: 'Content of note 1' }

        const createdNote = await agent
          .client()
          .post(`/note`)
          .send(body)
          .set('authorization', globalAuth.token)
          .expect(201)
          .promise()

        should.exist(createdNote)

        // check common properties
        should.exist(createdNote.id)
        should.exist(createdNote.createdAt)
        should.exist(createdNote.modifiedAt)
        createdNote.deleted.should.be.false()

        // check properties
        createdNote.title.should.equal(body.title)
        createdNote.message.should.equal(body.message)
        createdNote.user.should.equal(globalAuth.user)
      })

      // check field validations
      for (const field of ['title', 'message']) {
        it(`should fail to create note when '${field}' is empty`, () => {
          const body = {
            title: 'Valid title',
            message: 'Valid message'
          }

          body[field] = ''

          return agent.client().post(`/note`).send(body).set('authorization', globalAuth.token).expect(422).promise()
        })
      }

      it('should fail with invalid auth', () => {
        return agent.client().post(`/note`).expect(401).promise()
      })
    })
  })
})
