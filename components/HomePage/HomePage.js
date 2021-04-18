import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Link from '@material-ui/core/Link';
import { useRouter } from 'next/router';


const HomePage = () => {
    const router = useRouter()
    
const goToRoute = (e) => {
    e.preventDefault()
    router.push(e.target.value);
    }

  
  return (
    // <div>
    //   <h1>Welcome!</h1>
    //   <button onClick={goToRoute} value="register">
    //     Sign Up 
    //   </button>
      

    //   <h3>OR</h3>

    //   <button  onClick={goToRoute} value="login">
    //     Login
    //   </button>
    
    // </div>


    <section
    >
      <div className="container-sm">
        <div>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Landing template for <span className="text-color-primary">startups</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cruip.com/">
                    Get started
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
            >
              <img
                className="has-shadow"
                src="https://raw.githubusercontent.com/cruip/open-react-template/master/src/assets/images/video-placeholder.jpg"
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
export default HomePage;