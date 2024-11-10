If you are using macOS
To start the application, navigate to root directory i.e; fitness_tracker and then run the following command: 
`bash run.sh`

If OS is windows: navigate to `cd front-end/` and run the following command: 
`npm start & node ../back-end/components/backend.js`

In order to run the automation scripts for Safari browser:
navigate to `cd Automation/` folder and run the following commands:
`javac -cp "../selenium-java-4.26.0/*" AutomateTestSafari.java` and then
`java -cp "../selenium-java-4.26.0/*" AutomateTestSafari.java`
**OR**
In order to run the automation scripts for Chrome browser:
navigate to `cd Automation/` folder and run the following commands:
`javac -cp "../selenium-java-4.26.0/*" AutomateTestChrome.java`
`java -cp "../selenium-java-4.26.0/*" AutomateTestChrome.java`
