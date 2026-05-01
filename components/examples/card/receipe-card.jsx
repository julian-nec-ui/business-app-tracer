import { useEffect, useState } from 'react';
import { styled, easing } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)'
      }
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)'
      }
    }
  ]
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = useState(false);
  const [randomHex, setRandomHex] = useState('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const subheaderDate = () => {
    const today = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return today.toLocaleDateString('en-US', options);
  };

  const generateRandomHexString = () => {
    // Generate a random integer between 0 and 99 (inclusive)
    const randomNum1 = Math.floor(Math.random() * 100);
    const randomNum2 = Math.floor(Math.random() * 100);
    const randomNum3 = Math.floor(Math.random() * 100);

    // Convert to string and pad with a leading '0' if the length is less than 2
    const twoDigitString1 = String(randomNum1).padStart(2, '0');
    const twoDigitString2 = String(randomNum2).padStart(2, '0');
    const twoDigitString3 = String(randomNum3).padStart(2, '0');

    const result = "#" + twoDigitString1 + twoDigitString2 + twoDigitString3;
    console.log("Generated Hex String:", result); // Log the generated hex string
    return result;
  };

  useEffect(() => {
    if (!expanded) {
      return
    }

    setRandomHex(generateRandomHexString()); // Call the function to generate and log a random hex string
  }, [expanded]); // Empty dependency array ensures this runs once on component mount


  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 650,
        border: '1px solid #e0e0e0',
        borderRadius: 2.5,
        boxShadow: '3px 4px 7px rgba(0, 0, 0, 0.1)',
        p:1
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader={subheaderDate()}
      />
      <CardMedia
        component="img"
        height="194"
        image="/examples/paella.jpg"
        alt="Paella dish"
        sx={{
          p: 0.75,
          borderRadius: 4,
          boxShadow: 5
        }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse
        in={expanded}
        timeout={{ enter: 750, exit: 675 }}
        easing={easing.easeInOut}
        unmountOnExit>
        <CardContent>
          <Divider sx={{ marginBottom: 3, border: `4px solid ${randomHex}`, borderRadius: 1, boxShadow: '0 2px 2px rgb(156, 155, 155)' }} />
          <Typography sx={{ marginBottom: 2, fontWeight: 'bold', textDecoration: 'underline' }}>
            Method
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
