
// This service mimics a database using localStorage for demo purposes
class DatabaseService {
  public getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  public saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export default new DatabaseService();
