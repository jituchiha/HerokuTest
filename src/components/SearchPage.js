import "./styles.css";
import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

let baseURL = "http://localhost:8080/data?";
let reactURL = "?";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [nameFilter, setnameFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [capacityFilter, setcapacityFilter] = useState("");
  const navigate=useNavigate();

  const [data, setData] = useState(null);

  function setnameFilters(value){
    if (baseURL.indexOf("name=") !== -1) {
      const st="name"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"name="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"name="}[^&]*`),
        st
      );

      setnameFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL
      

    } else {
      setnameFilter(value);

      // backend URL
      baseURL=baseURL+"&"+"name"+"="+value;

      // frontend URL
      reactURL=reactURL+"&"+"name"+"="+value;
    }

    navigate(reactURL)
  }

  function setLocationFilters(value){

    if (baseURL.indexOf("location=") !== -1) {
      const st="location"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"location="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"location="}[^&]*`),
        st
        );

      setLocationFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL

    } else {
      setLocationFilter(value);
      baseURL=baseURL+"&"+"location"+"="+value;
      reactURL=reactURL+"&"+"location"+"="+value;
    }

    navigate(reactURL)
  }

  function setcapacityFilters(value){

    if (baseURL.indexOf("capacity=") !== -1) {
      const st="capacity"+"="+value

      // to update backend URL
      const updatedBaseURL = baseURL.replace(
        new RegExp(`${"capacity="}[^&]*`),
        st
      );

      // to update frontend URL
      const updatedReactURL = reactURL.replace(
        new RegExp(`${"capacity="}[^&]*`),
        st
        );

      setcapacityFilter(value);
      baseURL=updatedBaseURL
      reactURL=updatedReactURL

    } else {
      setcapacityFilter(value);
      baseURL=baseURL+"&"+"capacity"+"="+value;
      reactURL=reactURL+"&"+"capacity"+"="+value;
    }

    navigate(reactURL)

  }

  function setSearchTerms(value){

    if (baseURL.indexOf("search_query=") !== -1) {
        const st="search_query"+"="+value

        // update backend URL
        const updatedBaseURL = baseURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        // update frontend URL
        const updatedReactURL = reactURL.replace(
          new RegExp(`${"search_query="}[^&]*`),
          st
        );

        baseURL=updatedBaseURL
        reactURL=updatedReactURL

        setSearchTerm(value);
      } else {
        baseURL=baseURL+"&"+"search_query"+"="+value;
        reactURL=reactURL+"&"+"search_query"+"="+value;
        setSearchTerm(value);
      }

      navigate(reactURL)
      
  }

  useEffect(() => {
    axios.get(baseURL)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          return res.data;
        } else {
          throw new Error("Server responded with an error status: " + res.status);
        }
      })
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(handleError);
  }, [nameFilter, locationFilter, capacityFilter,searchTerm]);

  function handleError(error) {
    console.error("Axios error:", error);
    // handle the error here, e.g. show an error message to the user
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2 style={{color:'white'}}>Events</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerms(event.target.value)}
        />
        <select 
          value={nameFilter}
          onChange={(event) => setnameFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="tennis">tennis</option>
          <option value="badminton">badminton</option>
          <option value="football">football</option>
          <option value="basketball">basketball</option>
          <option value="table tennis">table tennis</option>
          <option value="volleyball">volleyball</option>
          <option value="squash">squash</option>
        </select>
        <select
          value={locationFilter}
          onChange={(event) => setLocationFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="srsc">srsc</option>
          <option value="north">north</option>
          <option value="south">south</option>
          <option value="east">east</option>
          <option value="west">west</option>
          <option value="downtown">downtown</option>
        </select>
        <select
          value={capacityFilter}
          onChange={(event) => setcapacityFilters(event.target.value)}
        >
          <option value=""></option>
          <option value="4">4</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="10">10</option>
          <option value="30">30</option>
        </select>
      </div>
      <div>
        <h2 style={{color:'white'}}>Results</h2>
        <ul>

        {data ? (
        data.map((json) => (
          <li key={json._id}>
            <p style={{color:'black'}}>{json.name}</p>
            <p style={{color:'black'}}>{json.location}</p>
            <p style={{color:'black'}}>{json.capacity}</p>
          </li>
        ))
      ) : (
        <div>Loading...</div>
      )}
        
      
        </ul>
      </div>
    </div>
  );
}

export default App;
