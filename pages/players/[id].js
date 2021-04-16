import fire from '../../config/fire-conf';
import Link from 'next/link';

const Player = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <h4>{props.photoURL}</h4>
      <p>
        {props.description}
      </p>
      <Link href="/posts">
        <a>Back</a>
      </Link>
    </div>
  )
}
export const getServerSideProps = async ({ query }) => {
  const content = {}
  await fire.firestore()
    .collection('users')
    .doc(query.id)
    .get()
    .then(result => {
        console.log("result", result);
      content['name'] = result.data().name;
      content['description'] = result.data().description;
      content['location'] = result.data().location;
      content['photoURL'] = result.data().photoURL;
    });
return {
    props: {
      name: content.name,
      description: content.description,
      location: content.location,
      photoURL: content.photoURL
    }
  }
}
export default Player;
