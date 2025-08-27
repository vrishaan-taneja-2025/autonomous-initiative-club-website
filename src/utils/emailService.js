import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_autonomous'; // You'll need to set this up in EmailJS
const EMAILJS_TEMPLATE_ID = 'template_autonomous'; // You'll need to create this template
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // You'll need to get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Send event registration email
export const sendEventRegistrationEmail = async (eventData, participantData) => {
    try {
        const templateParams = {
            to_email: 'autonomousinitiative@gmail.com',
            from_name: participantData.name,
            from_email: participantData.email,
            event_title: eventData.title,
            event_date: eventData.date,
            event_time: eventData.time,
            participant_name: participantData.name,
            participant_email: participantData.email,
            participant_phone: participantData.phone,
            participant_year: participantData.year,
            participant_department: participantData.department,
            participant_experience: participantData.experience,
            participant_expectations: participantData.expectations,
            message_type: 'Event Registration',
            message: `New event registration for ${eventData.title}
            
Participant Details:
- Name: ${participantData.name}
- Email: ${participantData.email}
- Phone: ${participantData.phone}
- Year: ${participantData.year}
- Department: ${participantData.department}
- Experience: ${participantData.experience}
- Expectations: ${participantData.expectations}

Event Details:
- Title: ${eventData.title}
- Date: ${eventData.date}
- Time: ${eventData.time}
- Location: ${eventData.location}`
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Event registration email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send event registration email:', error);
        return { success: false, error };
    }
};

// Send job application email
export const sendJobApplicationEmail = async (positionData, applicationData) => {
    try {
        const templateParams = {
            to_email: 'autonomousinitiative@gmail.com',
            from_name: applicationData.name,
            from_email: applicationData.email,
            position_title: positionData.title,
            position_category: positionData.category,
            applicant_name: applicationData.name,
            applicant_email: applicationData.email,
            applicant_phone: applicationData.phone,
            applicant_year: applicationData.year,
            applicant_department: applicationData.department,
            applicant_cgpa: applicationData.cgpa,
            applicant_skills: applicationData.skills,
            applicant_experience: applicationData.experience,
            applicant_projects: applicationData.projects,
            applicant_motivation: applicationData.motivation,
            applicant_availability: applicationData.availability,
            applicant_portfolio: applicationData.portfolio,
            message_type: 'Job Application',
            message: `New job application for ${positionData.title} (${positionData.category})
            
Applicant Details:
- Name: ${applicationData.name}
- Email: ${applicationData.email}
- Phone: ${applicationData.phone}
- Year: ${applicationData.year}
- Department: ${applicationData.department}
- CGPA: ${applicationData.cgpa}
- Skills: ${applicationData.skills}
- Experience: ${applicationData.experience}
- Projects: ${applicationData.projects}
- Motivation: ${applicationData.motivation}
- Availability: ${applicationData.availability}
- Portfolio: ${applicationData.portfolio}

Position Details:
- Title: ${positionData.title}
- Category: ${positionData.category}
- Openings: ${positionData.openings}`
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );

        console.log('Job application email sent successfully:', response);
        return { success: true, response };
    } catch (error) {
        console.error('Failed to send job application email:', error);
        return { success: false, error };
    }
};

// Fallback email function using mailto (if EmailJS fails)
export const sendEmailFallback = (subject, body) => {
    const mailtoLink = `mailto:autonomousinitiative@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
};

// Setup instructions for EmailJS (to be displayed to admin)
export const getEmailJSSetupInstructions = () => {
    return `
To enable email functionality, please set up EmailJS:

1. Go to https://www.emailjs.com/ and create an account
2. Create a new service (Gmail recommended)
3. Create an email template with the following variables:
   - {{to_email}}
   - {{from_name}}
   - {{from_email}}
   - {{message_type}}
   - {{message}}
   - All participant/applicant fields

4. Update the configuration in src/utils/emailService.js:
   - EMAILJS_SERVICE_ID: Your service ID
   - EMAILJS_TEMPLATE_ID: Your template ID  
   - EMAILJS_PUBLIC_KEY: Your public key

5. Test the email functionality

Note: Until EmailJS is configured, the system will use mailto fallback.
`;
};
