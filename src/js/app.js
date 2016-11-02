import $ from './vendor/jquery-2.14.min';
import React from 'react';
import {render} from 'react-dom';

var app = (function() {

  function init() {
    getEvents();
  }

  function getEvents() {
    console.log('loaded!');

    // client_id: 'NDI4NDI2NHwxNDc4MTIwMTA5'
    // secret: '9gRpsNVKn_npBuqXDFxgZDek3taWP3NJEeXxqG2D'

    fetch('https://api.seatgeek.com/2/events?type=nfl').then(function(res) {
      return res.json()
    }).then(function(data){
      console.log(data)
    }).catch(function(error) {
      console.log(error)
    })
    // 
    // fetch('https://api.seatgeek.com/2/events?performers[away_team].slug=pittsburgh-steelers').then(function(res) {
    //   return res.json()
    // }).then(function(data){
    //   console.log(data)
    // })
  }

  return {
    start: init
  };

})();

$(function() {app.start();});
