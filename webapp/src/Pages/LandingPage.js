import React, { Component } from 'react'
import { Header } from '../components/Header.js'
import { Container } from 'react-bootstrap'
import { Button, Form} from 'react-bootstrap'
import {Multiselect} from 'multiselect-react-dropdown';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import ArtistCard from 'components/ArtistCard.js';
import "../assets/css/landingPage.css";

export class LandingPage extends Component {

  state = {
    country: '',
    region: '',
    start: '',
    end: '',
    styles: [],
    }

  optionData = [{name:'Traditional', id: 1}, 
    {name:'Japanese', id: 2}, 
    {name:'New School', id: 3},
    {name:'Realism', id: 5}, 
    {name:'Illustrative', id: 6}, 
    {name: 'Portraiture', id: 7}, 
    {name: 'Blackwork', id: 8},
    {name: 'Watercolor', id: 9},
    {name:'Lettering',id: 10},
    {name:'Geometric',id: 11},
    {name:'Surrealism',id: 12},
    {name:'Microrealism',id: 13},
    {name:'Minimalism',id: 14},
    {name:'Single Line',id: 14},
    {name:'Dot Work',id: 14},];

  render(){
    return (
      <div>
        <div><Header/> </div>
        <Container>
              <h4 className="mb-4">Welcome to PickInk! Get started by finding the right Artist. </h4>
            <Form>
              <div className='row'>
                <Form.Group className='col-5 mb-2' >                 
                <Form.Label> Country: </Form.Label>
                <CountryDropdown
                        className='countrySelector'
                        value={this.state.country}
                        onChange={(val) => this.setState({country: val})}></CountryDropdown> 
                </Form.Group>
                <Form.Group className='col-5 mb-2'>
                 <Form.Label> Region: </Form.Label>
                <RegionDropdown
                      className='countrySelector'
                      country={this.state.country}
                      value={this.state.region}
                      onChange={(val) => this.setState({region: val})}/>
                </Form.Group>
              </div>
                <div className = 'row'>
                  <Form.Group className="mb-2 col-3" >
                      <Form.Label>Start:</Form.Label>
                      <Form.Control type="date"/>
                  </Form.Group>

                  <Form.Group className="mb-2 col-3" >
                      <Form.Label>End:</Form.Label>
                      <Form.Control type="date"/>
                  </Form.Group>
                  </div>

                  <Form.Group className="mb-2 col-5" >
                      <Form.Label>Styles:</Form.Label>
                      <Multiselect options={this.optionData} displayValue="name"
                        onSelect={(val) => this.setState({styles: this.state.styles.concat(val)})}
                        onRemove={(val) => this.setState({styles: this.state.styles.remove(val)})}>
                      </Multiselect>
                  </Form.Group>

                  <Button className="mt-3 mb-3" id="button-14" type="submit" >Apply</Button>
              </Form>
          </Container>
          <Container>
            <div className='cardContainer'> 
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
              <ArtistCard/>
            </div>
          </Container>
      </div>
      )
    }

}

export default LandingPage