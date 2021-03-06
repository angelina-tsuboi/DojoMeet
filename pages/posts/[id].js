import fire from '../../config/fire-conf';
import Link from 'next/link';

const Post = (props) => {
  return (
    // <div>
    //   <h2>{props.title}</h2>
    //   <h4>{props.location}</h4>
    //   <p>
    //     {props.description}
    //   </p>
    //   <Link href="/posts">
    //     <a>Back</a>
    //   </Link>
    // </div>
    <main>
    <section className="section section-shaped section-lg">
      <div className="shape shape-style-1 bg-gradient-default">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>

    
    </main>
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('posts')
    .doc(query.id)
    .get()
    .then(result => {
      content['title'] = result.data().title;
      content['description'] = result.data().description;
      content['location'] = result.data().location;
    });
return {
    props: {
      title: content.title,
      description: content.description,
      location: content.location
    }
  }
}
export default Post;
