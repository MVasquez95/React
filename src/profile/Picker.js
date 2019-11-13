import React, { Component } from 'react';
import '../App.css';
import './Picker.css';
import ProfileCard from './ProfileCard';
import { MdAddCircleOutline } from "react-icons/md";

class Picker extends Component {

  componentDidMount = () => {
    // console.log("asdasds")
    // window.addEventListener('scroll', this.handleScroll, true);
    const el = document.querySelector(".outer-border")
    console.log(el)
    el.onwheel = this.handleScroll
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    console.log("why")
    e.preventDefault()
    // console.log(e.deltaX)
    // console.log(e.deltaY)
    const inn = document.querySelector(".inner-border")
    inn.scrollLeft += (e.deltaY / 5)
    // window.scrollX = window.scrollY;
  }

  // componentDidMount = () => {
  //   call API
  //   state.profiles
  // }

  render() {
    // profiles.map state.profiles
    // profiles = [<Profile />]
    let user = {
      userid: 'charls',
      protocol: 'Graz',
      state: '123',
    }
    return (
      <div className="outer-border">
        <h1>Selecciona tu perfil</h1>
        {/* <IconContext.Provider value={{ className: 'react-icons' }} />
        {
          // button add
        } */}
        <div className="add-button">
          < MdAddCircleOutline size="3em" color="orange"/>
        </div>

        <div className="inner-border">
          <ProfileCard user={user}/>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </div>
      </div>
    )
  }
}

export default Picker;