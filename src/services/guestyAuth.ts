const GUESTY_CLIENT_ID = '0oao0nruuepjNHNZL5d7';
const GUESTY_CLIENT_SECRET = 'r3x4sJ7n5MvuYVsdEXissBIqr6nwNRe6gEqWkrO65ZzJjwE5wXNky1M8Yuj5MJ64';
const GUESTY_AUTH_URL = 'https://booking.guesty.com/oauth2/token';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

class GuestyAuth {
  private accessToken: string | null = null;
  private tokenExpiry: number | null = null;

  async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    await this.refreshToken();
    return this.accessToken!;
  }

  private async refreshToken(): Promise<void> {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('scope', 'booking_engine:api');
      formData.append('client_secret', GUESTY_CLIENT_SECRET);
      formData.append('client_id', GUESTY_CLIENT_ID);
      
      const response = await fetch(GUESTY_AUTH_URL, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'cache-control': 'no-cache, no-cache',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: TokenResponse = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;
    } catch (error) {
      console.error('Failed to authenticate with Guesty:', error);
      throw error;
    }
  }

  clearToken(): void {
    this.accessToken = null;
    this.tokenExpiry = null;
  }
}

export const guestyAuth = new GuestyAuth();
