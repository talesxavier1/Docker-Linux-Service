<h1>Docker Linux Service</h1>

<h3>Objetivo:</h3>
Criar um Serviço Linux que utilize o Docker CLI para atualizar as imagens e os containers do ambiente assim que for identificada uma alteração no Docker Hub.

------------
<h3>Ferramentas utilizadas:</h3>

-  [VMware Workstation 17](https://www.vmware.com/br/products/workstation-player/workstation-player-evaluation.html "VMware Workstation 17")
-  [CentOS Stream 8](https://www.centos.org/centos-stream/ "CentOS Stream 8")
-  [CentOS 7](https://www.centos.org/download/ "CentOS Stream 8")
-  [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code")
-  [Node.js 18.16.0](https://nodejs.org/en "Node.js 18.16.0")
-  [JavaScript ES6](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript "Node.js 18.16.0")
------------

<h3>Funcionamento:</h3>

- **1.** Busca o arquivo de configurações.
- **2.** Busca todos os containers do ambiente.
- **3.** Busca todas a imagens do ambiente.
- **4.** Para cada container encontrado no item **2**, verificar se o status é diferente de 'runing'. Caso verdadeiro, ele deve ser reiniciado.
- **5.** Para cada linha de configuração, faça o item **6.**
- **6**
  - **6.1** - Filtrar e armazenar na memória todas as imagens da linha de configuração.
  - **6.2** - Filtra e armazena na memória todos os containers das imagens do  **6.1.**
  - **6.3** - Efetuar o pull no repositório da linha de configuração e armazenar na memória o digest retornado.
  - **6.4** - Procurar nas imagens filtradas do **6.1** uma imagem com o digest igual ao retornado pelo pull. Se hover imagem com o mesmo digest, passa para próxima linha de configuração.
  - **6.5** - Deletar todas as imagens filtradas no **6.1**, encerra todos os containers filtrados no **6.2** e deleta todos os container filtrados no **6.2**.
  - **6.6** - Buscar a imagem com base no digest retornado do **6.3**.
  - **6.7** - Executar e gerar o container da imagem obtida no **6.6** utilizando a porta definida no arquivo de configuração.
- **7** - Aguarde 1 minuto e retorne para o item 1. 
