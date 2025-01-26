export class EmailGenerator {
    private baseEmail: string;

    constructor(baseEmail: string) {
      this.baseEmail = baseEmail;
    }
  
    generatePlusVariations() {
      const [username, domain] = this.baseEmail.split("@");
      const randomString = Math.random().toString(36).substring(2, 8);
      return `${username}+${randomString}@${domain}`;
    }
  
    generateRandomVariation() {
      return this.generatePlusVariations();
    }
  }

