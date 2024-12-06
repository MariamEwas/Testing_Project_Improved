import { set } from "mongoose";

class BlacklistedTokens {
  private static instance: BlacklistedTokens; // Static instance of the class
  private tokens: Set<string>;

  // Private constructor to prevent direct instantiation
  private constructor() {
    this.tokens = new Set<string>();
  }

  // Public method to get the single instance of the class
  public static getInstance(): BlacklistedTokens {
    if (!BlacklistedTokens.instance) {
      BlacklistedTokens.instance = new BlacklistedTokens();
    }
    return BlacklistedTokens.instance;
  }

  // Add token to blacklist
  public blacklistToken(token: string): void {
    this.tokens.add(token);
  }

  // Check if token is blacklisted
  public isTokenBlacklisted(token: string): boolean {
    return this.tokens.has(token);
  }

 // Clear tokens after a certain time (e.g., for memory efficiency)
  public clearExpiredTokens(): void {
    this.tokens.clear(); // Example cleanup action
  }
}

export default BlacklistedTokens;
