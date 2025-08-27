# Autonomous Initiative Club Website

A comprehensive React-based website for the Autonomous Initiative Club with advanced features including event management, team profiles, project showcase, and recruitment system.

## 🚀 Features

### ✅ **Enhanced Functionality (Latest Updates)**

#### 🔐 **Secure Authentication**
- **Hashed Password System**: Event captain password is securely hashed, not stored in plain text
- **Session Management**: Authenticated users get session tokens for continued access
- **Multiple Security Layers**: Decoy hashes and obfuscation to prevent reverse engineering

#### 📧 **Email Integration**
- **Automatic Email Notifications**: All form submissions send emails to autonomousinitiative@gmail.com
- **Event Registrations**: Participant details sent via email
- **Job Applications**: Complete application data forwarded to admin
- **Fallback System**: Uses mailto if EmailJS is not configured

#### 🎭 **Team Member Images**
- **Beautiful SVG Avatars**: Custom gradient-based profile images for all 7 team members
- **Fallback System**: Shows initials if images fail to load
- **Hover Effects**: Interactive image animations

#### 🎪 **Advanced Event Management**
- **Create Events**: Password-protected event creation (secure authentication)
- **Complete Events**: Mark events as completed with authentication
- **Delete Events**: Remove events with confirmation and authentication
- **Real-time Updates**: Dynamic participant count updates

### 📄 **Core Pages**

#### 1. **Home Page**
- Animated Vanta.js waves background
- Hero section with club logo and tagline

#### 2. **Projects Page**
- 6 diverse technical projects
- Status indicators (Completed, In Progress, Planning)
- Technology tags and GitHub links

#### 3. **Team Page**
- 7 team members with detailed profiles
- Custom SVG images with hover effects
- Skills, contact information, and descriptions

#### 4. **Events Page**
- Event listings with participation tracking
- Registration forms with email notifications
- Password-protected event creation (password: "vrishaan")
- Event management (complete/delete with authentication)

#### 5. **About Us Page**
- Mission statement and club description
- Complete contact information
- Email: autonomousinitiative@gmail.com
- Meeting times and location details

#### 6. **Recruitments Page**
- **Core Committee**: Technical Lead, Research Coordinator, Events Manager
- **Junior Working Team**: Frontend/Backend/AI-ML Developers
- **Volunteers**: Event Volunteers, Content Creators, Community Outreach
- Detailed application forms with email notifications

## 🛠️ **Setup Instructions**

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd autonomousclub-react

# Install dependencies
npm install

# Start development server
npm start
```

### 📧 **Email Configuration (Optional)**

To enable email functionality:

1. **Sign up for EmailJS**: Go to https://www.emailjs.com/
2. **Create a service**: Choose Gmail or your preferred email provider
3. **Create an email template** with these variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message_type}}`
   - `{{message}}`
   - All participant/applicant fields

4. **Update configuration** in `src/utils/emailService.js`:
   ```javascript
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

5. **Test the functionality**: Submit a form to verify emails are sent

**Note**: If EmailJS is not configured, the system automatically falls back to mailto links.

## 🔒 **Security Features**

### Password Protection
- Event creation requires secure authentication
- Password is hashed using custom algorithm
- Multiple security layers prevent reverse engineering
- Session tokens for authenticated users

### Authentication Flow
1. User enters password
2. System verifies against hashed values
3. Generates session token on success
4. Allows privileged operations during session

## 🎨 **Design Features**

- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, professional interface
- **Animated Background**: Vanta.js waves effect
- **Gradient Colors**: Consistent branding (#00f2fe to #f1f475)
- **Hover Effects**: Interactive elements throughout
- **Loading States**: Smooth transitions and feedback

## 📱 **Mobile Responsive**

- Hamburger menu for mobile navigation
- Responsive grid layouts
- Touch-friendly buttons and forms
- Optimized images and animations

## 🚀 **Deployment**

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `build` folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 **Contact**

- **Email**: autonomousinitiative@gmail.com
- **Website**: [Your deployed URL]
- **Location**: Innovation Lab, Room 301, University Campus

## 🏆 **Team**

- **Vrishaan Sharma** - Event Captain & Founder
- **Arjun Patel** - Technical Lead
- **Priya Krishnan** - AI Research Head
- **Rohit Gupta** - Hardware & IoT Specialist
- **Sneha Reddy** - UI/UX Designer
- **Karthik Menon** - Data Science Lead
- **Ananya Singh** - Community Manager

---

**Built with ❤️ by the Autonomous Initiative Club**
