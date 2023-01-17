const body = document.querySelector("body");
function windowSize() {
  if (window.innerWidth >= 500) {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container-home-page-desktop">
      <header class="header-home-desktop">
          <img class="logo" src="/assets/logo.svg">
          <div class="buttons-page-header-desktop">
              <button class="button-white-blue" type="button" id="button-home-logIn">logIn</button>
              <button class="button-blue" type="button" id="button-home-cadastro">Cadastro</button>
          </div>
      </header>
      <main class="main-home-page-desktop">
          <img src="/assets/imgHome.svg" class="img-home-page">
          <div class="main-right">
              <p class="selecionar-setor-home-page">Selecionar setor <img class="seta-para-baixo" src="/assets/setaparabaixo.svg"></p>
              <div class="cards-home-page-desktop" >
              </div>
          </div>
      </main>
  </div>
              `
    );
  } else {
    body.innerHTML = "";
    body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container-home-page">
      <header class="header-mobile">
          <div class="div-sanduiche-mobile">
              <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
              <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
          </div>
          <div class="div-drop-down-header-home">
  
              <button type="button" class="button-white-blue" id="button-home-logIn">logIn</button>
              <button type="button" class="button-blue" id="button-home-cadastro">Cadastro</button>
          </div>
      </header>
     
      <div class="cards-home-page-mobile">
          <button type="button" class="button-blue" id="button-home-page-selecionar-setor">Selecionar setor <img class="seta-para-baixo" id="seta-selecionar-setor" src="/assets/setaparabaixo.svg"></button>
         <div class="container-card-mobile">
              <div class="card-home-page-mobile">
                  <h2 class="empresa-nome-home-page">Empresa</h2>
                  <p class="empresa-horas-home-page">10 horas</p>
                  <p class="setor-empresa-home-page">Setor</p>
              </div>
             
         </div>
         
      </div>
  
      </div>
          `
    );
  }
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 500) {

      body.innerHTML = "";
      body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="container-home-page-desktop">
        <header class="header-home-desktop">
            <img class="logo" src="/assets/logo.svg">
            <div class="buttons-page-header-desktop">
                <button class="button-white-blue" type="button" id="button-home-logIn">logIn</button>
                <button class="button-blue" type="button" id="button-home-cadastro">Cadastro</button>
            </div>
        </header>
        <main class="main-home-page-desktop">
            <img src="/assets/imgHome.svg" class="img-home-page">
            <div class="main-right">
                <p class="selecionar-setor-home-page">Selecionar setor <img class="seta-para-baixo" src="/assets/setaparabaixo.svg"></p>
                <div class="cards-home-page-desktop" >

                </div>
            </div>
        </main>
    </div>
              
                `
      );
      retornarERenderizarTodasAsEmpresas();
    } else {
      body.innerHTML = "";
      body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="container-home-page">
        <header class="header-mobile">
            <div class="div-sanduiche-mobile">
                <img class="logo-home-page" src="/assets/logo.svg" alt="logo da pagina">
                <img src="/assets/3barrinhas.svg" class="menu" id="menu-home-page" alt="menu home page">
            </div>
            <div class="div-drop-down-header-home">
    
                <button type="button" class="button-white-blue" id="button-home-logIn">logIn</button>
                <button type="button" class="button-blue" id="button-home-cadastro">Cadastro</button>
            </div>
        </header>
       
        <div class="cards-home-page-mobile">
            <button type="button" class="button-blue" id="button-home-page-selecionar-setor">Selecionar setor <img class="seta-para-baixo" id="seta-selecionar-setor" src="/assets/setaparabaixo.svg"></button>
           <div class="container-card-mobile">
                <div class="card-home-page-mobile">
                    <h2 class="empresa-nome-home-page">Empresa</h2>
                    <p class="empresa-horas-home-page">10 horas</p>
                    <p class="setor-empresa-home-page">Setor</p>
                </div>
               
           </div>
           
        </div>
    
        </div>
            `
      );
      retornarERenderizarTodasAsEmpresas();
    }
  });
}
windowSize();
async function eventoRedirecionadorDePagina() {
  const empresas = await fetch("http://localhost:6278/companies");
  const botaoCadastro = document.querySelector("#button-home-cadastro");
  const botaoLogin = document.querySelector("#button-home-logIn");

  botaoCadastro.addEventListener("click", function () {
    window.location.href = "/pages/register.html";
  });
  botaoLogin.addEventListener("click", function () {
    window.location.href = "/pages/login.html";
  });
}
eventoRedirecionadorDePagina();
async function retornarERenderizarTodasAsEmpresas() {
  const empresas = await fetch("http://localhost:6278/companies");
  const empresasJson = await empresas.json();

  const divCards = document.querySelector(".cards-home-page-desktop");
  const seta = document.querySelector(".seta-para-baixo");

  seta.addEventListener("click", function () {
    if (window.innerWidth >= 500) {
      divCards.innerHTML = "";

      empresasJson.forEach((empresa) => {
        divCards.insertAdjacentHTML(
          "beforeend",
          `
    <div class="card-home-page-desktop">
      <h2 class="card-nome-empresa">${empresa.name}</h2>
      <p class="card-horas-empresa">${empresa.opening_hours}</p>
      <p class="card-setor-empresa"">${empresa.sectors.description}</p>
    </div>
    `
        );
        document.addEventListener("click", function (e) {
          const el = e.target;
          if (el.classList == "card-setor-empresa") {
            const empresaFiltrada = empresasJson.filter(
              (objeto) => objeto.sectors.description == el.innerText
            );
            divCards.innerHTML = "";
            empresaFiltrada.forEach((empresa) => {
              divCards.insertAdjacentHTML(
                "beforeend",
                `
          <div class="card-home-page-desktop">
            <h2 class="card-nome-empresa">${empresa.name}</h2>
            <p class="card-horas-empresa">${empresa.opening_hours}</p>
            <p class="card-setor-empresa">${empresa.sectors.description}</p>
          </div>
          `
              );
            });
          }
        });
      });
    } else {
      const divCardsMobile = document.querySelector(".container-card-mobile");
      divCardsMobile.innerHTML = "";
      empresasJson.forEach((empresa) => {
        divCardsMobile.insertAdjacentHTML(
          "beforeend",
          `
          <div class="card-home-page-mobile">
            <h2 class="empresa-nome-home-page">${empresa.name}</h2>
            <p class="empresa-horas-home-page">${empresa.opening_hours}</p>
            <p class="setor-empresa-home-page">${empresa.sectors.description}</p>
          </div>
          `
        );
        document.addEventListener("click", function (e) {
          const el = e.target;
          if (el.classList == "setor-empresa-home-page") {
            const empresaFiltradaMobile = empresasJson.filter(
              (objeto) => objeto.sectors.description == el.innerText
            );
            divCardsMobile.innerHTML = "";
            empresaFiltradaMobile.forEach((empresa) => {
              divCardsMobile.insertAdjacentHTML(
                "beforeend",
                `
              <div class="card-home-page-mobile">
              <h2 class="empresa-nome-home-page">${empresa.name}</h2>
              <p class="empresa-horas-home-page">${empresa.opening_hours}</p>
              <p class="setor-empresa-home-page">${empresa.sectors.description}</p>
              </div>
              `
              );
            });
          }
        });
      });
    }
  });
}
retornarERenderizarTodasAsEmpresas();

function abrirSeletorMobile() {
  if (window.innerWidth <= 500) {
    const tresBarrinhas = document.querySelector("#menu-home-page");

    tresBarrinhas.addEventListener("click", function () {
      const divDrop = document.querySelector(".div-drop-down-header-home");
      divDrop.classList.toggle("flex");
    });
  }
}
setTimeout(abrirSeletorMobile(), 3000);
