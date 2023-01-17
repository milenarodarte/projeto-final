
function pegarTokenDoLocalStorage() {
  const tokenlocal = localStorage.getItem("token");
  const token = JSON.parse(tokenlocal);
  return token;
}
pegarTokenDoLocalStorage()

async function listaDeDepartamentos() {
  const token = await pegarTokenDoLocalStorage()
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  };

  const departamentos = await fetch(
    "http://localhost:6278/departments",
    options
  );
  

  const departamentosJson = await departamentos.json();
   
  return departamentosJson;
  
}
listaDeDepartamentos()

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

  if (isAdmin == "false") {
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
eventoRedirecionadorDePagina();



async function renderizarDepartamentos(token, token2) {
  const departamentosJson = await listaDeDepartamentos(token);
  const selecionarEmpresa = document.querySelector("#selecionar-empresa");
  selecionarEmpresa.innerHTML = "";
  const departamentList = document.querySelector("#departament-list");
  const departament = document.querySelector("#departament");
  departamentosJson.forEach((empresa) => {
    selecionarEmpresa.insertAdjacentHTML(
      "beforeend",
      `
      <option class="options" value="${empresa.companies.name}">${empresa.companies.name}</option>
      `
    );
    departament.insertAdjacentHTML(
      "beforeend",
      `
    <div class="departament-card">
      <h2 class="h2-departament-card">${empresa.name}</h2>
      <p class="p-card-departament-description">${empresa.description}</p>
      <p class="p-card-departament">${empresa.companies.name}</p>
      <div class="buttons-card">
        <img src="/assets/olho.svg" id="A${empresa.uuid}" alt="" class="button-olho">
        <img src="/assets/caneta.svg" id="${empresa.uuid}" class="button-editar" alt="">
        <img src="/assets/lixo.svg" id="B${empresa.uuid}" class="button-lixo" alt="">
      </div>
    </div>
    `
    );
  });
  abrirModalRemoverDepartamento(token, token2)
  editarDepartamento(pegarTokenDoLocalStorage());

    const option = document.querySelectorAll(".options");


   option.forEach((empresa) => {


    document.addEventListener("click", function (e) {
      const el = e.target;

      if (el.classList.contains("options")) {

        const select = document.querySelector("#select");
        const departamentosFiltrados = departamentosJson.filter(
          (nome) => nome.companies.name == select.value
        );

      }
    });
  });
}
renderizarDepartamentos(pegarTokenDoLocalStorage(), pegarTokenDoLocalStorage());



async function cadastrar(token) {
  const botaoCriar = document.querySelector("#botaoCriar");
  const maisCriar = document.querySelector("#button-criar");
  const modalCriar = document.querySelector(".modal-criar-departamento");
  const botaoClose = document.querySelector("#closeButton");
  botaoCriar.addEventListener("click", function () {
    modalCriar.classList.toggle("flex");
  });
  botaoClose.addEventListener("click", function () {
    modalCriar.classList.toggle("flex");
  });

  const departamentosJson = await listaDeDepartamentos(token);
  const listaModal = document.querySelector("#empresa-modal");

  departamentosJson.forEach((empresa) => {
    listaModal.insertAdjacentHTML(
      "beforeend",
      `
      <option class="options" id="${empresa.companies.uuid}" value="${empresa.companies.name}">${empresa.companies.name}</option>
      `
    );
  });
  const criardepartamento = document.querySelector("#criar-departamento");
  criardepartamento.addEventListener("click", async function () {
    const empresa = document.querySelector("#modal-select");
    const empresaValue = empresa.value;
    const descricao = document.querySelector("#modal-descricao");
    const descricaoValue = descricao.value;
    const nomeDepartamento = document.querySelector("#nome-departamento");
    const nomeValue = nomeDepartamento.value;

    if (
      empresaValue.length > 0 &&
      descricaoValue.length > 0 &&
      nomeValue.length > 0
    ) {
      const empresaProcurada = departamentosJson.find((empresa) => {
        return empresa.companies.name == empresaValue;
      });

      const data = {
        name: `${nomeValue}`,
        description: `${descricaoValue}`,
        company_uuid: `${empresaProcurada.companies.uuid}`,
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };
      const resJson = await fetch("http://localhost:6278/departments", options);
      const response = await resJson.json();
      renderizarDepartamentos(token);
      modalCriar.classList.toggle("flex");
      location.reload()
    }
  });
}
cadastrar(pegarTokenDoLocalStorage());

async function abrirModalRemoverDepartamento( token, token2) {
  const botaoLixo = document.querySelectorAll(".button-lixo");
  const arrayLixo = Array.from(botaoLixo);
  const body = document.querySelector("body");

  arrayLixo.forEach((lixo) => {

    lixo.addEventListener("click", async function () {
      const id = lixo.id.slice(1);
      const lista = await listaDeDepartamentos(token)
      const departamento = lista.find((dep) => {
        return dep.uuid == id
      })
  
      body.insertAdjacentHTML(
        "beforeend",
        `
     <div class="modal-confirmacao-remover-departamento-nome">
      <div class="modal-quadro-branco">
          <div class="close" id="closeModal">X</div>
          <h1 class="h1-remover">Realmente deseja deletar o Departamento ${departamento.name} e demitir os seus funcionários? </h1>
          <button class="button-green desktop" id="button-confirmar-deletar-dados">Confirmar</button>
      </div>
     </div>
     `
      );

      const botaoConfirmar = document.querySelector('#button-confirmar-deletar-dados')
      botaoConfirmar.addEventListener('click', async function(){
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token2}`,
          },
        };
    
        const del = await fetch (`http://localhost:6278/departments/${departamento.uuid}`,options)
  
        const modal = document.querySelector('.modal-confirmacao-remover-departamento-nome')
        modal.remove()
        location.reload()
      })
      const botaoClose = document.querySelector('#closeModal')
  
      botaoClose.addEventListener('click', function(){
        const modal = document.querySelector('.modal-confirmacao-remover-departamento-nome')
        modal.remove()
      })

    });

  });
}


async function editarDepartamento(token) {
  const botaoEditar = document.querySelectorAll(".button-editar");
  const arrayEditar = Array.from(botaoEditar);
  const body = document.querySelector("body");


  const lista = await listaDeDepartamentos(token);

  arrayEditar.forEach((botao) => {
    botao.addEventListener("click", async function () {
      const elemento = lista.find((departamento) => {
        return departamento.uuid == botao.id;
      });

      body.insertAdjacentHTML('beforeend', `
      <div class="modal-editar-departamento">
        <div class="caixa-branca-modal">
          <button class="close" id="close-editar">X</button>
          <h1 class="h1-editar-departamento" id="h1-modal">Editar departamento</h1>
          <textarea name="editar-departamento-text" placeholder="Valores anteriores da descrição"
              id="text-area-modal-editar" cols="5" rows="10"></textarea>
          <button class="button-blue modal-button-blue" id="salvarAlteracoes">salvar alteraçãoes</button>
        <div>
      </div>
      `)
      //modal
      const salvarAlteracoes = document.querySelector("#salvarAlteracoes");
      const modalEditar = document.querySelector(".modal-editar-departamento");
      let textArea = document.querySelector("#text-area-modal-editar");
      const closeEditar = document.querySelector("#close-editar");

      textArea.innerHTML = "";
      textArea.insertAdjacentHTML("beforeend", `${elemento.description}`);

      closeEditar.addEventListener("click", function () {
        modalEditar.remove()
      });

      salvarAlteracoes.addEventListener("click", async function (e) {
        textArea = document.querySelector("#text-area-modal-editar")
        const el = e.target;
        const lista = await listaDeDepartamentos(token);

        const data = {
          description: `${textArea.value}`,
        };
    
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        };
        const resJson = await fetch(
          `http://localhost:6278/departments/${elemento.uuid}`,
          options
        );
        const response = await resJson.json();
     
        salvarAlteracoes.id = `salvarAlteracoes`;
        const lista2= await listaDeDepartamentos(token)
        const selecionarEmpresa = document.querySelector("#selecionar-empresa");
          selecionarEmpresa.innerHTML = "";
          const departamentList = document.querySelector("#departament-list");
          const departament = document.querySelector("#departament");
          departament.innerHTML = ""
  

        lista2.forEach((empresa) => {
          selecionarEmpresa.insertAdjacentHTML(
            "beforeend",
            `
            <option class="options" value="${empresa.companies.name}">${empresa.companies.name}</option>
            `
          );
          departament.insertAdjacentHTML(
            "beforeend",
            `
          <div class="departament-card">
            <h2 class="h2-departament-card">${empresa.name}</h2>
            <p class="p-card-departament-description">${empresa.description}</p>
            <p class="p-card-departament">${empresa.companies.name}</p>
            <div class="buttons-card">
              <img src="/assets/olho.svg" id="A${empresa.uuid}" alt="" class="button-olho">
              <img src="/assets/caneta.svg" id="${empresa.uuid}" class="button-editar" alt="">
              <img src="/assets/lixo.svg" id="B${empresa.uuid}" class="button-lixo" alt="">
            </div>
          </div>
          `
          );
        })
        
        modalEditar.remove()

      });

    });
  });  
}

async function vizualizarDepartanmento (token){
  const lista = await listaDeDepartamentos(token);
  const botaoVisualizar = document.querySelectorAll(".button-olho");
  const arrayBotaoOlho = Array.from(botaoVisualizar);
  const body = document.querySelector("body");

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const funcionariosSemDepartmaneto = await fetch(
    "http://localhost:6278/admin/out_of_work",
    options
  );
  const funcionariosLista = await funcionariosSemDepartmaneto.json();
  const todosOsFuncionarios = await fetch('http://localhost:6278/users',options)
  const todosFuncionarios = await todosOsFuncionarios.json()
 

  arrayBotaoOlho.forEach((botao) => {
    botao.addEventListener('click', function(){
      const id = botao.id.slice(1);
      const departamento = lista.find((dep) => {
        return dep.uuid == id
      })
      
      body.insertAdjacentHTML('beforeend', `
      <div class="modal-departament-name">
        <div class="white-modal-departament-name">
          <button class="close" id="idClose">X</button>
          <h2 class="modal-title">${departamento.name}</h2>
          <div class="div-modal-departament-name">
              <div class="departament-description">
                  <p class="p-div-description">${departamento.description}</p>
                  <p class="p-company">${departamento.companies.name}</p>
              </div>
              <div class="select-and-button" id="divselect">
                  <input class="input-select" list="selecionar-usuario" placeholder="Selecionar usuário" id="inputContratar">

                  <datalist id="selecionar-usuario">
                     
                  </datalist>

                  <button class="button-green modal-button-green"
                      id="contratar-modal-nome-do-departamento">Contratar</button>
              </div>
          </div>

          <div class="div-cards-user" id="divCards">
              
          </div>
        </div>
      </div>
      `)
      const modal = document.querySelector('.modal-departament-name')
      const idClose = document.querySelector('#idClose')
      idClose.addEventListener('click', function(){
        modal.remove()
      })
      const datalist = document.querySelector('#selecionar-usuario')
      funcionariosLista.forEach((funcionario) => {
        datalist.insertAdjacentHTML('beforeend', `
        <option value="${funcionario.username}">${funcionario.username}</option>
        `)
      })
      const botaoContratar = document.querySelector('#contratar-modal-nome-do-departamento')
      const inputContratar = document.querySelector('#inputContratar')
   
      botaoContratar.addEventListener('click', async function(){
        if (inputContratar.value != ""){
          const funcionario = funcionariosLista.find( func => func.username == inputContratar.value)
          const funcionarioUUID = funcionario.uuid
         
          const dados = {
            'user_uuid': `${funcionarioUUID}`,
            'department_uuid': `${departamento.uuid}`
          }
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dados),
          };
          const resJson = await fetch("http://localhost:6278/departments/hire/", options);
          const response = await resJson.json();
          
          location.reload()
          // colocar toast de bem sucedido

        }
      })
     const funcionariosDoSetor = todosFuncionarios.filter(funcionario => funcionario.department_uuid == departamento.uuid)
      const divCards = document.querySelector('#divCards')
      funcionariosDoSetor.forEach((funcionario)=> {
        

        divCards.insertAdjacentHTML('beforeend', `
          <div class="cards-user">
            <p class="card-name">${funcionario.username}</p>
            <p class="card-job">${funcionario.professional_level}</p>
            <p class="company-card">${departamento.companies.name}</p>
            <button class="button-desligar-modal" id="D${funcionario.uuid}">Desligar</button>
          </div>
      `)
    
      const botaoDemitir = document.querySelectorAll('.button-desligar-modal')
      const arrayDemitir = Array.from(botaoDemitir)
      arrayDemitir.forEach((botao) => {
        botao.addEventListener('click', async function (){
          const id = botao.id.slice(1);
         
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMjczOTBhZGYtMzhhNy00Y2VlLTg5ZWQtYzJiYWVmMzY4YmZmIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY2NjkxNzQyMywiZXhwIjoxNjY3NzgxNDIzLCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.1VEwu65jMWZXistVAMZrjTjkJ1KzsADjj08j-VPDlOA`,
            },
          };
          const demitir = await fetch(`http://localhost:6278/departments/dismiss/${id}`, options)
          const demitirjson = await demitir.json()
          
          location.reload()
        })
      })
      
      })
      

    })
  })
 
}
vizualizarDepartanmento(pegarTokenDoLocalStorage())

async function renderizarFuncionariosCadastrados(token){
  const body = document.querySelector('body')
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const todosOsFuncionarios = await fetch('http://localhost:6278/users',options)
  const todosFuncionarios = await todosOsFuncionarios.json()
  const todosFuncionariosSemAdm = todosFuncionarios.filter((funcionario) =>  funcionario.is_admin == false)

  const departamentList = document.querySelector('#departament-list')
  const departamentos = await listaDeDepartamentos(token)

  todosFuncionariosSemAdm.forEach((funcionario)=> {
    const dados= departamentos.find( (department )=> { 
      
    return department.uuid == funcionario.department_uuid} )
    if (dados == undefined) {
      departamentList.insertAdjacentHTML('beforeend', `
      <div class="users-card">
                <h2 class="h2-user-card">${funcionario.username}</h2>
                <p class="p-card-user-description">não cadastrado</p>
                <p class="p-card-user-company">não cadastrado</p>
                <div class="buttons-card">
                    <img src="/assets/caneta.svg" class="button-editar2" alt="">
                    <img src="/assets/lixo.svg" class="button-lixo2" alt="">
                </div>
            </div>
    `)
    } else {
      departamentList.insertAdjacentHTML('beforeend', `
      <div class="users-card">
                <h2 class="h2-user-card">${funcionario.username}</h2>
                <p class="p-card-user-description">${dados.description}</p>
                <p class="p-card-user-company">${dados.companies.name}</p>
                <div class="buttons-card">
                    <img src="/assets/caneta.svg" id="F${funcionario.uuid}" class="button-editar2" alt="">
                    <img src="/assets/lixo.svg" id="G${funcionario.uuid}" class="button-lixo2" alt="">
                </div>
            </div>
    `)
    }
   
  })
  enventoClickUsuarios(token)
}
renderizarFuncionariosCadastrados(pegarTokenDoLocalStorage())

async function enventoClickUsuarios (token) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const todosOsFuncionarios = await fetch('http://localhost:6278/users',options)
  const todosFuncionarios = await todosOsFuncionarios.json()

  const body = document.querySelector('body')
  const edicao = document.querySelectorAll('.button-editar2')
  const arrayEdicao = Array.from(edicao)

  const lixo = document.querySelectorAll('.button-lixo2')
  const arraylixo = Array.from(lixo)
  arrayEdicao.forEach((botao)=>{
    botao.addEventListener('click', function(){
      body.insertAdjacentHTML('beforeend', `
      <div class="modal-editar-usuario">
        <div class="modal-quadro-branco-2">
          <button class="close" id="closeEditar">X</button>
          <h1 class="modal-title-2">Editar usuário</h1>
          <input id="modalidade" placeholder="Selecionar modalidade de trabalho" class="input-modal" list="modalidade-de-trabalho">
          <datalist id="modalidade-de-trabalho">
              <option value="home office">home office</option>
              <option value="presencial">presencial</option>
              <option value="hibrido">hibrido</option>
          </datalist>

          <input id="nivel" placeholder="Selecionar nível profissional" class="input-modal" list="nivel-profissional"
              id="modalidade-de-trabalho">
          <datalist id="nivel-profissional">
              <option value="estágio">estágio</option>
              <option value="júnior">júnior</option>
              <option value="pleno">pleno</option>
              <option value="sênior">sênior</option>
          </datalist>
          <button class="button-blue desktop" id="botaoEditar">Editar</button>
        </div>
      </div>
      `)
      const modal = document.querySelector('.modal-editar-usuario')
      const close = document.querySelector('#closeEditar')

      close.addEventListener('click', function (){
        modal.remove()
      }) 
      const botaoEditar = document.querySelector('#botaoEditar')
      botaoEditar.addEventListener('click', async function(){
        const modalidade = document.querySelector('#modalidade')
        const nivel = document.querySelector('#nivel')
        const modalidadeValue = modalidade.value
        const nivelValue = nivel.value
        const id = botao.id.slice(1)

        if (modalidadeValue != "" && nivelValue != "") {
          const data = {
            kind_of_work: `${modalidadeValue}`,
            professional_level: `${nivelValue}`
          };
          const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          };
          const resJson = await fetch(
            `http://localhost:6278/admin/update_user/${id}`,
            options
          );
          console.log(resJson)
          
          const response = await resJson.json();
          console.log(response)
          modal.remove()
 
        }
      })
    })
  })

  arraylixo.forEach((botao)=>{
    const id = botao.id.slice(1)
    const funcionario = todosFuncionarios.find(funcionario => funcionario.uuid == id)

    botao.addEventListener('click', function(){
      body.insertAdjacentHTML('beforeend', `
      <div class="modal-confirmacao-remover">
        <div class="modal-quadro-branco">
            <div class="close" id="closeEditar">X</div>
            <h1 class="h1-remover">Realmente deseja remover o usuário ${funcionario.username}? </h1>
            <button class="button-green desktop" id="button-deletar-modal">Deletar</button>
        </div>
      </div>

      `)
      const modal = document.querySelector('.modal-confirmacao-remover')
      const close = document.querySelector('#closeEditar')

      close.addEventListener('click', function (){
        modal.remove()
      }) 
      const botaoDeletar = document.querySelector('#button-deletar-modal')
      botaoDeletar.addEventListener('click', async function(){
       
       const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       
      };
      const resJson = await fetch(
        `http://localhost:6278/admin/delete_user/${id}`,
        options
      );

      modal.remove()
      location.reload()
      const response = await resJson.json()
    

      })
    })
  })
}

