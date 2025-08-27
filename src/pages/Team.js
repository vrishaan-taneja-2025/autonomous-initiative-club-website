import React from 'react';

const Team = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Vrishaan Sharma",
            role: "Event Captain & Founder",
            description: "Passionate about AI and machine learning. Leading the club's vision to create innovative solutions that bridge technology and real-world problems. Expert in Python, TensorFlow, and project management.",
            skills: ["Python", "Machine Learning", "Leadership", "Project Management"],
            email: "vrishaan@autonomousclub.com",
            linkedin: "https://linkedin.com/in/vrishaan-sharma",
            image: "/images/team/vrishaan.svg"
        },
        {
            id: 2,
            name: "Arjun Patel",
            role: "Technical Lead",
            description: "Full-stack developer with expertise in modern web technologies. Responsible for overseeing all technical projects and mentoring junior developers in the club.",
            skills: ["React", "Node.js", "MongoDB", "DevOps"],
            email: "arjun@autonomousclub.com",
            linkedin: "https://linkedin.com/in/arjun-patel",
            image: "/images/team/arjun.svg"
        },
        {
            id: 3,
            name: "Priya Krishnan",
            role: "AI Research Head",
            description: "PhD candidate specializing in computer vision and deep learning. Leading research initiatives and publishing papers on autonomous systems and robotics applications.",
            skills: ["Computer Vision", "Deep Learning", "Research", "OpenCV"],
            email: "priya@autonomousclub.com",
            linkedin: "https://linkedin.com/in/priya-krishnan",
            image: "/images/team/priya.svg"
        },
        {
            id: 4,
            name: "Rohit Gupta",
            role: "Hardware & IoT Specialist",
            description: "Electronics engineer passionate about IoT and embedded systems. Designs and implements hardware solutions for club projects, specializing in Arduino and Raspberry Pi development.",
            skills: ["Arduino", "Raspberry Pi", "IoT", "Circuit Design"],
            email: "rohit@autonomousclub.com",
            linkedin: "https://linkedin.com/in/rohit-gupta",
            image: "/images/team/rohit.svg"
        },
        {
            id: 5,
            name: "Sneha Reddy",
            role: "UI/UX Designer",
            description: "Creative designer focused on user experience and interface design. Ensures all club projects have intuitive and beautiful user interfaces that enhance user engagement.",
            skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
            email: "sneha@autonomousclub.com",
            linkedin: "https://linkedin.com/in/sneha-reddy",
            image: "/images/team/sneha.svg"
        },
        {
            id: 6,
            name: "Karthik Menon",
            role: "Data Science Lead",
            description: "Data scientist with expertise in statistical analysis and predictive modeling. Leads data-driven projects and helps teams make informed decisions based on data insights.",
            skills: ["Python", "R", "SQL", "Data Visualization"],
            email: "karthik@autonomousclub.com",
            linkedin: "https://linkedin.com/in/karthik-menon",
            image: "/images/team/karthik.svg"
        },
        {
            id: 7,
            name: "Ananya Singh",
            role: "Community Manager",
            description: "Manages club communications, events, and community outreach. Passionate about building connections and fostering collaboration between students and industry professionals.",
            skills: ["Event Management", "Social Media", "Communication", "Networking"],
            email: "ananya@autonomousclub.com",
            linkedin: "https://linkedin.com/in/ananya-singh",
            image: "/images/team/ananya.svg"
        }
    ];

    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="page-title">Meet Our Team</h1>
                <p className="page-subtitle">The brilliant minds behind Autonomous Initiative Club</p>
                
                <div className="team-grid">
                    {teamMembers.map(member => (
                        <div key={member.id} className="team-card">
                            <div className="team-avatar">
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="team-image"
                                    onError={(e) => {
                                        // Fallback to initials if image fails to load
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="avatar-placeholder" style={{ display: 'none' }}>
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            
                            <div className="team-info">
                                <h3 className="team-name">{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-description">{member.description}</p>
                                
                                <div className="team-skills">
                                    {member.skills.map((skill, index) => (
                                        <span key={index} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                                
                                <div className="team-contact">
                                    <a href={`mailto:${member.email}`} className="contact-link">
                                        Email
                                    </a>
                                    <a 
                                        href={member.linkedin} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="contact-link"
                                    >
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team;
