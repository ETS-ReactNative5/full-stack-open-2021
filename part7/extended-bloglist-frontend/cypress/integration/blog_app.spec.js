describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('log in to application')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in to application')
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('s')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#blog-form-button').click()

      cy.contains('a new blog React patterns added')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/'
        })
      })

      it('a user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      it('the user who created a blog can delete it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('windows:confirm', () => true)

        cy.contains('Blog React patterns deleted')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7
        })
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5
        })
        cy.createBlog({
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12
        })
      })

      it('blogs are ordered according to likes', function () {
        cy.get('.blogTitle').then((blogs) => {
          cy.get(blogs[0]).should('contain', 'Canonical string reduction')
          cy.get(blogs[1]).should('contain', 'React patterns')
          cy.get(blogs[2]).should(
            'contain',
            'Go To Statement Considered Harmful'
          )
        })
      })
    })
  })
})
