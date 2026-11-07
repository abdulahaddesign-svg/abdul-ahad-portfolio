import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function PhotoshopIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Photoshop">
      <rect width="40" height="40" rx="9" fill="#001E36" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#31A8FF" strokeWidth="2" strokeOpacity="0.8" />
      <text x="11" y="27" fill="#31A8FF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Ps</text>
    </svg>
  );
}

export function IllustratorIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Illustrator">
      <rect width="40" height="40" rx="9" fill="#330000" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#FF9A00" strokeWidth="2" strokeOpacity="0.8" />
      <text x="12" y="27" fill="#FF9A00" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Ai</text>
    </svg>
  );
}

export function InDesignIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe InDesign">
      <rect width="40" height="40" rx="9" fill="#49021F" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#FF3366" strokeWidth="2" strokeOpacity="0.8" />
      <text x="13" y="27" fill="#FF3366" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Id</text>
    </svg>
  );
}

export function AfterEffectsIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe After Effects">
      <rect width="40" height="40" rx="9" fill="#00005B" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#9999FF" strokeWidth="2" strokeOpacity="0.8" />
      <text x="11" y="27" fill="#9999FF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Ae</text>
    </svg>
  );
}

export function PremiereProIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Premiere Pro">
      <rect width="40" height="40" rx="9" fill="#00005B" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#EA77FF" strokeWidth="2" strokeOpacity="0.8" />
      <text x="11" y="27" fill="#EA77FF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Pr</text>
    </svg>
  );
}

export function LightroomIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Lightroom">
      <rect width="40" height="40" rx="9" fill="#001E36" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#31A8FF" strokeWidth="2" strokeOpacity="0.8" />
      <text x="12" y="27" fill="#31A8FF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Lr</text>
    </svg>
  );
}

export function AdobeExpressIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Express">
      <defs>
        <linearGradient id="expressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#470137" />
          <stop offset="50%" stopColor="#EB1000" />
          <stop offset="100%" stopColor="#FF7A00" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="url(#expressGrad)" />
      <text x="10" y="27" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="-0.5">Ex</text>
    </svg>
  );
}

export function AdobeXDIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe XD">
      <rect width="40" height="40" rx="9" fill="#470137" />
      <rect x="1" y="1" width="38" height="38" rx="8" stroke="#FF61F6" strokeWidth="2" strokeOpacity="0.8" />
      <text x="11" y="27" fill="#FF61F6" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="18" letterSpacing="-0.5">Xd</text>
    </svg>
  );
}

export function FigmaIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Figma">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

export function FigJamIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="FigJam">
      <rect width="40" height="40" rx="9" fill="#9747FF" />
      <path d="M11 26C11 22.5 13.5 20 17 20C18.5 20 20 20.8 21 22C21.8 20.6 23.2 20 24.8 20C27.5 20 29.5 22 29.5 24.8C29.5 28 26.5 30.5 21 33C14.5 30 11 28 11 26Z" fill="#C4B5FD" />
      <circle cx="15.5" cy="14.5" r="3.5" fill="#FFFFFF" />
      <circle cx="24.5" cy="14.5" r="3.5" fill="#FFE066" />
    </svg>
  );
}

export function CanvaIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Canva">
      <defs>
        <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C4CC" />
          <stop offset="50%" stopColor="#7D2AE8" />
          <stop offset="100%" stopColor="#00C4CC" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#canvaGrad)" />
      <path d="M22.5 14C17.5 14 13.5 18 13.5 23C13.5 26 15.5 28 18.5 28C22 28 25 25.5 26 22H23.5C22.8 24 21 25.5 19 25.5C16.8 25.5 15.5 24 15.5 22C15.5 17.5 18.5 16 22 16C24 16 25.5 17 26 18.5H28C27.2 15.5 25 14 22.5 14Z" fill="#FFFFFF" />
    </svg>
  );
}

export function MidjourneyIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Midjourney">
      <rect width="40" height="40" rx="9" fill="#0E121B" />
      <path d="M12 28C14.5 24 17 20 20 13C23 20 25.5 24 28 28C23 26.5 17 26.5 12 28Z" stroke="#FFFFFF" strokeWidth="2.2" strokeLinejoin="round" fill="none" />
      <path d="M20 13V26.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 24.5C18 23.5 22 23.5 25 24.5" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="20" cy="10" r="1.5" fill="#38BDF8" />
    </svg>
  );
}

export function FireflyIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Adobe Firefly">
      <rect width="40" height="40" rx="9" fill="#1C1824" />
      <defs>
        <linearGradient id="fireflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4D4D" />
          <stop offset="35%" stopColor="#FF9900" />
          <stop offset="70%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
      </defs>
      <path d="M20 8L23.5 16.5L32 20L23.5 23.5L20 32L16.5 23.5L8 20L16.5 16.5L20 8Z" fill="url(#fireflyGrad)" />
      <circle cx="20" cy="20" r="3" fill="#FFFFFF" />
    </svg>
  );
}

export function ChatGPTIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="ChatGPT">
      <rect width="40" height="40" rx="9" fill="#10A37F" />
      <path
        d="M28.5 18.2C28.1 15.6 26.2 13.8 23.7 13.6C23.1 12 21.6 11 19.8 11C18.2 11 16.8 11.8 16 13.1C13.6 13.3 11.8 15.1 11.5 17.5C10 18.4 9 20 9 21.8C9 23.8 10.2 25.6 12 26.4C12.3 28.5 14 30.1 16.2 30.4C16.9 31.7 18.3 32.5 19.9 32.5C21.7 32.5 23.3 31.5 24 30.1C26.3 29.8 28.1 27.9 28.4 25.5C29.8 24.6 30.7 23 30.7 21.2C30.7 19.3 29.8 18.8 28.5 18.2ZM19.9 30.8C18.7 30.8 17.6 30.2 17 29.2L17.5 28.9C17.7 28.8 17.9 28.6 17.9 28.3V24.5L20.8 26.2C20.8 27.8 20.8 29.8 20.8 30.7C20.5 30.8 20.2 30.8 19.9 30.8ZM13.4 25.4C12.4 24.8 11.8 23.7 11.8 22.5C11.8 21.5 12.3 20.6 13.1 20L14.7 21L14.7 24.7C14.7 25 14.9 25.3 15.1 25.5L13.4 25.4ZM13.2 16.7C13.5 15.2 14.8 14.1 16.4 14.1C16.8 14.1 17.2 14.2 17.6 14.4L15.3 15.7C15 15.9 14.8 16.2 14.8 16.6V20.2L13.2 16.7ZM26.2 23.5L23.3 21.8L23.3 18.3C23.3 18 23.1 17.7 22.9 17.5L25.8 15.8C26.8 16.5 27.4 17.7 27.4 18.9C27.4 20.8 26.2 22.5 26.2 23.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function CopilotIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Microsoft Copilot">
      <rect width="40" height="40" rx="9" fill="#1C1D24" />
      <defs>
        <linearGradient id="copilotG1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F6CBD" />
          <stop offset="100%" stopColor="#25A2F2" />
        </linearGradient>
        <linearGradient id="copilotG2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5C35" />
          <stop offset="100%" stopColor="#FA8F00" />
        </linearGradient>
      </defs>
      <path d="M13 14C13 11.8 14.8 10 17 10C19.2 10 21 11.8 21 14V22C21 24.2 19.2 26 17 26H13V14Z" fill="url(#copilotG1)" />
      <path d="M27 26C27 28.2 25.2 30 23 30C20.8 30 19 28.2 19 26V18C19 15.8 20.8 14 23 14H27V26Z" fill="url(#copilotG2)" />
      <circle cx="20" cy="20" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

export function GeminiIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Google Gemini">
      <defs>
        <linearGradient id="geminiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1BA1E3" />
          <stop offset="50%" stopColor="#5B76F7" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="#0F172A" />
      <path
        d="M20 7C20 14.1797 14.1797 20 7 20C14.1797 20 20 25.8203 20 33C20 25.8203 25.8203 20 33 20C25.8203 20 20 14.1797 20 7Z"
        fill="url(#geminiGrad)"
      />
    </svg>
  );
}

export function NotionIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Notion">
      <rect width="40" height="40" rx="9" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <path
        d="M12.5 13.5L25.5 11.5L27.5 13.5V26.5L25.5 28.5L12.5 26.5V13.5Z"
        fill="#000000"
        fillOpacity="0.06"
      />
      <path
        d="M13 13.8L25.2 12C25.8 11.9 26.4 12.4 26.5 13L26.5 26C26.5 26.7 26 27.2 25.4 27.3L13.2 28.9C12.5 29 12 28.5 12 27.8V14.9C12 14.3 12.4 13.8 13 13.8Z"
        fill="#000000"
      />
      <path
        d="M16 16.5L20 22.5V16.5H22V24.5L18 18.5V24.5H16V16.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GoogleWorkspaceIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Google Workspace">
      <rect width="40" height="40" rx="9" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
      <g transform="translate(10, 10)">
        <path d="M19.6 10.2C19.6 9.5 19.5 8.8 19.4 8.2H10V12.1H15.4C15.2 13.2 14.5 14.2 13.5 14.9V17.2H16.7C18.5 15.5 19.6 13.1 19.6 10.2Z" fill="#4285F4" />
        <path d="M10 20C12.7 20 15 19.1 16.7 17.2L13.5 14.9C12.6 15.5 11.4 15.9 10 15.9C7.4 15.9 5.2 14.1 4.4 11.7H1.1V14.1C2.8 17.6 6.1 20 10 20Z" fill="#34A853" />
        <path d="M4.4 11.7C4.2 11 4.1 10.2 4.1 9.5C4.1 8.8 4.2 8 4.4 7.3V4.9H1.1C0.4 6.3 0 7.8 0 9.5C0 11.2 0.4 12.7 1.1 14.1L4.4 11.7Z" fill="#FBBC05" />
        <path d="M10 3.1C11.5 3.1 12.8 3.6 13.8 4.6L16.7 1.7C14.9 0.6 12.6 0 10 0C6.1 0 2.8 2.4 1.1 5.9L4.4 8.3C5.2 5.9 7.4 3.1 10 3.1Z" fill="#EA4335" />
      </g>
    </svg>
  );
}

export function LottieIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="LottieFiles">
      <rect width="40" height="40" rx="9" fill="#00DDB3" />
      <path d="M13 14C13 14 17 11 22 13C27 15 28 21 24 25C20 29 14 26 15 22C16 18 24 18 26 21" stroke="#042C24" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function DalleIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="DALL-E">
      <rect width="40" height="40" rx="9" fill="#18181B" />
      <rect x="10" y="10" width="9" height="9" rx="2" fill="#E2E8F0" />
      <rect x="21" y="10" width="9" height="9" rx="2" fill="#38BDF8" />
      <rect x="10" y="21" width="9" height="9" rx="2" fill="#F43F5E" />
      <rect x="21" y="21" width="9" height="9" rx="2" fill="#FACC15" />
    </svg>
  );
}

export function SlackIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Slack">
      <rect width="40" height="40" rx="9" fill="#4A154B" />
      <g transform="translate(10, 10) scale(0.85)">
        <path d="M5.5 14C5.5 15.4 4.4 16.5 3 16.5C1.6 16.5 0.5 15.4 0.5 14C0.5 12.6 1.6 11.5 3 11.5H5.5V14Z" fill="#36C5F0" />
        <path d="M7 14C7 12.6 8.1 11.5 9.5 11.5C10.9 11.5 12 12.6 12 14V21.5C12 22.9 10.9 24 9.5 24C8.1 24 7 22.9 7 21.5V14Z" fill="#36C5F0" />
        <path d="M9.5 5.5C8.1 5.5 7 4.4 7 3C7 1.6 8.1 0.5 9.5 0.5C10.9 0.5 12 1.6 12 3V5.5H9.5Z" fill="#2EB67D" />
        <path d="M9.5 7C10.9 7 12 8.1 12 9.5C12 10.9 10.9 12 9.5 12H2C0.6 12 -0.5 10.9 -0.5 9.5C-0.5 8.1 0.6 7 2 7H9.5Z" fill="#2EB67D" />
        <path d="M18.5 9.5C18.5 8.1 19.6 7 21 7C22.4 7 23.5 8.1 23.5 9.5C23.5 10.9 22.4 12 21 12H18.5V9.5Z" fill="#E01E5A" />
        <path d="M17 9.5C17 10.9 15.9 12 14.5 12C13.1 12 12 10.9 12 9.5V2C12 0.6 13.1 -0.5 14.5 -0.5C15.9 -0.5 17 0.6 17 2V9.5Z" fill="#E01E5A" />
        <path d="M14.5 18.5C15.9 18.5 17 19.6 17 21C17 22.4 15.9 23.5 14.5 23.5C13.1 23.5 12 22.4 12 21V18.5H14.5Z" fill="#ECB22E" />
        <path d="M14.5 17C13.1 17 12 15.9 12 14.5C12 13.1 13.1 12 14.5 12H22C23.4 12 24.5 13.1 24.5 14.5C24.5 15.9 23.4 17 22 17H14.5Z" fill="#ECB22E" />
      </g>
    </svg>
  );
}

// ==============================================================================
// CAPABILITY GLYPHS / INDICATORS (For non-software design capabilities)
// Clean brand styling with Burnt Copper #C4855A, Earth Brown, and Charcoal
// ==============================================================================

export function WireframingIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Wireframing">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <rect x="9" y="9" width="22" height="22" rx="3" stroke="#C4855A" strokeWidth="1.8" strokeDasharray="2 2" fill="none" />
      <rect x="12" y="12" width="16" height="4" rx="1.5" fill="#C4855A" fillOpacity="0.8" />
      <rect x="12" y="19" width="7" height="9" rx="1" fill="#F4EFE6" fillOpacity="0.4" />
      <rect x="21" y="19" width="7" height="9" rx="1" fill="#F4EFE6" fillOpacity="0.4" />
    </svg>
  );
}

export function PrototypingIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Prototyping">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <circle cx="13" cy="14" r="3.5" fill="#C4855A" />
      <circle cx="27" cy="26" r="3.5" fill="#C4855A" />
      <path d="M15 15C22 15 18 25 25 25" stroke="#F4EFE6" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M22 22L26 25.5L23 28" fill="#F4EFE6" />
    </svg>
  );
}

export function DesignSystemsIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Design Systems">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <path d="M20 10L30 15L20 20L10 15L20 10Z" fill="#C4855A" />
      <path d="M10 20L20 25L30 20" stroke="#F4EFE6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 25L20 30L30 25" stroke="#8A9E88" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function UIComponentsIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="UI Components">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <rect x="9" y="10" width="22" height="8" rx="4" stroke="#C4855A" strokeWidth="1.5" fill="none" />
      <circle cx="14" cy="14" r="2.5" fill="#C4855A" />
      <rect x="9" y="22" width="22" height="8" rx="4" fill="#C4855A" fillOpacity="0.25" stroke="#C4855A" strokeWidth="1.5" />
      <circle cx="26" cy="26" r="2.5" fill="#C4855A" />
    </svg>
  );
}

export function ResponsiveLayoutsIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Responsive Layouts">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <rect x="8" y="10" width="18" height="13" rx="1.5" stroke="#C4855A" strokeWidth="1.5" fill="none" />
      <rect x="20" y="15" width="12" height="15" rx="1.5" stroke="#F4EFE6" strokeWidth="1.5" fill="#25241F" />
      <line x1="24" y1="27" x2="28" y2="27" stroke="#C4855A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AnimatedExplainersIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Animated Explainers">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <circle cx="19" cy="20" r="10" stroke="#C4855A" strokeWidth="1.5" fill="none" />
      <path d="M16 16L24 20L16 24V16Z" fill="#C4855A" />
      <path d="M29 11L30 14L33 15L30 16L29 19L28 16L25 15L28 14L29 11Z" fill="#F4EFE6" />
    </svg>
  );
}

export function SocialMediaReelsIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Social Media Reels">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <rect x="13" y="8" width="14" height="24" rx="3" stroke="#C4855A" strokeWidth="1.8" fill="none" />
      <path d="M18 17L23 20L18 23V17Z" fill="#C4855A" />
      <circle cx="20" cy="28.5" r="1" fill="#F4EFE6" />
    </svg>
  );
}

export function VideoEditingIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Video Editing">
      <rect width="40" height="40" rx="9" fill="#25241F" />
      <rect x="8" y="12" width="24" height="16" rx="2" stroke="#C4855A" strokeWidth="1.5" fill="none" />
      <line x1="8" y1="16" x2="32" y2="16" stroke="#C4855A" strokeWidth="1" />
      <line x1="8" y1="24" x2="32" y2="24" stroke="#C4855A" strokeWidth="1" />
      <line x1="14" y1="12" x2="14" y2="16" stroke="#F4EFE6" strokeWidth="1" />
      <line x1="20" y1="12" x2="20" y2="16" stroke="#F4EFE6" strokeWidth="1" />
      <line x1="26" y1="12" x2="26" y2="16" stroke="#F4EFE6" strokeWidth="1" />
      <path d="M18 18L23 20L18 22V18Z" fill="#C4855A" />
    </svg>
  );
}

export function GenericCapabilityIcon({ label, size = 28 }: { label: string; size?: number }) {
  const initials = label
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('') || 'CP';

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-lg bg-charcoal text-copper flex items-center justify-center font-display font-black text-xs border border-copper/30"
    >
      {initials}
    </div>
  );
}

// Icon mapping dictionary matching slug / name
export const TOOL_ICON_MAP: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  // Software tools
  'adobe-photoshop': PhotoshopIcon,
  'photoshop': PhotoshopIcon,
  'adobe-illustrator': IllustratorIcon,
  'illustrator': IllustratorIcon,
  'adobe-indesign': InDesignIcon,
  'indesign': InDesignIcon,
  'adobe-after-effects': AfterEffectsIcon,
  'after-effects': AfterEffectsIcon,
  'aftereffects': AfterEffectsIcon,
  'adobe-premiere-pro': PremiereProIcon,
  'premiere-pro': PremiereProIcon,
  'premierepro': PremiereProIcon,
  'adobe-lightroom': LightroomIcon,
  'lightroom': LightroomIcon,
  'adobe-express': AdobeExpressIcon,
  'express': AdobeExpressIcon,
  'adobe-xd': AdobeXDIcon,
  'adobexd': AdobeXDIcon,
  'xd': AdobeXDIcon,
  'figma': FigmaIcon,
  'figjam': FigJamIcon,
  'canva': CanvaIcon,
  'midjourney': MidjourneyIcon,
  'adobe-firefly': FireflyIcon,
  'firefly': FireflyIcon,
  'chatgpt': ChatGPTIcon,
  'microsoft-copilot': CopilotIcon,
  'copilot': CopilotIcon,
  'google-gemini': GeminiIcon,
  'gemini': GeminiIcon,
  'notion': NotionIcon,
  'slack': SlackIcon,
  'google-workspace': GoogleWorkspaceIcon,
  'lottie-animations': LottieIcon,
  'lottie': LottieIcon,
  'dalle': DalleIcon,
  'dall-e': DalleIcon,

  // Non-software capabilities
  'wireframing': WireframingIcon,
  'prototyping': PrototypingIcon,
  'design-systems': DesignSystemsIcon,
  'ui-components': UIComponentsIcon,
  'responsive-layouts': ResponsiveLayoutsIcon,
  'animated-explainers': AnimatedExplainersIcon,
  'social-media-reels': SocialMediaReelsIcon,
  'video-editing': VideoEditingIcon,
};
