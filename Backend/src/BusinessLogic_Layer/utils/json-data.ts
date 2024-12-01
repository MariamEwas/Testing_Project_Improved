//   // Adaptee: Handles the JSON data
  class JSONData {
    private data: any;
  
    constructor(data: any) {
      this.data = data;
    }
  
    getJSON(): any {
      return this.data;
    }
  }
  

export default JSONData;  