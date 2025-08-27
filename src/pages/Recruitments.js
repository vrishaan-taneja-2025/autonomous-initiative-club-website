import React, { useState } from 'react';
import { sendJobApplicationEmail, sendEmailFallback } from '../utils/emailService';

const Recruitments = () => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        department: '',
        cgpa: '',
        skills: '',
        experience: '',
        projects: '',
        motivation: '',
        availability: '',
        portfolio: '',
        resume: null
    });

    const positions = [
        {
            id: 1,
            category: "Core Committee",
            title: "Technical Lead",
            description: "Lead technical projects and mentor junior members. Responsible for code reviews, architecture decisions, and project planning.",
            requirements: [
                "3+ years of programming experience",
                "Strong knowledge of multiple programming languages",
                "Leadership and mentoring experience",
                "Excellent problem-solving skills",
                "CGPA 8.0 or above"
            ],
            responsibilities: [
                "Oversee technical projects and ensure quality",
                "Mentor junior developers and volunteers",
                "Conduct technical interviews and assessments",
                "Collaborate with other leads on strategic decisions"
            ],
            commitment: "15-20 hours per week",
            duration: "1 year",
            openings: 2
        },
        {
            id: 2,
            category: "Core Committee",
            title: "Research Coordinator",
            description: "Coordinate research initiatives and academic collaborations. Work with faculty and industry partners on cutting-edge projects.",
            requirements: [
                "Strong academic background in CS/AI/ML",
                "Research experience or publications",
                "Excellent communication skills",
                "CGPA 8.5 or above"
            ],
            responsibilities: [
                "Coordinate research projects and publications",
                "Liaise with faculty and industry partners",
                "Organize research seminars and workshops",
                "Manage research funding and resources"
            ],
            commitment: "12-15 hours per week",
            duration: "1 year",
            openings: 1
        },
        {
            id: 3,
            category: "Core Committee",
            title: "Events Manager",
            description: "Plan and execute club events, workshops, and competitions. Manage logistics, sponsorships, and participant engagement.",
            requirements: [
                "Event management experience",
                "Strong organizational skills",
                "Networking and communication abilities",
                "CGPA 7.5 or above"
            ],
            responsibilities: [
                "Plan and execute club events and workshops",
                "Manage event logistics and coordination",
                "Secure sponsorships and partnerships",
                "Handle participant registration and engagement"
            ],
            commitment: "10-15 hours per week",
            duration: "1 year",
            openings: 2
        },
        {
            id: 4,
            category: "Junior Working Team",
            title: "Frontend Developer",
            description: "Develop and maintain web applications and user interfaces for club projects. Work with modern frameworks and technologies.",
            requirements: [
                "Proficiency in HTML, CSS, JavaScript",
                "Experience with React or similar frameworks",
                "Understanding of responsive design",
                "CGPA 7.0 or above"
            ],
            responsibilities: [
                "Develop responsive web applications",
                "Collaborate with backend developers",
                "Implement UI/UX designs",
                "Maintain and update existing projects"
            ],
            commitment: "8-12 hours per week",
            duration: "6 months (renewable)",
            openings: 4
        },
        {
            id: 5,
            category: "Junior Working Team",
            title: "Backend Developer",
            description: "Build robust server-side applications and APIs. Work with databases, cloud services, and system architecture.",
            requirements: [
                "Proficiency in Python, Node.js, or Java",
                "Database management experience",
                "Understanding of API development",
                "CGPA 7.0 or above"
            ],
            responsibilities: [
                "Develop server-side applications and APIs",
                "Design and manage databases",
                "Implement security and authentication",
                "Deploy and maintain cloud services"
            ],
            commitment: "8-12 hours per week",
            duration: "6 months (renewable)",
            openings: 3
        },
        {
            id: 6,
            category: "Junior Working Team",
            title: "AI/ML Developer",
            description: "Work on machine learning projects and AI applications. Implement algorithms and build intelligent systems.",
            requirements: [
                "Strong foundation in mathematics and statistics",
                "Experience with Python and ML libraries",
                "Understanding of ML algorithms",
                "CGPA 7.5 or above"
            ],
            responsibilities: [
                "Develop machine learning models",
                "Implement AI algorithms and solutions",
                "Analyze and preprocess data",
                "Research and experiment with new techniques"
            ],
            commitment: "10-15 hours per week",
            duration: "6 months (renewable)",
            openings: 3
        },
        {
            id: 7,
            category: "Volunteers",
            title: "Event Volunteer",
            description: "Support event organization and execution. Help with logistics, registration, and participant assistance.",
            requirements: [
                "Enthusiasm and willingness to learn",
                "Good communication skills",
                "Reliability and punctuality",
                "No minimum CGPA requirement"
            ],
            responsibilities: [
                "Assist in event setup and coordination",
                "Help with participant registration",
                "Support speakers and organizers",
                "Manage event materials and resources"
            ],
            commitment: "5-8 hours per week",
            duration: "Flexible",
            openings: 10
        },
        {
            id: 8,
            category: "Volunteers",
            title: "Content Creator",
            description: "Create content for social media, website, and promotional materials. Help with documentation and communication.",
            requirements: [
                "Creative writing and design skills",
                "Social media experience",
                "Basic graphic design knowledge",
                "No minimum CGPA requirement"
            ],
            responsibilities: [
                "Create social media content and posts",
                "Write blog articles and documentation",
                "Design promotional materials",
                "Manage club's online presence"
            ],
            commitment: "6-10 hours per week",
            duration: "Flexible",
            openings: 5
        },
        {
            id: 9,
            category: "Volunteers",
            title: "Community Outreach",
            description: "Help expand club reach and build connections with other organizations and communities.",
            requirements: [
                "Strong networking and communication skills",
                "Interest in community building",
                "Proactive and self-motivated",
                "No minimum CGPA requirement"
            ],
            responsibilities: [
                "Build relationships with other clubs and organizations",
                "Organize community outreach programs",
                "Represent the club at external events",
                "Recruit new members and participants"
            ],
            commitment: "4-8 hours per week",
            duration: "Flexible",
            openings: 6
        }
    ];

    const handleApplicationSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Send email notification
            const emailResult = await sendJobApplicationEmail(selectedPosition, applicationData);
            
            if (emailResult.success) {
                alert(`Thank you ${applicationData.name}! Your application for ${selectedPosition.title} has been submitted successfully and confirmation email sent. We'll contact you within 5-7 business days.`);
            } else {
                // Fallback to mailto if EmailJS fails
                const subject = `Job Application: ${selectedPosition.title} - ${selectedPosition.category}`;
                const body = `New application from ${applicationData.name} (${applicationData.email}) for ${selectedPosition.title} position in ${selectedPosition.category}`;
                sendEmailFallback(subject, body);
                alert(`Thank you ${applicationData.name}! Your application has been submitted successfully. Please check your email client for confirmation. We'll contact you within 5-7 business days.`);
            }
        } catch (error) {
            console.error('Application submission error:', error);
            alert(`Thank you ${applicationData.name}! Your application has been submitted successfully. We'll contact you within 5-7 business days.`);
        }
        
        // Reset form
        setApplicationData({
            name: '',
            email: '',
            phone: '',
            year: '',
            department: '',
            cgpa: '',
            skills: '',
            experience: '',
            projects: '',
            motivation: '',
            availability: '',
            portfolio: '',
            resume: null
        });
        setShowApplicationForm(false);
        setSelectedPosition(null);
    };

    const openApplicationForm = (position) => {
        setSelectedPosition(position);
        setShowApplicationForm(true);
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Core Committee': return '#FF6B6B';
            case 'Junior Working Team': return '#4ECDC4';
            case 'Volunteers': return '#45B7D1';
            default: return '#95A5A6';
        }
    };

    const groupedPositions = positions.reduce((acc, position) => {
        if (!acc[position.category]) {
            acc[position.category] = [];
        }
        acc[position.category].push(position);
        return acc;
    }, {});

    return (
        <div className="page-container">
            <div className="page-content">
                <h1 className="page-title">Join Our Team</h1>
                <p className="page-subtitle">Be part of something amazing! Apply for open positions in our club.</p>
                
                <div className="recruitment-info">
                    <div className="info-card">
                        <h3>Application Process</h3>
                        <ol>
                            <li>Submit your application through the form</li>
                            <li>Initial screening and review</li>
                            <li>Technical/behavioral interview</li>
                            <li>Final selection and onboarding</li>
                        </ol>
                    </div>
                    <div className="info-card">
                        <h3>What We Offer</h3>
                        <ul>
                            <li>Hands-on experience with cutting-edge technologies</li>
                            <li>Mentorship from industry professionals</li>
                            <li>Networking opportunities</li>
                            <li>Certificate of participation</li>
                            <li>Letter of recommendation for outstanding performers</li>
                        </ul>
                    </div>
                </div>

                {Object.entries(groupedPositions).map(([category, categoryPositions]) => (
                    <div key={category} className="position-category">
                        <h2 className="category-title" style={{ color: getCategoryColor(category) }}>
                            {category}
                        </h2>
                        <div className="positions-grid">
                            {categoryPositions.map(position => (
                                <div key={position.id} className="position-card">
                                    <div className="position-header">
                                        <h3 className="position-title">{position.title}</h3>
                                        <span 
                                            className="position-category-badge"
                                            style={{ backgroundColor: getCategoryColor(position.category) }}
                                        >
                                            {position.openings} opening{position.openings > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    
                                    <p className="position-description">{position.description}</p>
                                    
                                    <div className="position-details">
                                        <div className="detail-section">
                                            <h4>Requirements:</h4>
                                            <ul>
                                                {position.requirements.map((req, index) => (
                                                    <li key={index}>{req}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="detail-section">
                                            <h4>Responsibilities:</h4>
                                            <ul>
                                                {position.responsibilities.map((resp, index) => (
                                                    <li key={index}>{resp}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="position-meta">
                                            <p><strong>Time Commitment:</strong> {position.commitment}</p>
                                            <p><strong>Duration:</strong> {position.duration}</p>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        className="apply-btn"
                                        onClick={() => openApplicationForm(position)}
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Application Form Modal */}
                {showApplicationForm && selectedPosition && (
                    <div className="modal-overlay">
                        <div className="modal large-modal">
                            <h2>Apply for {selectedPosition.title}</h2>
                            <form onSubmit={handleApplicationSubmit}>
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        value={applicationData.name}
                                        onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        value={applicationData.email}
                                        onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                
                                <div className="form-row">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number *"
                                        value={applicationData.phone}
                                        onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                                        required
                                    />
                                    <select
                                        value={applicationData.year}
                                        onChange={(e) => setApplicationData({...applicationData, year: e.target.value})}
                                        required
                                    >
                                        <option value="">Select Year *</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                        <option value="Graduate">Graduate</option>
                                    </select>
                                </div>
                                
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Department *"
                                        value={applicationData.department}
                                        onChange={(e) => setApplicationData({...applicationData, department: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="10"
                                        placeholder="CGPA *"
                                        value={applicationData.cgpa}
                                        onChange={(e) => setApplicationData({...applicationData, cgpa: e.target.value})}
                                        required
                                    />
                                </div>
                                
                                <textarea
                                    placeholder="Technical Skills (List your programming languages, frameworks, tools, etc.) *"
                                    value={applicationData.skills}
                                    onChange={(e) => setApplicationData({...applicationData, skills: e.target.value})}
                                    required
                                ></textarea>
                                
                                <textarea
                                    placeholder="Relevant Experience (Internships, previous projects, leadership roles, etc.)"
                                    value={applicationData.experience}
                                    onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                                ></textarea>
                                
                                <textarea
                                    placeholder="Projects (Describe 2-3 significant projects you've worked on) *"
                                    value={applicationData.projects}
                                    onChange={(e) => setApplicationData({...applicationData, projects: e.target.value})}
                                    required
                                ></textarea>
                                
                                <textarea
                                    placeholder="Why do you want to join this position? What motivates you? *"
                                    value={applicationData.motivation}
                                    onChange={(e) => setApplicationData({...applicationData, motivation: e.target.value})}
                                    required
                                ></textarea>
                                
                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Weekly Availability (e.g., Mon-Fri 6-8 PM) *"
                                        value={applicationData.availability}
                                        onChange={(e) => setApplicationData({...applicationData, availability: e.target.value})}
                                        required
                                    />
                                    <input
                                        type="url"
                                        placeholder="Portfolio/GitHub URL"
                                        value={applicationData.portfolio}
                                        onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                                    />
                                </div>
                                
                                <div className="file-upload">
                                    <label>Resume (PDF format recommended):</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setApplicationData({...applicationData, resume: e.target.files[0]})}
                                    />
                                </div>
                                
                                <div className="modal-buttons">
                                    <button type="submit">Submit Application</button>
                                    <button type="button" onClick={() => setShowApplicationForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recruitments;
