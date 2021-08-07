

const authController = {

  getLogin(req, res) {
      let getCookie = req.get("Cookie");
      const isLoggedIn = getCookie.replace("loggedIn=","");
      console.log(isLoggedIn);
      
    res.render("auth/login", {
      docTitle: "Login",
      path: "/login",
      isAuthenticated: isLoggedIn
    });
  },
  postLogin(req, res){
      //Create cookie- name        , value
      res.setHeader("Set-Cookie", "loggedIn=true")
      res.redirect("/")
  }
};

export default authController