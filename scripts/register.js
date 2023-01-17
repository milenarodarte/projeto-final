const body = document.querySelector("body");

function windowSize() {
  if (window.innerWidth >= 500) {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `  <header class="header-home-desktop">
            
      <img class="logo" src="/assets/logo.svg" alt="logo da pagina">
      <div class="buttons-page-header-desktop">
          <button class="button-white-blue" id="button-register-home">Home</button>
          <button class="button-blue" id="button-register-logIn">logIn</button>
      </div>
      
  </header>
  <main class="main-register-desktop">
    <div class="modal-main-register-desktop">
          <h1 class="h1-register-desktop">Cadastre-se</h1>
          <form class="form-register-desktop" id="form-register-mobile">
              <input type="text" class="input-desktop" id="user" placeholder="Seu nome">
              <input type="email" class="input-desktop " id="email" placeholder="Seu e-mail">
              <input type="password" class="input-desktop " id="password" placeholder="Sua senha">
              <input list="nivel-profissional" class="input-desktop " id="level" placeholder="Nível profissional">
              <datalist id="nivel-profissional">
                  <option value="estágio">estágio</option>
                  <option value="júnior">júnior</option>
                  <option value="pleno">pleno</option>
                  <option value="sênior">sênior</option>
              </datalist>
              <button type="button" id="button-register-cadastrar" class="button-blue button-desktop ">Cadastre-se</button>
              <button type="button" id="button-register-retornar"  class="button-white-blue button-desktop">Retornar</button>
          </form>
    </div>
  </main>
                `
    );
    eventoRedirecionadorDePagina();
  } else {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container-regiter-mobile">
      <header class="header-mobile">
          <div class="div-sanduiche-mobile">
              <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
              <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
          </div>
          <div class="div-drop-down-header-home ">
    
          <button class="button-white-blue" id="button-register-home">Home</button>
          <button class="button-blue" id="button-register-logIn">Login</button>
      </div>
          
      </header>
      <main class="main-register-mobile">
          <div class="modal-register-mobile">
              <h1 class="h1-register-mobile">Cadastre-se</h1>
              <form class="form-register" id="form-register-mobile">
              <input type="text" class="input-desktop mobile" id="user" placeholder="Seu nome">
              <input type="email" class="input-desktop mobile" id="email" placeholder="Seu e-mail">
              <input type="password" class="input-desktop mobile" id="password" placeholder="Sua senha">
              <input list="nivel-profissional" class="input-desktop mobile" id="level" placeholder="Nível profissional">
                  <datalist id="nivel-profissional">
                  <option value="estágio">estágio</option>
                  <option value="júnior">júnior</option>
                  <option value="pleno">pleno</option>
                  <option value="sênior">sênior</option>
                  </datalist>
                  <button type="button" id="button-register-cadastrar" class="button-blue mobile">Cadastre-se</button>
                  <button type="button" id="button-register-retornar" class="button-white-blue mobile">Retornar</button>
                 
              </form>
          </div>
      </main>
    </div>
            `
    );
    eventoRedirecionadorDePagina();
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 500) {
      body.innerHTML = "";
      body.insertAdjacentHTML(
        "beforeend",
        `  <header class="header-home-desktop">
            
        <img class="logo" src="/assets/logo.svg" alt="logo da pagina">
        <div class="buttons-page-header-desktop">
            <button class="button-white-blue" id="button-register-home">Home</button>
            <button class="button-blue" id="button-register-logIn">logIn</button>
        </div>
            
        
    </header>
    <main class="main-register-desktop">
      <div class="modal-main-register-desktop">
            <h1 class="h1-register-desktop">Cadastre-se</h1>
            <form class="form-register-desktop" id="form-register-mobile">
            <input type="text" class="input-desktop" id="user" placeholder="Seu nome">
            <input type="email" class="input-desktop" id="email" placeholder="Seu e-mail">
            <input type="password" class="input-desktop" id="password" placeholder="Sua senha">
            <input list="nivel-profissional" class="input-desktop" id="level" placeholder="Nível profissional">
                <datalist id="nivel-profissional">
                <option value="estágio">estágio</option>
                <option value="júnior">júnior</option>
                <option value="pleno">pleno</option>
                <option value="sênior">sênior</option>
                </datalist>
                <button type="button" id="button-register-cadastrar" class="button-blue button-desktop desktop">Cadastre-se</button>
                <button type="button" id="button-register-retornar" class="button-white-blue button-desktop desktop">Retornar</button>
            </form>
      </div>
    </main>
                  `
      );
      eventoRedirecionadorDePagina();
    } else {
      body.innerHTML = "";
      body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="container-regiter-mobile">
        <header class="header-mobile">
            <div class="div-sanduiche-mobile">
                <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
                <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
            </div>
            <div class="div-drop-down-header-home ">
    
            <button class="button-white-blue" id="button-register-home">Home</button>
            <button class="button-blue" id="button-register-logIn">Login</button>
      </div>
            
        </header>
        <main class="main-register-mobile">
            <div class="modal-register-mobile">
                <h1 class="h1-register-mobile">Cadastre-se</h1>
                <form class="form-register" id="form-register-mobile">
                <input type="text" class="input-desktop mobile" id="user" placeholder="Seu nome">
                <input type="email" class="input-desktop mobile" id="email" placeholder="Seu e-mail">
                <input type="password" class="input-desktop mobile" id="password" placeholder="Sua senha">
                <input list="nivel-profissional" class="input-desktop mobile" id="level" placeholder="Nível profissional">
                    <datalist id="nivel-profissional">
                    <option value="estágio">estágio</option>
                    <option value="júnior">júnior</option>
                    <option value="pleno">pleno</option>
                    <option value="sênior">sênior</option>
                    </datalist>
                    <button type="button" id="button-register-cadastrar" class="button-blue mobile">Cadastre-se</button>
                    <button type="button" id="button-register-retornar" class="button-white-blue mobile">Retornar</button>
                   
                </form>
            </div>
        </main>
      </div>
              `
      );
      eventoRedirecionadorDePagina();
    }
  });
}
windowSize();
function eventoRedirecionadorDePagina() {
  const botaoLogin = document.querySelector("#button-register-logIn");

  const botaoHome = document.querySelector("#button-register-home");
  const botaoRetornar = document.querySelector("#button-register-retornar");
  botaoLogin.addEventListener("click", function () {
    window.location.href = "/pages/login.html";
  });
  botaoHome.addEventListener("click", function () {
    window.location.href = "/index.html";
  });
  botaoRetornar.addEventListener("click", function () {
    window.location.href = "/pages/login.html";
  });
}
setTimeout(eventoRedirecionadorDePagina(), 2000);

async function cadastrarUsuarioNaAPI() {
  const buttonRegister = document.querySelector("#button-register-cadastrar");
  buttonRegister.addEventListener("click", async function () {
    const user = document.querySelector("#user");
    const userValue = user.value;
    const email = document.querySelector("#email");
    const emailValue = email.value;
    const password = document.querySelector("#password");
    const passwordValue = password.value;
    const professionalLevel = document.querySelector("#level");
    const professionalLevelValue = professionalLevel.value;
    if (
      userValue.length > 0 &&
      emailValue.length > 0 &&
      passwordValue.length > 0 &&
      professionalLevelValue.length > 0
    ) {
      const data = {
        username: `${userValue}`,
        password: `${passwordValue}`,
        email: `${emailValue}`,
        professional_level: `${professionalLevelValue}`,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const resJson = await fetch(
        "http://localhost:6278/auth/register",
        options
      );
      const response = await resJson.json();

      if (resJson.status == 201) {
        window.location.href = "/pages/login.html";
      } else {
  
      }
    }
  });
}
cadastrarUsuarioNaAPI();
function abrirSeletorMobile() {
  if (window.innerWidth <= 500) {
    const tresBarrinhas = document.querySelector("#menu-home-page");
    tresBarrinhas.addEventListener("click", function () {
      const divDrop = document.querySelector(".div-drop-down-header-home");

      divDrop.classList.toggle("flex");
    });
  }
}
setTimeout(abrirSeletorMobile(), 2000);
