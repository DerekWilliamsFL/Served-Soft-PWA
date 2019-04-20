import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = theme => ({
  card: {
    width: 350,
    height: 350,
    padding: "2rem 0"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  showToastLikeMessage = () => {
    if (!this.state.toastOpen) {

      this.setState({ toastOpen: true }, () => document.getElementById("toast-like").classList.add("show"));

      setTimeout(() => {
        document.getElementById("toast-like").className = document.getElementById("toast-like").className.replace("show", "");
        this.setState({ toastOpen: false });
      }, 5000);
    }
  }

  toggleLike = () => {
    if (this.props.userEmail === "") { this.showToastLikeMessage(); }

    let newLikes = [];
    if (this.props.liked) {
      newLikes = this.props.userLikes.filter(like => like != this.props.title);
    this.props.setNewLikes(newLikes);
      
    }
    else {
      if (this.props.userLikes && this.props.title) {
      const currentLikes = this.props.userLikes;
      currentLikes.push(this.props.title);
      this.props.setNewLikes(currentLikes);
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={this.props.title}
          subheader={this.props.category}
        />
        <CardMedia
          className={classes.media}
          image={this.props.image}
          title={this.props.title}
        />
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.toggleLike} >
            <FavoriteIcon style={{ color: this.props.liked ? "red" : "" }} />
          </IconButton>
        </CardActions>
                {
          this.state.toastOpen &&

          <div id="toast-like">
            <div id="img"></div>
            <div id="desc">Please create an account to save favorites!</div>
          </div>
        }
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);