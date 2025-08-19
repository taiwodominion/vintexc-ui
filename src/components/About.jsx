import React from 'react'
import aboutImage from '../assets/about-globe.png'
import "../css/About.css"

const About = () => {
  return (
    <div className="about-container">
        <div className="section-label">
          <div className="section-label-text">About</div>
        </div>
        <div className="about-grid">
            <img src={aboutImage} alt="" />
            <div className="about-content">
                <div className='section-title'>About VINTEXC</div>
                <p>Vintexc Exchange Global Professional Station is an innovative digital asset trading 
                    platform that serves professional trading users around the world and is committed 
                    to discovering high-quality and innovative digital asset investment opportunities. 
                    Currently, it provides more than 40 digital asset product trading and investment 
                    services. Headquartered in the United States, it is operated by the Vintexc exchange 
                    global professional station team. Vintexc exchange is the world's leading blockchain 
                    asset financial service provider. It has provided high-quality services to millions of
                    users in more than 130 countries around the world. It has independent offices, 
                    trading operations and operation centers in Singapore, South Korea, Hong Kong, and 
                    medium-sized countries and regions. Vintexc exchange and its sub-brands are in a 
                    leading position in the world in terms of technology platform, product line, security
                    risk control system,operation and customer service system.</p>
            </div>
        </div>
    </div>
  )
}

export default About