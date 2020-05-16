import { PostRepository } from './PostRepository'
import { expect } from 'chai'

describe('PostRepository', () => {
    const repository = new PostRepository()

    describe('create', () => {
        it('should a an entry to the database', () => {
            repository.create({
                prompt: 'We are',
                message: 'here',
                location: {
                    latitude: 12.34343234,
                    longitude: 123.4234243
                }
            })

            expect(repository.posts).to.have.length(1)
        })
    })

    describe('get', () => {
        before(() => {
            repository.posts = [...Array(10)].map( (_,i) => {
                    return {
                        prompt: 'We are',
                        message: `here ${ i }`,
                        location: {
                            latitude: 12.34343234,
                            longitude: 123.4234243
                        }
                    }
                }
            )
        })
        it('should return all posts when no limit is given', () => {
            const posts = repository.get()
            expect(posts).to.have.length(10)
        })
        it('should return the last 5 posts when a limit is given', () => {
            const posts = repository.get(5)
            expect(posts).to.have.length(5)
            expect(posts[0].message).to.eq('here 5')
            expect(posts[4].message).to.eq('here 9')
        })
    })
})