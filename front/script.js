/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
    let url = 'http://127.0.0.1:5000/locatarios';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.locatarios.forEach(item => insertList(item.nomeLocatario, item.sobrenomeLocatario, item.emailLocatario, item.cpfLocatario, item.telLocatario, item.celLocatario))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputFirstNameLoc, inputLastNameLoc, inputEmail, inputCpf,inputTel,inputCel) => {
    const formData = new FormData();
    formData.append('nomeLocatario', inputFirstNameLoc);
    formData.append('sobrenomeLocatario', inputLastNameLoc);
    formData.append('emailLocatario', inputEmail);
    formData.append('cpfLocatario', inputCpf);
    formData.append('telLocatario', inputTel);
    formData.append('celLocatario', inputCel);
  
    let url = 'http://127.0.0.1:5000/locatario';
    fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
  
  
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const nomeItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()
          deleteItem(nomeItem)
          alert("Removido!")
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (item) => {
    console.log(item)
    let url = 'http://127.0.0.1:5000/locatario?nomeLocatario=' + item;
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com nome, quantidade e valor 
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {

    function firstLetterUP(word) {
        if (typeof word !== 'string' || word.length === 0) {
          return word; // Retorna a palavra original se não for uma string ou estiver vazia
        }
        
        return word.charAt(0).toUpperCase() + word.slice(1);
      }

      function verificaCpfExiste(inputCpf) {
        return locatarios.some(locatario => locatario.cpfLocatario === inputCpf);
      }
     
    let inputFirstNameLoc = document.getElementById("newFirstName").value;
    let inputLastNameLoc = document.getElementById("newLastName").value;
    let inputEmail = document.getElementById("newEmail").value;
    let inputCpf = document.getElementById("newCpf").value;
    let inputTel = document.getElementById("newTelefone").value;
    let inputCel = document.getElementById("newCelular").value;
  
    function validaEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}


        if (inputFirstNameLoc === '') {
      alert("O campo nome está vazio. Digite um nome.");
    } else if ((inputLastNameLoc === '' )) {
      alert("O campo sobrenome está vazio. Digite um sobrenome.");
    } else if (inputEmail === '') {
      alert("O campo email está vazio. Digite um email.");
     } else {
      insertList(firstLetterUP(inputFirstNameLoc), firstLetterUP(inputLastNameLoc), inputEmail,inputCpf,inputTel,inputCel)
      postItem(firstLetterUP(inputFirstNameLoc), firstLetterUP(inputLastNameLoc), inputEmail,inputCpf,inputTel,inputCel)
      alert("Locatario adicionado!")
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (firstnameLoc, lastnameloc, email, cpf, tel, cel) => {
    var item = [firstnameLoc, lastnameloc, email, cpf, tel, cel]
    var table = document.getElementById('myTable');
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    document.getElementById("newFirstName").value = "";
    document.getElementById("newLastName").value = "";
    document.getElementById("newEmail").value = "";
    document.getElementById("newCpf").value = "";
    document.getElementById("newTelefone").value = "";
    document.getElementById("newCelular").value = "";
  
    removeElement()
  }