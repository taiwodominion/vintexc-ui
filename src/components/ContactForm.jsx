import React from 'react'
import "../css/ContactForm.css"

const ContactForm = () => {
  return (
    <div className="customer-support-section">
      <div className="shape shape-7"></div>  
        <div className="shape shape-8"></div> 
      <div className="section-title">Customer Service Support</div>

      <p className="customer-support-description">
        Do you have enquiries or questions? <br />
        Send a message to us or chat with our 24/7 online assistant
      </p>

      <div className="form-wrapper">
        <form>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter full name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              placeholder="Enter message"
            ></textarea>
          </div>

          <button type="button" className="submit-button">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm