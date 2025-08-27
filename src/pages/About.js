import React from 'react';

const About = () => {
    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="page-title">About Us</h1>
                <p className="page-subtitle">Empowering students to create the future through technology and innovation</p>
                
                <div className="about-content">
                    <div className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            The Autonomous Initiative Club is dedicated to fostering innovation and technological advancement 
                            among students. We believe in the power of automation, artificial intelligence, and creative 
                            problem-solving to shape a better tomorrow.
                        </p>
                        <p>
                            Through hands-on projects, collaborative learning, and industry partnerships, we provide students 
                            with the skills and experience needed to excel in the rapidly evolving tech landscape.
                        </p>
                    </div>

                    <div className="about-section">
                        <h2>What We Do</h2>
                        <div className="activities-grid">
                            <div className="activity-card">
                                <h3>Project Development</h3>
                                <p>Build real-world applications using cutting-edge technologies</p>
                            </div>
                            <div className="activity-card">
                                <h3>Workshops & Training</h3>
                                <p>Regular sessions on AI, ML, IoT, and emerging technologies</p>
                            </div>
                            <div className="activity-card">
                                <h3>Research Initiatives</h3>
                                <p>Collaborate on research projects and publish findings</p>
                            </div>
                            <div className="activity-card">
                                <h3>Industry Connect</h3>
                                <p>Network with professionals and explore career opportunities</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-section">
                        <h2>Get In Touch</h2>
                        <div className="contact-info">
                            <div className="contact-item">
                                <h3>Email</h3>
                                <p>
                                    <a href="mailto:info@autonomousclub.com">info@autonomousclub.com</a>
                                </p>
                                <p>
                                    <a href="mailto:events@autonomousclub.com">events@autonomousclub.com</a>
                                </p>
                            </div>
                            
                            <div className="contact-item">
                                <h3>Location</h3>
                                <p>Computer Science Department</p>
                                <p>Innovation Lab, Room 301</p>
                                <p>University Campus</p>
                            </div>
                            
                            <div className="contact-item">
                                <h3>Meeting Times</h3>
                                <p>Every Friday, 4:00 PM - 6:00 PM</p>
                                <p>Innovation Lab & Online</p>
                            </div>
                            
                            <div className="contact-item">
                                <h3>Social Media</h3>
                                <p>
                                    <a href="https://github.com/autonomous-club" target="_blank" rel="noopener noreferrer">
                                        GitHub Organization
                                    </a>
                                </p>
                                <p>
                                    <a href="https://linkedin.com/company/autonomous-initiative-club" target="_blank" rel="noopener noreferrer">
                                        LinkedIn Page
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="join-section">
                        <h2>Join Our Community</h2>
                        <p>
                            Ready to be part of something amazing? Whether you're a beginner or an expert, 
                            there's a place for you in our community. Join us in creating innovative solutions 
                            and building the future of technology.
                        </p>
                        <div className="join-buttons">
                            <a href="/recruitments" className="join-btn primary">
                                Apply Now
                            </a>
                            <a href="/events" className="join-btn secondary">
                                Attend Events
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
