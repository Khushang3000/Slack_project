import "../styles/auth.css"
import { SignInButton } from '@clerk/clerk-react'

const AuthPage = () => {
  return (
    <div className="auth-container">
        <div className="auth-left">
            <div className="auth-hero">
                <div className="brand-container">
                    {/* src from public folder. */}
                    <img src="/logo.png" alt="slap" className="brand-logo"/>
                    <span className="brand-name">Slap</span>
                </div>
                <h1 className="hero-title">
                    Where Work Happens ✨
                    {/* can copy the emoji from emojipedia */}
                </h1>
                <p className="hero-subtitle">
                    Connect with your team instantly through secure, real-time messaging. Experience
                    seamless collaboration with powerful features designed for modern teams.
                </p>
                <div className="features-list">
                    <div className="feature-item">
                        <span className='feature-icon'>💬</span>
                        <span>Real Time Messaging</span>
                    </div>
                    <div className="feature-item">
                        <span className='feature-icon'>📹</span>
                        <span>Video Calls and Meetings</span>
                    </div><div className="feature-item">
                        <span className='feature-icon'>🔒</span>
                        <span>Secure and private</span>
                    </div>
                </div>

                <SignInButton mode="modal">
                    {/* to override clerk's signinButton we can just give our own button below. */}
                    <button className="cta-button">
                        Get Started with Slap
                        <span className="btn-arrow">→</span>
                    </button>
                </SignInButton>
            </div>
        </div>
        <div className="auth-right">
            <div className="auth-image-container">
                <img src="/auth-i.png" alt="Team Collaboration" className="auth-image" />
                <div className="image-overlay"></div>
            </div>
        </div>
    </div>
  )
}//now go to index.css to get rid of the margins.

export default AuthPage