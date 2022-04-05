import React from 'react'
import { Header } from '../components/Header'
import { Container, Alert, CloseButton} from 'react-bootstrap'
import patrick from '../assets/img/patrick.jpg'
import profilepic from '../assets/img/profilepic.jpg'
import '../assets/css/userProfile.css'
import PopUpArtistProfileForm from '../components/PopUpArtistProfileForm'
import { useState, useEffect } from 'react'
import { Card, CardBody, CardImg,CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Row} from 'reactstrap'
import PopUpAppointmentForm from 'components/PopUpAppointmentForm'
import ArtistNavBar from '../components/ArtistNavBar'
import {useParams} from "react-router-dom";
import {getStyleById, getUser, getUserFollowing, getUserFollower, followUser, unfollowUser} from "../apiHook/profile"
import {login, getLoginStatus} from '../apiHook/loginSignUp'
import Footer from "../components/Footer"

const log = console.log()

function ArtistProfile() {

  let { id } = useParams();
  let myid;

    // Should get this data from the server
    const [values, setValues] = useState({
      profilePic: "",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      birthDate: "",
      phoneNum : "",
      favoriteStyles: [],
      artStyles: [],
      homeLocation: "",
      isArtist: true,
      followingIDs:[],
      followerIDs:[],
      comment:""
    });
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [buttonPopUpBook, setButtonPopUpBook] = useState(false);
    const [success,setSuccess] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [ifFollowed,setIfFollowed] = useState(false);


    useEffect(()=>{
      getLoginStatus().then(json=>{
        console.log(json)
        myid = json.userId;
        if(id == undefined){
          id = myid;
        }
        if(myid == id){
          setIsUser(true);
        }
        getUser(id).then(json => 
          {
            let data = json;
            const favoriteStyles = [];
            document.getElementById("style").innerHTML = "";
            
            
            for(const s_id in data.favoriteStyles){
              getStyleById(data.favoriteStyles[s_id]).then((ele)=> 
              {favoriteStyles[s_id] = ele;
                const li = document.createElement("li");
                li.innerText = ele.name;
                document.getElementById("style").appendChild(li);
              });
            }
            data.favoriteStyles = favoriteStyles
            data.birthDate = data.birthDate.slice(0,10);

            const artStyles = [];
            for(const ms_id in data.artistSub.artStyles){
              getStyleById(data.artistSub.artStyles[ms_id]).then((ele)=> 
              {artStyles[ms_id] = ele;
                const li = document.createElement("li");
                li.innerText = ele.name;
                document.getElementById("style").appendChild(li);
              });
            }
            data.artStyles = artStyles;

            if(data.artistSub.homeLocation !== undefined)
            {
              data.homeLocation = data.artistSub.homeLocation;
            }
  
            setValues(data); 
  
            if(data.followerIDs.includes(myid)){
              setIfFollowed(true);
            }else{
              setIfFollowed(false);
            }
            console.log(values.followerIDs)
          });
      })
    }, [buttonPopUp, success])

    const onDismiss = ()=>{
      setSuccess(false);
    };

    return (
      <div>
        <div>
          <Header loggedIn={true} isArtist={true}/>
        </div>
        <div><ArtistNavBar></ArtistNavBar></div>
        <PopUpArtistProfileForm info={values} setInfo = {setValues} success={success} setSuccess={setSuccess} trigger={buttonPopUp} setTrigger={setButtonPopUp}>My Popup</PopUpArtistProfileForm>
        {isUser ? null : <PopUpAppointmentForm info={values} setInfo = {setValues} trigger={buttonPopUpBook} setTrigger={setButtonPopUpBook}>My Popup</PopUpAppointmentForm>}

        <div className="container">
          <div className="row">
            <div className="col-3">
            <Card id="profileCard" style={{width: '20rem'}}>
              <CardBody>
              <CardImg src={profilepic} id="profileCirclePic" alt='profile' />  
              <h5>{values.userName}</h5>
              <CardText>{values.comment}</CardText>
            <UncontrolledDropdown className="btn-group" id="profileDropdown">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Following: {values.followingIDs.length}
              </DropdownToggle>
              <DropdownMenu >
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown className="btn-group">
             <DropdownToggle tag="a"
              data-toggle="dropdown">
              Followers: {values.followerIDs.length}
              </DropdownToggle>
              <DropdownMenu >
              <DropdownItem tag="a" href="/userprofile/gary" >
              <img id="profileDropdownPic" src={patrick} alt='PatrickYahhh' ></img>
              PatrickYahhh
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            </CardBody>
            </Card>
            
            {isUser? null: <Button size='sm'
                type="button" onClick={()=> setButtonPopUpBook(true)}>Book an appointment</Button>}
            {/* <Button
                size='sm'
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href='http://localhost:3000/artistgallery';
                  }}
            > Gallery</Button> */}
            </div>
            <div className="col-7">
            <Alert variant="success" show={success}>
              <p>Profile Update successfully <CloseButton id = "closeButton" variant="white" onClick={onDismiss}/> </p>
            </Alert>
              <Container id="profileContainer">
              <div className="row mb-3">
                
                
                <label className="col-sm-3 col-form-label col-form-label">Username:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.userName}</label>
                </div>
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">First Name:</label> : null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.firstName}</label>
                </div>
                : null}

                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Last Name:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.lastName}</label>
                </div>
                :null}
                
                <label className="col-sm-3 col-form-label col-form-label">Email:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.email}</label>
                </div>
                
                <label className="col-sm-3 col-form-label col-form-label">Home Location:</label>
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.homeLocation}</label>
                </div>

                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Date of Birth:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.birthDate}</label>
                </div>
                :null}
                
                {isUser ? <label className="col-sm-3 col-form-label col-form-label">Phone:</label>:null}
                {isUser ? 
                <div className="col-sm-7">
                  <label className="col-sm-6 col-form-label col-form-label">{values.phoneNum}</label>
                </div>
                :null}

                <label className="col-sm-3 col-form-label col-form-label">Favorite styles:</label>
                <div className="col-sm-7">
                  {/* {values.favoriteStyles.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.style[index]["name"]}</li>
                  ))} */}
                  {values.favoriteStyles ?
                  <div id = "style" className="col-sm-7"> </div>
                  :null}
                </div>

                <label className="col-sm-3 col-form-label col-form-label">My art styles:</label>
                <div className="col-sm-7">
                  {/* {values.artStyle.map((_, index) => (
                    <li className="col-6 col-form-label col-form-label" key={index}>{values.artStyle[index]["name"]}</li>
                  ))} */}
                  {values.artStyles ?
                  <div id = "style" className="col-sm-7"> </div>
                  :null}
                </div>
              </div>
              { isUser ? <Button size='sm' onClick={()=> setButtonPopUp(true)}>Edit your profile</Button> :null }
              </Container>
            </div>
          </div>
        </div>
        <div>
          <Footer></Footer>
        </div>
      </div>
      )
  }

export default ArtistProfile