import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "../css/Announcement.css"
import { faVolumeLow } from '@fortawesome/free-solid-svg-icons/faVolumeLow'

const Announcement = () => {
  return (
    <div className='announcement-bar'>
         <FontAwesomeIcon icon={faVolumeLow} className="announcement-icon" />
        <p>Vintexc demonstrates commitment to legal and transparent operations through MSB registration</p>
    </div>
  )
}

export default Announcement