
// Singleton Pattern for Database Service
class DatabaseService {
  private static instance: DatabaseService;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Repository Pattern
  public saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}

export default DatabaseService.getInstance();
