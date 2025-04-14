export const cleanPhoneNumber = (phone) => {
    // Remove anything like "p:", "+", spaces, dashes etc., and keep only digits
    const cleaned = phone.replace(/[^0-9]/g, '');
  
    // If it starts with '91' (India country code), remove it
    return cleaned.startsWith('91') ? cleaned.slice(2) : cleaned;
  };