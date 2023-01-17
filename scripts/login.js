const body = document.querySelector("body");
function windowSize() {
  if (window.innerWidth >= 500) {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container-desktop">
        <header class="header-home-desktop">
            
            <img class="logo" src="/assets/logo.svg" alt="logo da pagina">
            <div class="buttons-header-desktop">
                <button type="button" class="button-white-blue" id="button-login-home">Home</button>
                <button type="button" class="button-blue" id="button-login-cadastro">Cadastro</button>
            </div>
                
            
        </header>
      
       <main class="main-desktop">
          <div class="modal-login-desktop">
                <h1 class="h1-desktop">Login</h1>

                <p class="p-login">Preencha os campos para realizar login</p>
                
                <form class="form-login-desktop">
                    <input type="email" class="input-desktop" id="email" placeholder="Seu e-maail">
                    <input type="password" class="input-desktop" id="password" placeholder="sua senha">
                    <button type="button" class="button-blue desktop" id="button-login">Login</button>
                    <p class="p-ou"> ou</p>
                    <button type="button" class="button-white-blue desktop" id="button-cadastro-login">Cadastre-se</button>
        
                </form>
          </div>
        </main>
    </div>
              `
    );
    eventoRedirecionadorDePagina();
  } else {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container-mobile">
      <header class="header-mobile">
          <div class="div-sanduiche-mobile">
              <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
              <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
          </div>
          <div class="div-drop-down-header-home">
    
          <button type="button" class="button-white-blue" id="button-login-home">Home</button>
          <button type="button" class="button-blue" id="button-login-cadastro">Cadastro</button>
      </div>
          
      </header>
      <main class="main-login-mobile">
          <div class="modal-login-mobile">
              <h1 class="h1-login-mobile">Login</h1>
              <p class="p-login">Preencha os campos para realizar login</p>
              <form class="form-login-mobile">
                  <input type="email" class="input-mobile" id="email" placeholder="Seu e-maail">
                  <input type="password" class="input-mobile" id="password" placeholder="sua senha">
                  <button type="button" class="button-blue larger" id="button-login">Login</button>
                  <p class="p-ou"> ou</p>
                  <button type="button" class="button-white-blue  larger" id="button-cadastro-login">Cadastre-se</button>
      
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
        `
        <div class="container-desktop">
        <header class="header-home-desktop">
            
            <img class="logo" src="/assets/logo.svg" alt="logo da pagina">
            <div class="buttons-header-desktop">
                <button type="button" class="button-white-blue" id="button-login-home">Home</button>
                <button type="button" class="button-blue" id="button-login-cadastro">Cadastro</button>
            </div>
                
            
        </header>
      
       <main class="main-desktop">
          <div class="modal-login-desktop">
                <h1 class="h1-desktop">Login</h1>

                <p class="p-login">Preencha os campos para realizar login</p>
                
                <form class="form-login-desktop">
                    <input type="email" class="input-desktop" id="email" placeholder="Seu e-maail">
                    <input type="password" class="input-desktop" id="password" placeholder="sua senha">
                    <button type="button" class="button-blue desktop" id="button-login">Login</button>
                    <p class="p-ou"> ou</p>
                    <button type="button" class="button-white-blue desktop" id="button-cadastro-login">Cadastre-se</button>
        
                </form>
          </div>
        </main>
    </div>
                `
      );
      eventoRedirecionadorDePagina();
    } else {
      body.innerHTML = "";
      body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="container-mobile">
        <header class="header-mobile">
            <div class="div-sanduiche-mobile">
                <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
                <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
            </div>
            <div class="div-drop-down-header-home">
    
            <button type="button" class="button-white-blue" id="button-login-home">Home</button>
            <button type="button" class="button-blue" id="button-login-cadastro">Cadastro</button>
            </div>
            
        </header>
        <main class="main-login-mobile">
            <div class="modal-login-mobile">
                <h1 class="h1-login-mobile">Login</h1>
                <p class="p-login">Preencha os campos para realizar login</p>
                <form class="form-login-mobile">
                    <input type="email" class="input-mobile" id="email" placeholder="Seu e-maail">
                    <input type="password" class="input-mobile" id="password" placeholder="sua senha">
                    <button type="button" class="button-blue larger" id="button-login">Login</button>
                    <p class="p-ou"> ou</p>
                    <button type="button" class="button-white-blue larger" id="button-cadastro-login">Cadastre-se</button>
        
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
  const botaoCadastro = document.querySelector("#button-login-cadastro");
  const botaoHome = document.querySelector("#button-login-home");
  const botaoIrCadastro = document.querySelector("#button-cadastro-login");
  botaoCadastro.addEventListener("click", function () {
    window.location.href = "/pages/register.html";
  });
  botaoHome.addEventListener("click", function () {
    window.location.href = "/index.html";
  });
  botaoIrCadastro.addEventListener("click", function () {
    window.location.href = "/pages/register.html";
  });
  const botaoLogin = document.querySelector("#button-login");
  botaoLogin.addEventListener("click", function () {

    retornarToken();
  });
}

async function retornarToken() {
  const email = document.querySelector("#email");
  const emailValue = email.value;

  const password = document.querySelector("#password");
  const passwordValue = password.value;
  const data = {
    email: `${emailValue}`,
    password: `${passwordValue}`,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const resJson = await fetch("http://localhost:6278/auth/login", options);
  const res = await resJson.json();
  const resToken = res.token;

  if (resToken != undefined) {
    const tokenJSON = JSON.stringify(resToken);
    localStorage.setItem("token", tokenJSON);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resToken}`,
      },
    };

    const verificarAdm = await fetch(
      "http://localhost:6278/auth/validate_user",
      options
    );
    const verificarAdmJson = await verificarAdm.json();
    const isAdmin = JSON.stringify(verificarAdmJson.is_admin);

    if (isAdmin == "false") {

      window.location.href = "/pages/user.html";
    } else {

      window.location.href = "/pages/admPage.html";
    }
  }
}
async function abrirSeletorMobile() {
  if (window.innerWidth <= 500) {
    const empresas = await fetch("http://localhost:6278/companies");
    const tresBarrinhas = document.querySelector("#menu-home-page");
    tresBarrinhas.addEventListener("click", function () {
      const divDrop = document.querySelector(".div-drop-down-header-home");
      divDrop.classList.toggle("flex");
    });
  }
}
abrirSeletorMobile();
