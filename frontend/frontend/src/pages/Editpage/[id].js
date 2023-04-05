import React from 'react'
import Update from '../../../component/Update';

function Edit({blogs}) {
  return (
    <div>
        <Update {...blogs.blog}/>
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
export default Edit