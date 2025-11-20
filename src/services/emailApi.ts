
const API_BASE_URL = 'https://product-server-uete.onrender.com/api';

export const emailApi = {
  sendContactForm: async (formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    inquiryType: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/email/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send contact form');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  },

  subscribeNewsletter: async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/email/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe to newsletter');
      }

      return await response.json();
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },
};
