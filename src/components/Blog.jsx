import React from 'react'
import blogImg1 from '../assets/blog-img1.jpg'
import blogImg2 from '../assets/blog-img2.jpg'
import blogImg3 from '../assets/blog-img3.jpg'
import blogImg4 from '../assets/blog-img4.jpg'
import blogImg5 from '../assets/blog-img5.jpg'
import blogImg6 from '../assets/blog-img6.jpg'
import '../css/Blog.css'

const Blog = () => {
  return (
    <div className='overlay'>
        <div className="blog-container">
            <div className="section-label">
                <div className="section-label-text">Blog</div>
            </div>
            <div className="section-title">News and Informations</div>
            <p>Follow trading trends and continually update your skills by 
                learning new techniques from the world.</p>
            <div className="blog-grid">
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg1} alt="" />
                    <button>Learn More</button>
                </div>
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg2} alt="" />
                    <button>Learn More</button>
                </div>
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg3} alt="" />
                    <button>Learn More</button>
                </div>
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg4} alt="" />
                    <button>Learn More</button>
                </div>
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg5} alt="" />
                    <button>Learn More</button>
                </div>
                <div className="blog-box">
                    <h2>Let's learn How crypto Currency Work?</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia.</p>
                    <img src={blogImg6} alt="" />
                    <button>Learn More</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Blog