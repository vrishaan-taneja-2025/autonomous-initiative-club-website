import React from 'react';

const Projects = () => {
    const projects = [
        {
            id: 1,
            title: "AI-Powered Chatbot",
            description: "An intelligent chatbot using natural language processing to assist students with academic queries and campus information.",
            technologies: ["Python", "TensorFlow", "Flask", "React"],
            status: "Completed",
            github: "https://github.com/autonomous-club/ai-chatbot"
        },
        {
            id: 2,
            title: "Smart Campus Navigation",
            description: "A mobile app that helps students navigate the campus using AR technology and real-time location tracking.",
            technologies: ["React Native", "ARCore", "Firebase", "Google Maps API"],
            status: "In Progress",
            github: "https://github.com/autonomous-club/campus-nav"
        },
        {
            id: 3,
            title: "Automated Attendance System",
            description: "Face recognition-based attendance system that automatically marks attendance for students and faculty.",
            technologies: ["OpenCV", "Python", "MySQL", "Raspberry Pi"],
            status: "Completed",
            github: "https://github.com/autonomous-club/attendance-system"
        },
        {
            id: 4,
            title: "IoT Weather Station",
            description: "A comprehensive weather monitoring system using IoT sensors to collect and analyze environmental data.",
            technologies: ["Arduino", "Node.js", "MongoDB", "React Dashboard"],
            status: "In Progress",
            github: "https://github.com/autonomous-club/weather-station"
        },
        {
            id: 5,
            title: "Blockchain Voting System",
            description: "A secure and transparent voting system using blockchain technology for student elections.",
            technologies: ["Solidity", "Web3.js", "Ethereum", "React"],
            status: "Planning",
            github: "https://github.com/autonomous-club/blockchain-voting"
        },
        {
            id: 6,
            title: "Machine Learning Stock Predictor",
            description: "A predictive model that analyzes market trends and provides stock price predictions using machine learning algorithms.",
            technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit"],
            status: "Completed",
            github: "https://github.com/autonomous-club/stock-predictor"
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#4CAF50';
            case 'In Progress': return '#FF9800';
            case 'Planning': return '#2196F3';
            default: return '#757575';
        }
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="page-title">Our Projects</h1>
                <p className="page-subtitle">Innovative solutions built by our talented team members</p>
                
                <div className="projects-grid">
                    {projects.map(project => (
                        <div key={project.id} className="project-card">
                            <div className="project-header">
                                <h3 className="project-title">{project.title}</h3>
                                <span 
                                    className="project-status" 
                                    style={{ backgroundColor: getStatusColor(project.status) }}
                                >
                                    {project.status}
                                </span>
                            </div>
                            
                            <p className="project-description">{project.description}</p>
                            
                            <div className="project-technologies">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            
                            <div className="project-actions">
                                <a 
                                    href={project.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
