# Reddit Subviewer

---

## Notes

I worked on this project for about 10 hours on the weekend. I found it both fun and challenging at the same time. About half of my time was spent trying to figure out how to get the information that I needed out of the reddit json API. I didn't write any unit or e2e test. I understand their importance but instead chose to focus on delivering a functional app that I tested and debug using the chrome dev tools.

A little more about testing, I typically write unit tests for isolated functionality like code inside the util class. I would use the redux saga tester for my sagas and write e2e for the Container and Presentation components and run them in Cypress. I typically pepper my html with data-\* custom attribute. An npm test script would typically be tied to a git hook.


## Run
This is based on create-react-app.  Use npm start to run!  Webpack config not ejected, and was not built for production.  
