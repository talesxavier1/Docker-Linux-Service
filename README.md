<h1>Docker Linux Service</h1>

<h4>Objetivo</h4>
<p>Fazer um script que atualize as imagens e os containers assim que for identificada uma alteração no repositório do Docker Hub.</p>

------------
<h4>Ferramentas utilizadas:</h4>
-  [VMware Workstation 17](https://www.vmware.com/br/products/workstation-player/workstation-player-evaluation.html "VMware Workstation 17")
-  [CentOS Stream 8](https://www.centos.org/centos-stream/ "CentOS Stream 8")
-  [CentOS 7](https://www.centos.org/download/ "CentOS Stream 8")
-  [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code")

------------

<h4>Funcionamento:</h4>

- **1.** Busca o arquivo de configurações.
- **2.** Busca todos os containers do ambiente.
- **3.** Busca todas a imagens do ambiente.
- **4.** Para cada linha de configuração, faça o item **5.**
- **5**
  - **5.1** - Filtrar e armazenar na memória todas as imagens da linha de configuração.
  - **5.2** - Filtra e armazena na memória todos os containers das imagens do  **5.1.**
  - **5.3** - Efetuar o pull no repositório da linha de configuração e armazenar na memória o digest retornado.
  - **5.4** - Procurar nas imagens filtradas do **5.1** uma imagem com o digest igual ao retornado pelo pull. Se hover imagem com o mesmo digest, passa para próxima linha de configuração.
  - **5.5** - Deletar todas as imagens filtradas no **5.1**, encerra todos os containers filtrados no 5.2 e deleta todos os container filtrados no **5.2**.
  - **5.6** - Buscar a imagem com base no digest retornado do **5.3**.
  - **5.7** - Executar  e gerar o container da imagem obtida no **5.6** utilizando a porta definida no arquivo de configuração.
