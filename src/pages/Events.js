import React, { useState } from 'react';
import { verifyEventCaptainPassword, generateSessionToken } from '../utils/auth';
import { sendEventRegistrationEmail, sendEmailFallback } from '../utils/emailService';

const Events = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showParticipationForm, setShowParticipationForm] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "AI Workshop: Introduction to Machine Learning",
            date: "2024-02-15",
            time: "2:00 PM - 5:00 PM",
            location: "Innovation Lab, Room 301",
            description: "Learn the fundamentals of machine learning with hands-on coding exercises using Python and scikit-learn.",
            status: "upcoming",
            maxParticipants: 30,
            currentParticipants: 18,
            organizer: "Priya Krishnan"
        },
        {
            id: 2,
            title: "Hackathon 2024: Smart Campus Solutions",
            date: "2024-03-01",
            time: "9:00 AM - 9:00 PM",
            location: "Main Auditorium",
            description: "48-hour hackathon focused on developing innovative solutions for campus life. Prizes worth $5000!",
            status: "upcoming",
            maxParticipants: 100,
            currentParticipants: 67,
            organizer: "Vrishaan Sharma"
        },
        {
            id: 3,
            title: "IoT Project Showcase",
            date: "2024-01-20",
            time: "3:00 PM - 6:00 PM",
            location: "Engineering Building",
            description: "Students presented their IoT projects including smart home automation and environmental monitoring systems.",
            status: "completed",
            maxParticipants: 50,
            currentParticipants: 45,
            organizer: "Rohit Gupta"
        },
        {
            id: 4,
            title: "Industry Talk: Future of Autonomous Systems",
            date: "2024-01-10",
            time: "4:00 PM - 5:30 PM",
            location: "Virtual Event",
            description: "Guest speaker from Tesla discussed the latest developments in autonomous vehicle technology.",
            status: "completed",
            maxParticipants: 200,
            currentParticipants: 156,
            organizer: "Ananya Singh"
        }
    ]);

    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        maxParticipants: '',
        organizer: 'Vrishaan Sharma'
    });

    const [participationData, setParticipationData] = useState({
        name: '',
        email: '',
        phone: '',
        year: '',
        department: '',
        experience: '',
        expectations: ''
    });

    const handleCreateEvent = (e) => {
        e.preventDefault();
        
        // Use secure password verification
        if (!verifyEventCaptainPassword(password)) {
            alert('Access denied! Invalid credentials.');
            setPassword('');
            return;
        }

        // Generate session token for authenticated user
        const token = generateSessionToken();
        setSessionToken(token);
        setIsAuthenticated(true);

        const event = {
            id: Date.now(), // Use timestamp for unique ID
            ...newEvent,
            status: 'upcoming',
            currentParticipants: 0,
            createdBy: 'Event Captain',
            createdAt: new Date().toISOString()
        };

        setEvents([...events, event]);
        setNewEvent({
            title: '',
            date: '',
            time: '',
            location: '',
            description: '',
            maxParticipants: '',
            organizer: 'Vrishaan Sharma'
        });
        setPassword('');
        setShowCreateForm(false);
        alert('Event created successfully!');
    };

    const handleParticipation = async (e) => {
        e.preventDefault();
        
        try {
            // Send email notification
            const emailResult = await sendEventRegistrationEmail(selectedEvent, participationData);
            
            if (emailResult.success) {
                alert(`Thank you ${participationData.name}! Your registration for "${selectedEvent.title}" has been submitted and confirmation email sent.`);
            } else {
                // Fallback to mailto if EmailJS fails
                const subject = `Event Registration: ${selectedEvent.title}`;
                const body = `New registration from ${participationData.name} (${participationData.email}) for ${selectedEvent.title} on ${selectedEvent.date}`;
                sendEmailFallback(subject, body);
                alert(`Thank you ${participationData.name}! Your registration has been submitted. Please check your email client for confirmation.`);
            }

            // Update participant count
            setEvents(events.map(event => 
                event.id === selectedEvent.id 
                    ? { ...event, currentParticipants: event.currentParticipants + 1 }
                    : event
            ));

        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration submitted successfully! We will contact you soon.');
        }

        // Reset form
        setParticipationData({
            name: '',
            email: '',
            phone: '',
            year: '',
            department: '',
            experience: '',
            expectations: ''
        });
        setShowParticipationForm(false);
        setSelectedEvent(null);
    };

    const openParticipationForm = (event) => {
        if (event.status === 'completed') {
            alert('This event has already been completed.');
            return;
        }
        if (event.currentParticipants >= event.maxParticipants) {
            alert('Sorry, this event is full!');
            return;
        }
        setSelectedEvent(event);
        setShowParticipationForm(true);
    };

    // New functions for event management
    const handleCompleteEvent = (eventId) => {
        if (!isAuthenticated) {
            const inputPassword = prompt('Enter event captain password to complete event:');
            if (!verifyEventCaptainPassword(inputPassword)) {
                alert('Access denied! Invalid credentials.');
                return;
            }
        }

        setEvents(events.map(event => 
            event.id === eventId 
                ? { ...event, status: 'completed', completedAt: new Date().toISOString() }
                : event
        ));
        alert('Event marked as completed!');
    };

    const handleDeleteEvent = (eventId) => {
        if (!isAuthenticated) {
            const inputPassword = prompt('Enter event captain password to delete event:');
            if (!verifyEventCaptainPassword(inputPassword)) {
                alert('Access denied! Invalid credentials.');
                return;
            }
        }

        if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
            setEvents(events.filter(event => event.id !== eventId));
            alert('Event deleted successfully!');
        }
    };

    const openCreateForm = () => {
        setShowCreateForm(true);
        setPassword('');
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <div className="events-header">
                    <h1 className="page-title">Events</h1>
                    <p className="page-subtitle">Join our exciting events and workshops</p>
                    <button 
                        className="create-event-btn"
                        onClick={openCreateForm}
                    >
                        + Create Event
                    </button>
                </div>

                <div className="events-grid">
                    {events.map(event => (
                        <div key={event.id} className={`event-card ${event.status}`}>
                            <div className="event-header">
                                <h3 className="event-title">{event.title}</h3>
                                <span className={`event-status ${event.status}`}>
                                    {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                </span>
                            </div>
                            
                            <div className="event-details">
                                <p><strong>Date:</strong> {event.date}</p>
                                <p><strong>Time:</strong> {event.time}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>Organizer:</strong> {event.organizer}</p>
                            </div>
                            
                            <p className="event-description">{event.description}</p>
                            
                            <div className="event-participation">
                                <p className="participation-count">
                                    {event.currentParticipants}/{event.maxParticipants} participants
                                </p>
                                <div className="participation-bar">
                                    <div 
                                        className="participation-fill"
                                        style={{ 
                                            width: `${(event.currentParticipants / event.maxParticipants) * 100}%` 
                                        }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="event-actions">
                                <button 
                                    className={`participate-btn ${event.status === 'completed' ? 'disabled' : ''}`}
                                    onClick={() => openParticipationForm(event)}
                                    disabled={event.status === 'completed'}
                                >
                                    {event.status === 'completed' ? 'Event Completed' : 'Register Now'}
                                </button>
                                
                                {/* Event management buttons */}
                                <div className="event-management">
                                    {event.status === 'upcoming' && (
                                        <button 
                                            className="complete-btn"
                                            onClick={() => handleCompleteEvent(event.id)}
                                            title="Mark as completed"
                                        >
                                            ✓ Complete
                                        </button>
                                    )}
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDeleteEvent(event.id)}
                                        title="Delete event"
                                    >
                                        🗑 Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Create Event Modal */}
                {showCreateForm && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Create New Event</h2>
                            <form onSubmit={handleCreateEvent}>
                                <div className="password-field">
                                    <input
                                        type="password"
                                        placeholder="Event Captain Access Code"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                    <small className="security-note">
                                        🔒 Secure authentication required
                                    </small>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Event Title"
                                    value={newEvent.title}
                                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                                    required
                                />
                                <input
                                    type="date"
                                    value={newEvent.date}
                                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Time (e.g., 2:00 PM - 5:00 PM)"
                                    value={newEvent.time}
                                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                                    required
                                />
                                <textarea
                                    placeholder="Event Description"
                                    value={newEvent.description}
                                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                                    required
                                ></textarea>
                                <input
                                    type="number"
                                    placeholder="Maximum Participants"
                                    value={newEvent.maxParticipants}
                                    onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                                    required
                                />
                                <div className="modal-buttons">
                                    <button type="submit">Create Event</button>
                                    <button type="button" onClick={() => setShowCreateForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Participation Form Modal */}
                {showParticipationForm && selectedEvent && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h2>Register for {selectedEvent.title}</h2>
                            <form onSubmit={handleParticipation}>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={participationData.name}
                                    onChange={(e) => setParticipationData({...participationData, name: e.target.value})}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={participationData.email}
                                    onChange={(e) => setParticipationData({...participationData, email: e.target.value})}
                                    required
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={participationData.phone}
                                    onChange={(e) => setParticipationData({...participationData, phone: e.target.value})}
                                    required
                                />
                                <select
                                    value={participationData.year}
                                    onChange={(e) => setParticipationData({...participationData, year: e.target.value})}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Department"
                                    value={participationData.department}
                                    onChange={(e) => setParticipationData({...participationData, department: e.target.value})}
                                    required
                                />
                                <textarea
                                    placeholder="Previous Experience (Optional)"
                                    value={participationData.experience}
                                    onChange={(e) => setParticipationData({...participationData, experience: e.target.value})}
                                ></textarea>
                                <textarea
                                    placeholder="What do you expect to learn from this event?"
                                    value={participationData.expectations}
                                    onChange={(e) => setParticipationData({...participationData, expectations: e.target.value})}
                                    required
                                ></textarea>
                                <div className="modal-buttons">
                                    <button type="submit">Register</button>
                                    <button type="button" onClick={() => setShowParticipationForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
