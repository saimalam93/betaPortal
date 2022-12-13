import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import "../assets/styles/home.css";
import Image from "../assets/images/betaPortal_bg.jpg";


const HomePage = () => {
  return (
    <div>
      <main>
        <div class="intro">
          <h1>betaPortal</h1>
          <p>A project management system.</p>
        </div>
        <div class="achievements">
          <div class="work">
            <img src={require('../assets/images/projects_home.png')} alt="projects_icon" />
            <p class="work-heading">Projects</p>
            <p class="work-text">I have worked on many projects and I am very proud of them. I am a very good developer and I am always looking for new projects.</p>
          </div>
          <div class="work">
            <img src={require('../assets/images/tasks_home.png')} alt="projects_icon" />
            <p class="work-heading">Tasks</p>
            <p class="work-text">I have a lot of skills and I am very good at them. I am very good at programming and I am always looking for new skills.</p>
          </div>
          <div class="work">
            <img src={require('../assets/images/management_home.png')} alt="projects_icon" />
            <p class="work-heading">Management</p>
            <p class="work-text">I have a lot of network skills and I am very good at them. I am very good at networking and I am always looking for new network skills.</p>
          </div>
        </div>
        <div class="about-me">
          <div class="about-me-sub">
            <h2>About Us</h2>
            <p>We are a group web developer and We love to create websites.</p>
          </div>
          <div class="about-me-sub">
            <img src={require('../assets/images/clay-banks-LjqARJaJotc-unsplash.jpg')} alt="about us" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
