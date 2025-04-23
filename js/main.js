// Script principal para o TurboAgro Admin

// Inicialização quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Inicializa popovers do Bootstrap
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Inicializa os gráficos se estiver na página de dashboard
    if (document.getElementById('relatoriosMensaisChart')) {
        inicializarGraficoRelatorios();
    }
    
    if (document.getElementById('tiposSoloChart')) {
        inicializarGraficoTiposSolo();
    }

    // Adiciona classe active ao item de menu atual
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('.sidebar .nav-link');
    
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Função para inicializar o gráfico de relatórios mensais
function inicializarGraficoRelatorios() {
    const ctx = document.getElementById('relatoriosMensaisChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Relatórios Mensais',
                data: [12, 19, 15, 25, 30, 22],
                backgroundColor: 'rgba(0, 204, 102, 0.2)',
                borderColor: 'rgba(0, 204, 102, 1)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Função para inicializar o gráfico de tipos de solo
function inicializarGraficoTiposSolo() {
    const ctx = document.getElementById('tiposSoloChart').getContext('2d');
    
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Argiloso', 'Arenoso', 'Siltoso', 'Humoso'],
            datasets: [{
                data: [40, 25, 20, 15],
                backgroundColor: [
                    'rgba(0, 204, 102, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)',
                    'rgba(0, 123, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 204, 102, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(220, 53, 69, 1)',
                    'rgba(0, 123, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Função para alternar o modo de visualização da sidebar em dispositivos móveis
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show-sidebar');
}

// Funções para o CRUD de usuários
function adicionarUsuario() {
    // Obter valores do formulário
    const nome = document.getElementById('inputNome').value;
    const email = document.getElementById('inputEmail').value;
    const tipo = document.getElementById('inputTipo').value;
    
    if (nome && email && tipo) {
        // Em um sistema real, aqui seria feita uma requisição AJAX para o backend
        alert('Usuário adicionado com sucesso!');
        document.getElementById('formAdicionarUsuario').reset();
        $('#modalAdicionarUsuario').modal('hide');
        
        // Simular adição na tabela (em um sistema real, a tabela seria atualizada com dados do backend)
        const tabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
        const novaLinha = tabela.insertRow();
        
        const celNome = novaLinha.insertCell(0);
        const celEmail = novaLinha.insertCell(1);
        const celTipo = novaLinha.insertCell(2);
        const celAcoes = novaLinha.insertCell(3);
        
        celNome.innerHTML = nome;
        celEmail.innerHTML = email;
        celTipo.innerHTML = tipo;
        celAcoes.innerHTML = '<button class="btn btn-sm btn-primary me-1" onclick="editarUsuario(this)"><i class="bi bi-pencil"></i></button>' +
                            '<button class="btn btn-sm btn-danger" onclick="excluirUsuario(this)"><i class="bi bi-trash"></i></button>';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function editarUsuario(btn) {
    const linha = btn.closest('tr');
    const nome = linha.cells[0].innerText;
    const email = linha.cells[1].innerText;
    const tipo = linha.cells[2].innerText;
    
    // Preencher o formulário de edição
    document.getElementById('editNome').value = nome;
    document.getElementById('editEmail').value = email;
    document.getElementById('editTipo').value = tipo;
    
    // Armazenar a referência da linha para atualização posterior
    document.getElementById('formEditarUsuario').setAttribute('data-linha-index', linha.rowIndex);
    
    // Abrir o modal de edição
    $('#modalEditarUsuario').modal('show');
}

function atualizarUsuario() {
    const nome = document.getElementById('editNome').value;
    const email = document.getElementById('editEmail').value;
    const tipo = document.getElementById('editTipo').value;
    
    if (nome && email && tipo) {
        // Obter o índice da linha a ser atualizada
        const linhaIndex = document.getElementById('formEditarUsuario').getAttribute('data-linha-index');
        const tabela = document.getElementById('tabelaUsuarios');
        const linha = tabela.rows[linhaIndex];
        
        // Atualizar os dados na tabela
        linha.cells[0].innerText = nome;
        linha.cells[1].innerText = email;
        linha.cells[2].innerText = tipo;
        
        // Em um sistema real, aqui seria feita uma requisição AJAX para o backend
        alert('Usuário atualizado com sucesso!');
        $('#modalEditarUsuario').modal('hide');
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function excluirUsuario(btn) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        const linha = btn.closest('tr');
        linha.remove();
        
        // Em um sistema real, aqui seria feita uma requisição AJAX para o backend
        alert('Usuário excluído com sucesso!');
    }
}

// Função para atualizar perfil
function atualizarPerfil() {
    const nome = document.getElementById('inputNomeCompleto').value;
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    
    if (nome && email) {
        // Em um sistema real, aqui seria feita uma requisição AJAX para o backend
        alert('Perfil atualizado com sucesso!');
    } else {
        alert('Por favor, preencha os campos obrigatórios.');
    }
}

// Função para filtrar tabelas
function filtrarTabela(inputId, tabelaId) {
    const input = document.getElementById(inputId);
    const filtro = input.value.toUpperCase();
    const tabela = document.getElementById(tabelaId);
    const linhas = tabela.getElementsByTagName('tr');
    
    for (let i = 1; i < linhas.length; i++) {
        let visivel = false;
        const colunas = linhas[i].getElementsByTagName('td');
        
        for (let j = 0; j < colunas.length; j++) {
            const texto = colunas[j].textContent || colunas[j].innerText;
            if (texto.toUpperCase().indexOf(filtro) > -1) {
                visivel = true;
                break;
            }
        }
        
        linhas[i].style.display = visivel ? '' : 'none';
    }
}
