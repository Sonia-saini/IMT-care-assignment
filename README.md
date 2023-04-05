# IMT-care-assignment-Blog App
This is a a full-featured blog application that allows users to view a list of blog
posts, read individual blog posts, create new blog posts, and interact with the content
using Next.js and React.

Structure :
frontend/frontend:code related to fortend (next js app,react-icons,quill).
backend:code related to backend (nodejs mongodb express).

frontend run command: npm run dev
Home page : http://localhost:3000 -Render all blogs. - server-side rendering (getServerSideProps)
Createpost : http://localhost:3000/createPost - Here user can create new blog.
Singleblogpage : http://localhost:3000/content/id - Here user can get some more detail about particular blog and user can edit and delete only his own blog but admin can edit and delete any blog and reader can't see edit and delete icons.- server-side rendering (getServerSideProps)
Login page : http://localhost:3000/login - Here user can login itself.
Register page : http://localhost:3000/register - Here new user can create his own account.
Edit page : http://localhost:3000/Editpage/id - Here users can update their blog details.
Navbar component : component/Navbar.

backend run command: npm run server 
user login route : http://localhost:3005/login
user register route : http://localhost:3005/register 
blog post route: http://localhost:3005/blog 
All blog get route : http://localhost:3005/blog/?title=query;
Single blog get route : http://localhost:3005/blog/id
Blog patch: http://localhost:3005/blog/id
Blog delete route : http://localhost:3005/blog/id
Blog comment route : http://localhost:3005/blogcomment/id

Features 
1. User Authentication (admin,reader,user) after login user will redirect to home page.
2. Post Blog (quill editor)
3. Delete the Blog by its creator or admin.
4. Updation the Blog by its creator or admin.(quill editor)
5. Comment feature(user can comment on particular blog)
6. Pagination 
7. Search by title
8. fetch All blogs at home page.
9. form validation.
10. logout functionality.
11. Navbar to connect other pages.
12. some basic styling.


