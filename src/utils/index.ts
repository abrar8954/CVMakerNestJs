import * as fs from 'fs'
import * as path from 'path'
export const getTemplateByName = (name:string) => {
    // read all files from ./src/templates folder 
    // and return the one with the name
    const files = fs.readFileSync('./src/templates', 'utf-8')
    console.log(files,'files')
}

export  function readTemplates() {
    const dummyDetails = {
        name: 'John Doe',
        age: '30',
        address: '123 Main St, New York, NY 10030',
    }
    const directoryPath = path.join(__dirname, 'src', 'templates/html');
    try {
      const fileNames = fs.readdirSync(directoryPath);
  
      const templates = fileNames.map((fileName) => {
        const filePath = path.join(directoryPath, fileName);
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        Object.keys(dummyDetails).forEach((key) => {
            fileContent = fileContent.replace(`{${key}}`, dummyDetails[key]);
            // create a new file with the name of the template in screenshot folder
            // and replace the dummy details with the actual details
            // and save the file
            fs.writeFileSync(`./src/templates/screenshots/${fileName}`, fileContent);
            });
        

        return { fileName, content: fileContent };
      });
  
      return templates;
    } catch (error) {
      console.error('Error reading templates:', error);
      return [];
    }
  }
  
export interface CVInterface  {
    name: string,
    age : string,
    address : string,

}