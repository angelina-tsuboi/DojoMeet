import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const PostCard = ({post})  => {
    const router = useRouter()

    const goToPost = (postId) => {
        router.push(`/posts/${postId}`);
    };
  
    return (
        <Card style={{marginBottom: '1rem'}}>
        <CardContent onClick={() => goToPost(post.id)}>
          <Typography variant="h5" component="h2">
            { post.title }
          </Typography>
          <Typography color="textSecondary">
          { post.location }
          </Typography>
          <Typography variant="body2" component="p">
            { post.description }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${post.email}`}>Sign Up</Button>
          <Button size="small" onClick={() => goToPost(post.id)}>Learn More</Button>
        </CardActions>
      </Card>
    );
  }

  export default PostCard;
  