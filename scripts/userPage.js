eventoRedirecionadorDePagina();
function pegarTokenDoLocalStorage() {
  const tokenlocal = localStorage.getItem("token");
  const token = JSON.parse(tokenlocal);
  return token;
}
async function conferirToken() {
  const token = pegarTokenDoLocalStorage();
  if (token == null) {
    window.location.href = "/index.html";
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const verificarAdm = await fetch(
    "http://localhost:6278/auth/validate_user",
    options
  );
  const verificarAdmJson = await verificarAdm.json();
  const isAdmin = JSON.stringify(verificarAdmJson.is_admin);


  if (isAdmin == "true") {
    window.location.href = "/index.html";
  }
}
conferirToken();
function eventoRedirecionadorDePagina() {
  const botaoLogOut = document.querySelector("#logout-user-page");

  botaoLogOut.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "/index.html";
  });
}

async function renderizarInformacoesDoFuncionario() {
  const token = pegarTokenDoLocalStorage();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const informacoes = await fetch(
    "http://localhost:6278/users/profile",
    options
  );
  const informacoesJson = await informacoes.json();
  const subheaderUser = document.querySelector("#subheader-user");
 

  if (
    informacoesJson.kind_of_work == null &&
    informacoesJson.professional_level == null
  ) {
  
    subheaderUser.insertAdjacentHTML( 
      "beforeend",
      `
      <h2 class="username" >${informacoesJson.username}</h2>
      <div class="div-dados-subheader">
          <p class="dados-subheader">${informacoesJson.email}</p>
      </div>
    
    `
    );
  } else if (informacoesJson.kind_of_work == null) {
    
    subheaderUser.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="username" >${informacoesJson.username}</h2>
    <div class="div-dados-subheader">
        <p class="dados-subheader">${informacoesJson.email}</p>
        <p class="dados-subheader">${informacoesJson.professional_level}</p>
    </div>
  
  `
    );
  } else if (informacoesJson.professional_level == null) {
    
    subheaderUser.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="username" >${informacoesJson.username}</h2>
    <div class="div-dados-subheader">
        <p class="dados-subheader">${informacoesJson.email}</p>
        <p class="dados-subheader">${informacoesJson.kind_of_work}</p>
    </div> `
    );
  } else {
   
    subheaderUser.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="username" >${informacoesJson.username}</h2>
    <div class="div-dados-subheader">
        <p class="dados-subheader">${informacoesJson.email}</p>
        <p class="dados-subheader">${informacoesJson.professional_level}</p>
        <p class="dados-subheader">${informacoesJson.kind_of_work}</p>
    </div> `
    );
  }
  const container = document.querySelector(".container-desktop");
  const h2 = document.querySelector(".h2-company-name");
  const userPage = document.querySelector(".div-user-page");
  const divSemCadastro = document.querySelector(".div-sem-cadastro");

  const optionsDepartamentos = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  



  if (informacoesJson.department_uuid == null || informacoesJson.department_uuid == undefined) {
    


  
    container.insertAdjacentHTML(
      "beforeend",
      `
    <div class="div-sem-cadastro">
    <h2 class="h2-sem-cadastro">Você ainda não foi contratado</h2>
    </div>
    `
    );
  } else {
    const resposta = await fetch ('http://localhost:6278/users/departments', optionsDepartamentos)
  
  
  const departamentos = await resposta.json()

  const todosDepartamentos = departamentos.departments

  const departamentoFuncionario = todosDepartamentos.find(departamento => departamento.uuid == informacoesJson.department_uuid)
   
  
    container.insertAdjacentHTML(
      "beforeend",
      `
    <h2 class="h2-company-name">${departamentos.name} - ${departamentoFuncionario.name}</h2>
        <div class="div-user-page">
            <div class="div-cards-contratado">
                
            </div>
        </div>
    `
    );
    const optionsFuncionarios = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const informacoesFuncionarios = await fetch(
      "http://localhost:6278/users/departments/coworkers",
      options
    );
    const informacoesFuncionariosJson = await informacoesFuncionarios.json();
    const coworkers = informacoesFuncionariosJson[0].users
    const cardsContainer = document.querySelector(".div-cards-contratado");
    coworkers.forEach((funcionario) => {
      cardsContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card-contratado">
          <h2 class="nome-card-contratado">${funcionario.username}</h2>
          <p class="cargo-card-contratado">${funcionario.professional_level}</p>
      </div>
      `
      );
    });
  }
}
renderizarInformacoesDoFuncionario();
async function abrirModalEditar() {
  const iconeCaneta = document.querySelector(".icone-caneta");
  const modalEditarPerfil = document.querySelector("#modal-editar-perfil");
  iconeCaneta.addEventListener("click", function () {
    modalEditarPerfil.classList.toggle("flex");
    editarInformcaoes();
  });
  // fazer metodo post para substituir os dados
}
abrirModalEditar();
async function editarInformcaoes() {
  const botaoEditar = document.querySelector("#editar-perfil");
  const modalEditarPerfil = document.querySelector("#modal-editar-perfil");
  botaoEditar.addEventListener("click", async function () {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const token = pegarTokenDoLocalStorage();
    const data = {
      username: `${name.value}`,
      email: `${email.value}`,
      password: `${password.value}`,
    };
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    if (
      name.value.length > 0 &&
      email.value.length > 0 &&
      password.value.length > 0
    ) {
      const resJson = await fetch("http://localhost:6278/users", options);
      const response = await resJson.json();
      modalEditarPerfil.classList.toggle("flex");

    }
  });
  const close = document.querySelector("#close-modal");

  close.addEventListener("click", function () {
    modalEditarPerfil.classList.toggle("flex");
  });
}
