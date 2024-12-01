let graficoX;
let graficoX2;
const tela = document.getElementById('tela');

function gerarRelatorio() {
    const diario = document.getElementById('diario');
    const semanal = document.getElementById('semanal');
    const mensal = document.getElementById('mensal');
    const datainicio  = document.getElementById('datain').value.split('-').reverse().join('/');
    const datafim = document.getElementById('datafim').value.split('-').reverse().join('/');
  
    if ((diario || semanal || mensal) && (datainicio && datafim)) {
        if (diario.checked) {
            
            tela.innerHTML += `<br><h3 class="Identificacao">Relatório Diário</h3>
                            <span class="Identificacao">Estabelecimento: Restaurante Mineiro<br>
                            Periodo: ${datainicio} - ${datafim}<br></span>`;

            const ctx = document.getElementById('graficoRelatorio');
            const ctx2 = document.getElementById('graficoRelatorio2');

            graficoX = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Quant. de visitas na sua pagina', 'Quant.de reservas realizadas:', 'Quant.de clientes pelo saidinhas', 'Avaliações recebidas', 'Quant. de cupons resgatados'],
                    datasets: [{
                        label: 'Relatório Saidinhas',
                        data: [15, 11, 6, 5, 16],
                        backgroundColor: [
                            `rgb(224, 39, 39)`
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 20,
                            ticks: {
                                stepSize: 1,
                            }
                        }
                    }
                }
            });

            graficoX2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Avaliações positivas',
                        'Avaliações negativas'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [3, 1],
                        backgroundColor: [
                            'rgb(224, 39, 39)',
                            'rgb(167, 167, 167)'
                        ],
                        hoverOffset: 4
                    }]
                }
            });

        } else if (semanal.checked) {
            tela.innerHTML += `<br><h3 class="Identificacao">Relatório Semanal</h3>
            <span class="Identificacao">Estabelecimento: Restaurante Mineiro<br>
            Periodo: ${datainicio} - ${datafim}<br></span>`;

            const ctx = document.getElementById('graficoRelatorio');
            const ctx2 = document.getElementById('graficoRelatorio2');

            graficoX = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Quant. de visitas na sua pagina', 'Quant.de reservas realizadas:', 'Quant.de clientes pelo saidinhas', 'Avaliações recebidas', 'Quant. de cupons resgatados'],
                    datasets: [{
                        label: 'Relatório Saidinhas',
                        data: [32, 21, 15, 12, 36],
                        backgroundColor: [
                            `rgb(224, 39, 39)`
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 40,
                            ticks: {
                                stepSize: 5,
                            }
                        }
                    }
                }
            });

            graficoX2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Avaliações positivas',
                        'Avaliações negativas'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [11, 1],
                        backgroundColor: [
                            'rgb(224, 39, 39)',
                            'rgb(167, 167, 167)'
                        ],
                        hoverOffset: 4
                    }]
                }
            });


        } else if (mensal.checked) {
            tela.innerHTML += `<br><h3 class="Identificacao">Relatório Mensal</h3>
            <span class="Identificacao">Estabelecimento: Restaurante Mineiro<br>
            Periodo: ${datainicio} - ${datafim}<br></span>`;

            const ctx = document.getElementById('graficoRelatorio');
            const ctx2 = document.getElementById('graficoRelatorio2');

            graficoX = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Quant. de visitas na sua pagina', 'Quant.de reservas realizadas:', 'Quant.de clientes pelo saidinhas', 'Avaliações recebidas', 'Quant. de cupons resgatados'],
                    datasets: [{
                        label: 'Relatório Saidinhas',
                        data: [88, 65, 49, 24, 60],
                        backgroundColor: [
                            `rgb(224, 39, 39)`
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                stepSize: 10,
                            }
                        }
                    }
                }
            });

            graficoX2 = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Avaliações positivas',
                        'Avaliações negativas'
                    ],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [23, 1],
                        backgroundColor: [
                            'rgb(224, 39, 39)',
                            'rgb(167, 167, 167)'
                        ],
                        hoverOffset: 4
                    }]
                }
            });


        }

        alert("Os relatorios não ficam salvo nesta pagina, antes de fechar exporte seu relatório!");
    } else {
        alert("Preencha todos os dados solicitados!");
    }




}
async function exportarGrafico() {
    if (!graficoX) {
        alert("Não é possível exportar o relatório!");
    }
    const graficoImagem = graficoX.toBase64Image();
    const graficoImagem2 = graficoX2.toBase64Image();
    const texto = tela.textContent;
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.text(texto, 10, 10);
    pdf.addImage(graficoImagem, 'PNG', 10, 50, 190, 100);
    pdf.addImage(graficoImagem2, 'PNG', 10, 150, 190, 150);
    pdf.save('grafico.pdf');
    
}

document.addEventListener('DOMContentLoaded', function () {
    const relatorio = document.getElementById('relatorio');
    const exportar = document.getElementById('exportar');
    if (relatorio) {
        relatorio.addEventListener('click', gerarRelatorio);
    }
    if (exportar) {
        exportar.addEventListener('click', exportarGrafico);
    }
});
