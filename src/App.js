import React, { Component } from 'react';
import logo from './logo.svg';
import './css/animate.css';
import './css/font-awesome.min.css';
import './App.css';
import './css/bootstrap.min.css';
import './css/main.css';
import Logo from "./img/logo.png";
import Jollibee from "./img/jollibee.png";
import Employee from "./img/ice-cream.webp";
import WOW from "wowjs";
import Dashboard from "./js/components/Dashboard";
import Card from "./js/components/card";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Users from "./data/USERS.json";
import TwoIceCream from "./img/two_icecream.svg";
import Cheeseburger from "./img/cheeseburger.png";
import FrenchFries from "./img/french fries.png";
import StrawberryIceCream from "./img/strawberryicecream.png";
import PineappleMilkshake from "./img/pineapplemilkshake.png";
import RaspberryWine from "./img/raspberrywine.png";
import Likes from "./data/LIKES.json";

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class App extends Component {
  state = {
    adminDashboardOpen: false
  }
  componentDidMount() {
    const wow = new WOW.WOW();
    wow.init();
  }

  signIn = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const user = Users.filter(user => user.email == email && user.password == password);
    this.setState({ currentUser: user[0] }, () => {
      this.showToastMessage();
      this.generateUserLikes(Likes);
    });
  }

  generateUserLikes = (likeList) => {
    const likesThisProduct = likeList.filter(like => like.userEmail == this.state.currentUser.email);
    const likes = [];
    likesThisProduct.map(like => likes.push(like.product));
    this.setState({ userLikes: likes });
  }

  showToastMessage = () => {
    if (!this.state.toastOpen) {

      this.setState({ toastOpen: true }, () => document.getElementById("toast").classList.add("show"));

      setTimeout(() => {
        document.getElementById("toast").className = document.getElementById("toast").className.replace("show", "");
        this.setState({ toastOpen: false });
      }, 5000);
    }
  }

  openAdminDashboard = () => {
    this.setState({ adminDashboardOpen: !this.state.adminDashboardOpen });
  }

  handleClose = () => {
    this.setState({ adminDashboardOpen: false });
  };

  createAccount = () => {
    this.setState({ creatingAccount: true });
  }

  logOut = () => {
    this.setState({ currentUser: null });
  }

  setNewLikes = (newLikes) => {
    this.setState({ userLikes: newLikes });
  }

  render() {
    const { classes } = this.props;
    return (

      <div className="App">
        {
          this.state.adminDashboardOpen &&
          <Dialog
            fullScreen
            open={this.state.adminDashboardOpen}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar style={{ position: "relative" }}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                </Typography>
              </Toolbar>
            </AppBar>
            <Dashboard />
          </Dialog>
        }
        <div className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="index.html"><img src={Logo} style={{ width: 120 }} alt="Logo" /> </a>
            </div>

            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                {this.state.currentUser &&
                  this.state.currentUser.email === "admin@email.com" &&
                  <li><a href="#contact" onClick={this.openAdminDashboard}>Analytics</a></li>
                }

              </ul>
            </div>
          </div>
        </div>

        {/*<!--Header-->*/}
        <section id="header">

          <div className="container">
            <div className="row header-text">
              <div className="col-sm-8 pull-right text-right">
                <div className="margin-100">
                  <h1 style={{ fontFamily: "Lato" }}>Served Soft</h1>
                  <h3>Indulge in <strong><em>you</em></strong></h3>
                  {
                    !this.state.currentUser &&
                    <div>

                      {
                        this.state.creatingAccount &&
                        <div>
                          <input type="text" id="first_name"></input>
                          <input type="text" id="last_name"></input>
                          <input type="radio" id=""></input>
                        </div>
                      }
                    </div>
                  }

                </div>
                <div id="signinform">
                  <div className=" col-sm-12 col-md-3" id="email-container">
                    <label htmlFor="email" style={{ color: "White" }}>Email:</label>
                    <input type="text" className="form-control" id="email" value="admin@email.com" />
                  </div>
                  <div className="col-sm-12 col-md-3" id="password-container">
                    <label htmlFor="password" style={{ color: "White" }}>Password:</label>
                    <input type="text" className="form-control" id="password" value="admin" />
                  </div>
                </div>
                {
                  this.state.currentUser ?
                    <div>
                      <button onClick={this.logOut} className="btn btn-primary btn-lg">Log Out <i className="fa fa-minus"></i></button>
                    </div>
                    :
                    <div>
                      <button onClick={this.signIn} className="btn btn-primary btn-lg">Sign In <i className="fa fa-sign-in"></i></button>
                    </div>
                }


              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-sm-4 text-center wow fadeInUp">
              <img className="header-img" src={TwoIceCream} alt="Header Image" />
            </div>


          </div>
        </section>


        {/*<!--Main 1-->*/}
        <section id="main1">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 margin-30" >
                <h2 style={{ color: "white" }}>A New Kind of Ice Cream</h2><br />
                <p style={{ color: "white" }}>We love Ice Cream, but it's even better with other ingredients mixed in, or delicious sauces. In honor of those many desserts, enjoy this shop to give you new ideas . . . mostly about eating ice cream. </p><br />
                <blockquote style={{ color: "white" }}>
                  Their selection is unbelievable! They have imported flavors from all around the world!
            </blockquote>
                <br />
              </div>

              <div className="col-sm-6 wow fadeInUpBig">
                <img className="main1-img img-responsive pull-right" src={Employee} alt="Main1 Image" />
              </div>
            </div>
          </div>
        </section>


        <div>
          <div className="col-sm-12" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            <Card title="Strawberry Ice Cream" category="Sweet" image={StrawberryIceCream} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("Strawberry Ice Cream")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />
            <Card title="Pineapple Milkshake" category="Sweet" image={PineappleMilkshake} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("Pineapple Milkshake")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />

            <Card title="Cheeseburger" category="Savory" image={Cheeseburger} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("Cheeseburger")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />
            <Card title="French Fries" category="Savory" image={FrenchFries} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("French Fries")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />

            <Card title="Vanilla Wine" category="Delicious" image={Cheeseburger} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("Vanilla Wine")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />
            <Card title="Raspberry Chardonnay" category="Delicious" image={RaspberryWine} userEmail={this.state.currentUser ? this.state.currentUser.email : ""} liked={this.state.userLikes && this.state.userLikes.includes("Raspberry Chardonnay")} generateUserLikes={this.generateUserLikes} userLikes={this.state.userLikes} setNewLikes={this.setNewLikes} />
          </div>
        </div>

        {/*<!--Main 2-->*/}
        <section id="main2" className="col-sm-12">
          <div className="container">
            <div className="row">

              <div className="col-sm-6 wow fadeInUpBig">
                <img className="main2-img pull-left" src={Jollibee} alt="Main2 Image" />
              </div>

              <div className="col-sm-6 margin-30">
                <h2 style={{ color: "white" }}>Today's Sweet Deal</h2><br />
                <h3 style={{ color: "white" }}>Jollibee Classics of The Golden Age</h3><br />
                <h5 style={{ color: "white" }}>Decadent Reward Members only. Sign up today!</h5>
                <br />
                <a href="#" className="btn btn-primary btn-lg">Order Today!</a>
              </div>

            </div>
          </div>
        </section>
        {
          this.state.toastOpen &&

          <div id="toast">
            <div id="img">Icon</div>
            <div id="desc">Hello {this.state.currentUser && this.state.currentUser.first_name && `${this.state.currentUser.first_name}`}!</div>
          </div>
        }

        {/*<!--Bottom-->*/}
        <section id="bottom col-sm-12">
          <div className="container">

            <div className="row">
              <div className="col-sm-12 text-center">
                <ul className="list-inline social" style={{ paddingTop: 10 }}>
                  <li className="wow slideInLeft" data-wow-delay="0.3s"><a href="#"><i className="fa fa-dribbble fa-2x"></i></a></li>
                  <li className="wow slideInLeft" ><a href="#"><i className="fa fa-facebook fa-2x"></i></a></li>
                  <li className="wow slideInRight" ><a href="#"><i className="fa fa-twitter fa-2x"></i></a></li>
                  <li className="wow slideInRight" data-wow-delay="0.3s"><a href="#"><i className="fa fa-github fa-2x"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <p style={{ color: "#383838" }}><small>Copyright &copy; Served Soft. All rights reserved.</small></p>
              </div>
            </div>
          </div>
        </footer>

      </div>

    );
  }
}

export default App;
