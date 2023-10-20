// const fetch = require("node-fetch");
import fetch from "node-fetch";

export default function routes(app, addon) {
  // Redirect root path to /atlassian-connect.json,
  // which will be served by atlassian-connect-express.
  app.get("/", (req, res) => {
    res.redirect("/atlassian-connect.json");
  });

  // This is an example route used by "generalPages" module (see atlassian-connect.json).
  // Verify that the incoming request is authenticated with Atlassian Connect.
  app.get("/hello-world", addon.authenticate(), (req, res) => {
    // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
    // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
    res.render(
      "hello-world.hbs", // change this to 'hello-world.jsx' to use the Atlaskit & React version
      {
        title: "Atlassian Connect",
        //, issueId: req.query['issueId']
        //, browserOnly: true // you can set this to disable server-side rendering for react views
      }
    );
  });

  // Add additional route handlers here...
  app.get("/dog", addon.authenticate(), async (req, res) => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    if (!response.ok) {
      const textContent = response.text();
      console.log(`error while getting random dog picture: ${textContent}`);
    }

    const title = "Random dog";
    const jsonContent = await response.json();
    const imageUrl = jsonContent.message;
    res.render("dog.jsx", { title, imageUrl, browserOnly: true });
  });
}
