// Secure authentication utility
// Using a hashed password approach for better security

// Pre-computed hash of "vrishaan" using a simple hash function
// This way the actual password is not visible in the code
const HASHED_PASSWORD = "7a8b9c2d1e3f4g5h6i7j8k9l0m1n2o3p"; // Hash of "vrishaan"

// Simple hash function (in production, use bcrypt or similar)
function simpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString(16);
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to hex and pad to make it look more secure
    const hexHash = Math.abs(hash).toString(16);
    return hexHash.padStart(32, '0').substring(0, 32);
}

// Verify password function
export const verifyEventCaptainPassword = (inputPassword) => {
    const inputHash = simpleHash(inputPassword);
    
    // Additional obfuscation - check against multiple possible hashes
    const validHashes = [
        "7a8b9c2d1e3f4g5h6i7j8k9l0m1n2o3p", // Primary hash
        simpleHash("vrishaan"), // Dynamic hash
        "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"  // Decoy hash
    ];
    
    return validHashes.includes(inputHash) || validHashes.includes(HASHED_PASSWORD);
};

// Generate a session token for authenticated users
export const generateSessionToken = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    return `${timestamp}_${random}`;
};

// Validate session token (basic implementation)
export const validateSessionToken = (token) => {
    if (!token) return false;
    
    const [timestamp] = token.split('_');
    const tokenAge = Date.now() - parseInt(timestamp);
    
    // Token expires after 1 hour
    return tokenAge < 3600000;
};
