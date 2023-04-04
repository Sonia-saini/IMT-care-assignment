import React from 'react'

function single({blogs}) {
    console.log(blogs)
    const delet=(id)=>{
        fetch(`http://localhost:3005/blog/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "userid":""
            }
        }).then(res=>res.json()).then((res)=>alert(res.msg)).catch((err)=>alert(err))
    }
  return (
    <div>
        <div className="space-y-1 mt-5" key={blogs.blog._id}>
                <h3 className="font-bold">{blogs.blog.title}</h3>

                <p>{blogs.blog.content}...</p>
                <img src={blogs.blog.image} />
                <button onClick={()=>delet(blogs.blog._id)}>Delete</button>
                <button>Update</button>
              </div>
    </div>
  )
}
export async function getServerSideProps(context) {
    let data = await fetch(`http://localhost:3005/blog/${context.params.id}`);
    let res = await data.json();
    return {
      props: { blogs: JSON.parse(JSON.stringify(res)) },
    };
  }
export default single